export interface Story {
  id: string
  plateNumber: string
  story: string
  timestamp: Date
  location?: string
  rating: 'positive' | 'negative' | 'neutral'
  upvotes: number
}

export type Rating = 'positive' | 'negative' | 'neutral'
