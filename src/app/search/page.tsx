'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useStories, useUpvoteStory } from '@/hooks/useStories'
import Header from '@/components/Header'
import StoryList from '@/components/StoryList'
import EmptyState from '@/components/EmptyState'
import Loading from '@/components/Loading'

function SearchPageContent() {
  const searchParams = useSearchParams()
  const plateFromUrl = searchParams.get('plate') || ''
  
  const { stories, loading, error, refetch } = useStories(plateFromUrl)
  const { upvoteStory } = useUpvoteStory()

  const handleUpvote = async (storyId: string) => {
    const updatedStory = await upvoteStory(storyId)
    if (updatedStory) {
      refetch() // Refresh the stories
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header title={plateFromUrl} showBack={true} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <Loading message="Loading stories..." />
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={refetch} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Stories for {plateFromUrl}</h2>
              <p className="text-gray-600">{stories.length} review{stories.length !== 1 ? 's' : ''} from the community</p>
            </div>

            <StoryList 
              stories={stories}
              showPlateNumber={false}
              onUpvote={handleUpvote}
              emptyState={
                <EmptyState
                  title="No stories yet"
                  description="Be the first to share your experience with this driver!"
                  actionText="Share Your Story"
                  actionHref={`/share?plate=${encodeURIComponent(plateFromUrl)}`}
                />
              }
            />
          </>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header showBack={true} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <Loading message="Loading stories..." />
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  )
}
