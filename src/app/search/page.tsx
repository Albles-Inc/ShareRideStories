'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Story } from '@/types'
import { loadStories, saveStories } from '@/utils'
import Header from '@/components/Header'
import StoryList from '@/components/StoryList'
import EmptyState from '@/components/EmptyState'
import Loading from '@/components/Loading'

function SearchPageContent() {
  const searchParams = useSearchParams()
  const plateFromUrl = searchParams.get('plate')
  
  const [stories, setStories] = useState<Story[]>([])
  const [currentPlate, setCurrentPlate] = useState(plateFromUrl || '')

  useEffect(() => {
    setStories(loadStories())
  }, [])

  useEffect(() => {
    if (plateFromUrl) {
      setCurrentPlate(plateFromUrl)
    }
  }, [plateFromUrl])

  const handleUpvote = (storyId: string) => {
    const updatedStories = stories.map(story => 
      story.id === storyId ? { ...story, upvotes: story.upvotes + 1 } : story
    )
    setStories(updatedStories)
    saveStories(updatedStories)
  }

  const filteredStories = currentPlate 
    ? stories.filter(s => s.plateNumber === currentPlate)
    : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header title={currentPlate} showBack={true} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Stories for {currentPlate}</h2>
          <p className="text-gray-600">{filteredStories.length} review{filteredStories.length !== 1 ? 's' : ''} from the community</p>
        </div>

        <StoryList 
          stories={filteredStories}
          showPlateNumber={false}
          onUpvote={handleUpvote}
          emptyState={
            <EmptyState
              title="No stories yet"
              description="Be the first to share your experience with this driver!"
              actionText="Share Your Story"
              actionHref={`/share?plate=${encodeURIComponent(currentPlate)}`}
            />
          }
        />
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
