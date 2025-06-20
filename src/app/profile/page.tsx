'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Story } from '@/types'
import { formatDate } from '@/utils'
import Header from '@/components/Header'
import Loading from '@/components/Loading'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth?callbackUrl=' + encodeURIComponent('/profile'))
      return
    }

    if (status === 'authenticated') {
      fetchUserStories()
    }
  }, [status, router])

  const fetchUserStories = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/user/stories')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const text = await response.text()
      if (!text) {
        throw new Error('Empty response from server')
      }
      
      const data = JSON.parse(text)
      
      if (data.success) {
        setStories(data.data.map((story: any) => ({
          ...story,
          timestamp: new Date(story.timestamp)
        })))
      } else {
        setError(data.error || 'Failed to fetch stories')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (story: Story) => {
    // Navigate to share page with pre-populated data
    const params = new URLSearchParams({
      edit: 'true',
      id: story.id,
      plateNumber: story.plateNumber,
      story: story.story,
      location: story.location || '',
      rating: story.rating
    })
    router.push(`/share?${params.toString()}`)
  }

  const handleDelete = async (storyId: string) => {
    if (!confirm('Are you sure you want to delete this story?')) {
      return
    }

    try {
      const response = await fetch(`/api/stories/${storyId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        // Remove the story from local state
        setStories(stories.filter(story => story.id !== storyId))
      } else {
        alert(data.error || 'Failed to delete story')
      }
    } catch (err) {
      alert('Network error')
    }
  }

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'positive': return 'text-green-600 bg-green-100'
      case 'negative': return 'text-red-600 bg-red-100'
      default: return 'text-yellow-600 bg-yellow-100'
    }
  }

  const getRatingEmoji = (rating: string) => {
    switch (rating) {
      case 'positive': return '😊'
      case 'negative': return '😞'
      default: return '😐'
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header showBack={true} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Loading message="Loading profile..." />
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header showBack={true} showShareButton={false} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Profile Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-100 mb-6 sm:mb-8">
          <div className="flex flex-col items-center space-y-4 mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-semibold">
              {session?.user?.email?.[0].toUpperCase()}
            </div>
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Your Profile</h1>
              <p className="text-sm sm:text-base text-gray-600 break-all">{session?.user?.email}</p>
            </div>
          </div>
        </div>

        {/* Stories Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-0">Your Stories</h2>
            <button
              onClick={() => router.push('/share')}
              className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all duration-200"
            >
              Add New Story
            </button>
          </div>

          {loading ? (
            <Loading message="Loading your stories..." />
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={fetchUserStories} 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Stories Yet</h3>
              <p className="text-gray-600 mb-6">
                Share your first ride experience to help the community!
              </p>
              <button
                onClick={() => router.push('/share')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200"
              >
                Share Your First Story
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {stories.map((story) => (
                <div key={story.id} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3 sm:mb-0">
                      <div className="text-base sm:text-lg font-mono font-bold bg-gray-100 px-3 py-1 rounded-lg text-center sm:text-left text-black">
                        {story.plateNumber}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(story.rating)} self-start`}>
                        {getRatingEmoji(story.rating)} {story.rating}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(story)}
                        className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(story.id)}
                        className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 text-sm sm:text-base leading-relaxed">{story.story}</p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-gray-500 space-y-2 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                      {story.location && (
                        <span>📍 {story.location}</span>
                      )}
                      <span>👍 {story.upvotes} upvotes</span>
                    </div>
                    <span>{formatDate(story.timestamp)}</span>
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
