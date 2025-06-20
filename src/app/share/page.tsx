'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Story, Rating } from '@/types'
import { loadStories, saveStories, getRatingColor, getRatingEmoji } from '@/utils'
import Header from '@/components/Header'
import Loading from '@/components/Loading'

function SharePageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const plateFromUrl = searchParams.get('plate')
  
  const [stories, setStories] = useState<Story[]>([])
  const [plateNumber, setPlateNumber] = useState(plateFromUrl || '')
  const [story, setStory] = useState('')
  const [location, setLocation] = useState('')
  const [rating, setRating] = useState<Rating>('neutral')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setStories(loadStories())
  }, [])

  useEffect(() => {
    if (plateFromUrl) {
      setPlateNumber(plateFromUrl)
    }
  }, [plateFromUrl])

  const handleSubmit = async () => {
    if (!story.trim() || !plateNumber.trim() || isSubmitting) return

    setIsSubmitting(true)

    const newStory: Story = {
      id: Date.now().toString(),
      plateNumber: plateNumber.toUpperCase(),
      story: story.trim(),
      timestamp: new Date(),
      location: location.trim() || undefined,
      rating,
      upvotes: 0
    }

    const updatedStories = [...stories, newStory]
    setStories(updatedStories)
    saveStories(updatedStories)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Redirect to search page for the plate
    router.push(`/search?plate=${encodeURIComponent(plateNumber.toUpperCase())}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header showBack={true} showShareButton={false} />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">✍️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Share Your Experience</h2>
            <p className="text-gray-600">Help others in the community by sharing your ride story</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                License Plate Number
              </label>
              <input
                type="text"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                placeholder="e.g. GR-1234-24"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 font-mono"
                disabled={!!plateFromUrl}
              />
              {plateFromUrl && (
                <p className="text-xs text-gray-500 mt-1">
                  Plate number pre-filled from search
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Experience
              </label>
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Describe your experience with this driver... Be honest and helpful to the community."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                rows={6}
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">{story.length}/500 characters</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                How was your experience?
              </label>
              <div className="flex space-x-3">
                {(['positive', 'neutral', 'negative'] as const).map((ratingOption) => (
                  <button
                    key={ratingOption}
                    onClick={() => setRating(ratingOption)}
                    className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      rating === ratingOption
                        ? getRatingColor(ratingOption) + ' border-current'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{getRatingEmoji(ratingOption)}</div>
                    <div className="text-sm font-medium capitalize">{ratingOption}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Route/Location (Optional)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. East Legon to Airport"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!story.trim() || !plateNumber.trim() || isSubmitting}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Sharing Story...
                </>
              ) : (
                'Share Story'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SharePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header showBack={true} showShareButton={false} />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          <Loading message="Loading form..." />
        </div>
      </div>
    }>
      <SharePageContent />
    </Suspense>
  )
}
