'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Story } from '@/types'
import { useUserStories } from '@/hooks/useUserStories'
import { formatDate, getRatingColor, getRatingEmoji } from '@/utils'
import Header from '@/components/Header'
import Loading from '@/components/Loading'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { stories, loading, error, fetchUserStories, deleteStory } = useUserStories()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth')
    } else if (status === 'authenticated' && session?.user?.email) {
      fetchUserStories()
    }
  }, [status, session?.user?.email, fetchUserStories])

  const handleEdit = (story: Story) => {
    // Store story data for editing
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('editingStory', JSON.stringify(story))
    }
    router.push(`/share?edit=${story.id}`)
  }

  const handleDelete = async (storyId: string) => {
    if (!confirm('Are you sure you want to delete this story? This action cannot be undone.')) {
      return
    }

    setDeletingId(storyId)
    const success = await deleteStory(storyId)
    setDeletingId(null)

    if (!success) {
      alert('Failed to delete story. Please try again.')
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header showBack={true} showShareButton={false} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <Loading message="Loading profile..." />
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header showBack={true} showShareButton={false} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">You need to be signed in to view your profile.</p>
            <Link
              href="/auth"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header showBack={true} showShareButton={false} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Profile Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {session.user.email?.[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
              <p className="text-gray-600">{session.user.email}</p>
            </div>
          </div>
        </div>

        {/* Stories Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Stories</h2>
            <span className="text-sm text-gray-500">
              {stories.length} stor{stories.length !== 1 ? 'ies' : 'y'} shared
            </span>
          </div>

          {loading ? (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100">
              <Loading message="Loading your stories..." />
            </div>
          ) : error ? (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={fetchUserStories} 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : stories.length === 0 ? (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 text-center border border-gray-100">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No stories yet</h3>
              <p className="text-gray-600 mb-6">You haven't shared any ride experiences yet.</p>
              <Link
                href="/share"
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200"
              >
                Share Your First Story
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {stories.map((story) => (
                <div key={story.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center font-mono text-sm font-bold text-gray-700">
                        {story.plateNumber.slice(-2)}
                      </div>
                      <div>
                        <div className="font-mono text-sm font-semibold text-gray-900">{story.plateNumber}</div>
                        <div className="text-xs text-gray-500">{story.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRatingColor(story.rating)}`}>
                        {getRatingEmoji(story.rating)}
                        <span className="ml-1 capitalize">{story.rating}</span>
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">{story.story}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-gray-500">
                        <span className="text-lg">👍</span>
                        <span className="text-sm font-medium">{story.upvotes}</span>
                      </div>
                      <span className="text-sm text-gray-500">{formatDate(story.timestamp)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(story)}
                        className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(story.id)}
                        disabled={deletingId === story.id}
                        className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 text-sm font-medium disabled:opacity-50"
                      >
                        {deletingId === story.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
