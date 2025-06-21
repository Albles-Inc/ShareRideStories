import React, {JSX} from 'react'

// Helper function to generate different colored car icons
export const getCarIcon = (plateNumber: string): JSX.Element => {
  // Generate a deterministic color based on plate number
  const colors = [
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-purple-400 to-purple-600',
    'from-red-400 to-red-600',
    'from-yellow-400 to-yellow-600',
    'from-pink-400 to-pink-600',
    'from-indigo-400 to-indigo-600',
    'from-orange-400 to-orange-600',
    'from-teal-400 to-teal-600',
    'from-cyan-400 to-cyan-600',
  ]

  // Simple hash function to get consistent color for same plate
  let hash = 0
  for (let i = 0; i < plateNumber.length; i++) {
    hash = plateNumber.charCodeAt(i) + ((hash << 5) - hash)
  }
  const colorIndex = Math.abs(hash) % colors.length

  return (
      <div className={`w-12 h-12 bg-gradient-to-r ${colors[colorIndex]} rounded-xl flex items-center justify-center shadow-sm`}>
  <svg
      width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  className="text-white"
  >
  <path
      d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
  fill="currentColor"
      />
      </svg>
      </div>
)
}

export const formatDate = (date: Date): string => {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
      return diffInMinutes <= 1 ? 'Just now' : `${diffInMinutes}m ago`
    }
    return diffInHours === 1 ? '1h ago' : `${diffInHours}h ago`
  } else if (diffInDays === 1) {
    return '1 day ago'
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30)
    return months === 1 ? '1 month ago' : `${months} months ago`
  } else {
    const years = Math.floor(diffInDays / 365)
    return years === 1 ? '1 year ago' : `${years} years ago`
  }
}

export const getRatingColor = (rating: string): string => {
  switch (rating.toLowerCase()) {
    case 'positive':
      return 'bg-green-100 text-green-800'
    case 'negative':
      return 'bg-red-100 text-red-800'
    case 'neutral':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const getRatingEmoji = (rating: string): string => {
  switch (rating.toLowerCase()) {
    case 'positive':
      return '👍'
    case 'negative':
      return '👎'
    case 'neutral':
      return '😐'
    default:
      return '❓'
  }
}