import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Story, Rating } from '@/types'

interface CreateStoryData {
  plateNumber: string
  story: string
  location?: string
  rating: Rating
}

export function useStories(plateNumber?: string) {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStories = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams()
      if (plateNumber) params.append('plate', plateNumber)
      
      const response = await fetch(`/api/stories?${params}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const text = await response.text()
      if (!text || text.trim() === '') {
        throw new Error('Empty response from server')
      }
      
      let data
      try {
        data = JSON.parse(text)
      } catch (parseError) {
        console.error('JSON parse error:', parseError, 'Response text:', text)
        throw new Error('Invalid JSON response from server')
      }
      
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

  useEffect(() => {
    fetchStories()
  }, [plateNumber])

  return {
    stories,
    loading,
    error,
    refetch: fetchStories,
    setStories
  }
}

export function useCreateStory() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createStory = async (storyData: CreateStoryData): Promise<Story | null> => {
    if (!session?.user?.email) {
      setError('You must be signed in to post a story')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storyData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const text = await response.text()
      if (!text || text.trim() === '') {
        throw new Error('Empty response from server')
      }
      
      let data
      try {
        data = JSON.parse(text)
      } catch (parseError) {
        console.error('JSON parse error:', parseError, 'Response text:', text)
        throw new Error('Invalid JSON response from server')
      }

      if (data.success) {
        return {
          ...data.data,
          timestamp: new Date(data.data.timestamp)
        }
      } else {
        setError(data.error || 'Failed to create story')
        return null
      }
    } catch (err) {
      setError('Network error')
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    createStory,
    loading,
    error
  }
}

export function useUpvoteStory(onStoryUpdate?: (updatedStory: Story) => void) {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const upvoteStory = async (storyId: string): Promise<Story | null> => {
    setLoading(storyId)
    setError(null)

    try {
      const response = await fetch(`/api/stories/${storyId}/upvote`, {
        method: 'PATCH',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const text = await response.text()
      if (!text || text.trim() === '') {
        throw new Error('Empty response from server')
      }
      
      let data
      try {
        data = JSON.parse(text)
      } catch (parseError) {
        console.error('JSON parse error:', parseError, 'Response text:', text)
        throw new Error('Invalid JSON response from server')
      }

      if (data.success) {
        const updatedStory = {
          ...data.data,
          timestamp: new Date(data.data.timestamp)
        }
        // Call the callback to update the specific story
        if (onStoryUpdate) {
          onStoryUpdate(updatedStory)
        }
        return updatedStory
      } else {
        setError(data.error || 'Failed to upvote story')
        return null
      }
    } catch (err) {
      setError('Network error')
      return null
    } finally {
      setLoading(null)
    }
  }

  return {
    upvoteStory,
    loading,
    error
  }
}
