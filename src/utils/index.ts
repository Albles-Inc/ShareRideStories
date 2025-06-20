import { Story, Rating } from '@/types'

export const formatDate = (date: Date): string => {
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export const getRatingColor = (rating: Rating): string => {
  switch (rating) {
    case 'positive': return 'text-green-600 bg-green-50'
    case 'negative': return 'text-red-600 bg-red-50'
    default: return 'text-gray-600 bg-gray-50'
  }
}

export const getRatingEmoji = (rating: Rating): string => {
  switch (rating) {
    case 'positive': return '😊'
    case 'negative': return '😟'
    default: return '😐'
  }
}

export const mockStories: Story[] = [
  {
    id: '1',
    plateNumber: 'GR-1234-24',
    story: 'Driver kept asking for extra money throughout the trip, claiming he had urgent family problems. Made the whole ride very uncomfortable and guilt-trippy.',
    timestamp: new Date('2024-06-18'),
    location: 'East Legon to Airport',
    rating: 'negative',
    upvotes: 12,
    userId: 'mock-user-1',
    userEmail: 'user1@example.com'
  },
  {
    id: '2',
    plateNumber: 'GR-1234-24',
    story: 'Same experience! This driver definitely has a pattern. Asked for money for his "sick mother" and wouldn\'t stop talking about his problems.',
    timestamp: new Date('2024-06-15'),
    location: 'Tema to Accra Mall',
    rating: 'negative',
    upvotes: 8,
    userId: 'mock-user-2',
    userEmail: 'user2@example.com'
  },
  {
    id: '3',
    plateNumber: 'AS-5678-23',
    story: 'Amazing driver! Very professional, car was clean, good music, and great conversation. Definitely recommend.',
    timestamp: new Date('2024-06-19'),
    location: 'Kumasi Central',
    rating: 'positive',
    upvotes: 15,
    userId: 'mock-user-3',
    userEmail: 'user3@example.com'
  },
  {
    id: '4',
    plateNumber: 'BA-9876-24',
    story: 'Driver was okay but kept taking calls during the trip which was a bit distracting. Otherwise fine.',
    timestamp: new Date('2024-06-17'),
    location: 'Circle to Dansoman',
    rating: 'neutral',
    upvotes: 3,
    userId: 'mock-user-4',
    userEmail: 'user4@example.com'
  },
  {
    id: '5',
    plateNumber: 'WR-1111-23',
    story: 'This driver made me very uncomfortable. Kept asking personal questions and wouldn\'t stop even when I put on headphones.',
    timestamp: new Date('2024-06-16'),
    location: 'Takoradi',
    rating: 'negative',
    upvotes: 9,
    userId: 'mock-user-5',
    userEmail: 'user5@example.com'
  }
]

export const saveStories = (stories: Story[]) => {
  const newStories = stories.filter(s => !mockStories.find(m => m.id === s.id))
  localStorage.setItem('rideStories', JSON.stringify(newStories))
}

export const loadStories = (): Story[] => {
  const savedStories = localStorage.getItem('rideStories')
  if (savedStories) {
    const parsed = JSON.parse(savedStories)
    return [...mockStories, ...parsed.map((s: any) => ({ ...s, timestamp: new Date(s.timestamp) }))]
  }
  return mockStories
}
