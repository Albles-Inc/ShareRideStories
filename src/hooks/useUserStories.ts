import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Story } from '@/types'

export function useUserStories() {
  const { data: session } = useSession()
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUserStories = useCallback(async () => {
    if (!session?.user?.email) {
      setError('Not authenticated')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/user/stories')
      const data = await response.json()
      
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
  }, [session?.user?.email]) // Only re-create when email changes

  const deleteStory = async (storyId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/stories/${storyId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        setStories(prev => prev.filter(story => story.id !== storyId))
        return true
      } else {
        setError(data.error || 'Failed to delete story')
        return false
      }
    } catch (err) {
      setError('Network error')
      return false
    }
  }

  const updateStory = async (storyId: string, updates: {
    plateNumber: string
    story: string
    location?: string
    rating: 'positive' | 'negative' | 'neutral'
  }): Promise<Story | null> => {
    try {
      const response = await fetch(`/api/stories/${storyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      const data = await response.json()

      if (data.success) {
        const updatedStory = {
          ...data.data,
          timestamp: new Date(data.data.timestamp)
        }
        setStories(prev => prev.map(story => 
          story.id === storyId ? updatedStory : story
        ))
        return updatedStory
      } else {
        setError(data.error || 'Failed to update story')
        return null
      }
    } catch (err) {
      setError('Network error')
      return null
    }
  }

  return {
    stories,
    loading,
    error,
    fetchUserStories,
    deleteStory,
    updateStory
  }
}
