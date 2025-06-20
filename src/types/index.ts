export interface User {
  id: string
  email: string
  name?: string
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface Story {
  id: string
  plateNumber: string
  story: string
  timestamp: Date
  location?: string
  rating: 'positive' | 'negative' | 'neutral'
  upvotes: number
  userId: string // Reference to the user who posted
  userEmail: string // For display purposes
}

export type Rating = 'positive' | 'negative' | 'neutral'

export interface AuthError {
  type: string
  message: string
}

export interface SessionUser {
  id: string
  email: string
  name?: string
  image?: string
}
