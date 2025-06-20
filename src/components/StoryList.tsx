'use client'

import { Story } from '@/types'
import StoryCard from './StoryCard'

interface StoryListProps {
  stories: Story[]
  showPlateNumber?: boolean
  showViewAllButton?: boolean
  emptyState?: React.ReactNode
  onUpvote?: (storyId: string) => void
}

export default function StoryList({ 
  stories, 
  showPlateNumber = true, 
  showViewAllButton = false,
  emptyState,
  onUpvote 
}: StoryListProps) {
  if (stories.length === 0 && emptyState) {
    return <>{emptyState}</>
  }

  return (
    <div className="space-y-4">
      {stories
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .map((story) => (
          <StoryCard 
            key={story.id} 
            story={story} 
            showPlateNumber={showPlateNumber}
            showViewAllButton={showViewAllButton}
            onUpvote={onUpvote}
          />
        ))}
    </div>
  )
}
