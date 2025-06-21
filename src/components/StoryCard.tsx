'use client'

import { Story } from '@/types'
import { formatDate, getRatingColor, getRatingEmoji, getCarIcon } from '@/utils'
import Link from 'next/link'

interface StoryCardProps {
  story: Story
  showPlateNumber?: boolean
  showViewAllButton?: boolean
  onUpvote?: (storyId: string) => void
}

export default function StoryCard({ 
  story, 
  showPlateNumber = true, 
  showViewAllButton = false,
  onUpvote 
}: StoryCardProps) {
  const handleUpvote = () => {
    if (onUpvote) {
      onUpvote(story.id)
    }
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        {showPlateNumber && (
          <div className="flex items-center space-x-3">
            {getCarIcon(story.plateNumber)}
            <div>
              <div className="font-mono text-sm font-semibold text-gray-900">{story.plateNumber}</div>
              <div className="text-xs text-gray-500">{story.location}</div>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRatingColor(story.rating)}`}>
            {getRatingEmoji(story.rating)}
            <span className="ml-1 capitalize">{story.rating}</span>
          </span>
          {!showPlateNumber && (
            <span className="text-sm text-gray-500">{formatDate(story.timestamp)}</span>
          )}
        </div>
      </div>
      
      <p className="text-gray-700 mb-4 leading-relaxed">{story.story}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleUpvote}
            className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors duration-200"
          >
            <span className="text-lg">👍</span>
            <span className="text-sm font-medium">{story.upvotes}</span>
          </button>
          
          {showPlateNumber && (
            <span className="text-sm text-gray-500">{formatDate(story.timestamp)}</span>
          )}
          
          {!showPlateNumber && story.location && (
            <span className="text-sm text-gray-500">📍 {story.location}</span>
          )}
        </div>
        
        {showViewAllButton && (
          <Link
            href={`/search?plate=${encodeURIComponent(story.plateNumber)}`}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            View all stories →
          </Link>
        )}
      </div>
    </div>
  )
}
