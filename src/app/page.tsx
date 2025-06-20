'use client'

import Link from 'next/link'
import { Story } from '@/types'
import { useStories, useUpvoteStory } from '@/hooks/useStories'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import StoryList from '@/components/StoryList'
import Loading from '@/components/Loading'

export default function HomePage() {
  const { stories, loading, error, setStories } = useStories()
  const { upvoteStory } = useUpvoteStory((updatedStory) => {
    // Update only the specific story in the list
    setStories(prevStories => 
      prevStories.map(story => 
        story.id === updatedStory.id ? updatedStory : story
      )
    )
  })

  const handleUpvote = async (storyId: string) => {
    await upvoteStory(storyId)
    // No need to reload or refetch - the callback will update the state
  }

  const recentStories = stories
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero Section - Always show immediately */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span>Building safer rides together</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Know Before You
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Ride</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Share and discover real experiences with ride-hailing drivers. Check license plates, read community feedback, and help others stay safe.
          </p>
          
          {/* Search Bar - Always show immediately */}
          <div className="max-w-md mx-auto">
            <SearchBar />
          </div>
        </div>

        {/* Recent Stories Section - Only this part shows loading */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Recent Community Stories</h3>
            <span className="text-sm text-gray-500">Latest feedback from riders</span>
          </div>
          
          {/* Only show loading/error in this section */}
          {loading ? (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100">
              <Loading message="Loading recent stories..." />
            </div>
          ) : error ? (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            <StoryList 
              stories={recentStories}
              showViewAllButton={true}
              onUpvote={handleUpvote}
            />
          )}
        </div>

        {/* CTA Section - Always show immediately */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Help Build a Safer Community</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Your experiences matter. Share your ride stories to help fellow passengers make informed decisions and stay safe.
          </p>
          <Link
            href="/share"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Share Your Story
          </Link>
        </div>
      </div>
    </div>
  )
}
