'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Story } from '@/types'
import { useStories, useUpvoteStory } from '@/hooks/useStories'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import StoryList from '@/components/StoryList'
import Loading from '@/components/Loading'
import StructuredData from '@/components/StructuredData'

export default function HomePage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { stories, loading, error, setStories } = useStories()
  const { upvoteStory } = useUpvoteStory((updatedStory) => {
    // Update only the specific story in the list
    setStories(prevStories => 
      prevStories.map(story => 
        story.id === updatedStory.id ? updatedStory : story
      )
    )
  })

  const handleSignInClick = () => {
    console.log('Sign In clicked')
    router.push('/auth')
  }

  const handleShareClick = () => {
    console.log('Share Story clicked, session:', session)
    if (!session) {
      router.push('/auth?callbackUrl=' + encodeURIComponent('/share'))
    } else {
      router.push('/share')
    }
  }

  // Animation state for the title
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)
  const textOptions = [
    "Know Before You",
    "Know During Your", 
    "Let Others Know Your"
  ]

  useEffect(() => {
    const currentText = textOptions[currentTextIndex]
    let currentCharIndex = 0
    
    if (isTyping) {
      // Typing effect with variable speed for more natural feel
      const typingInterval = setInterval(() => {
        if (currentCharIndex <= currentText.length) {
          setDisplayedText(currentText.slice(0, currentCharIndex))
          currentCharIndex++
        } else {
          clearInterval(typingInterval)
          // Hide cursor briefly at end, then show for pause
          setShowCursor(false)
          setTimeout(() => {
            setShowCursor(true)
            setTimeout(() => setIsTyping(false), 1500)
          }, 200)
        }
      }, Math.random() * 100 + 80) // Variable typing speed 80-180ms
      
      return () => clearInterval(typingInterval)
    } else {
      // Smooth erasing effect
      const erasingInterval = setInterval(() => {
        if (currentCharIndex >= 0) {
          setDisplayedText(currentText.slice(0, currentCharIndex))
          currentCharIndex--
        } else {
          clearInterval(erasingInterval)
          // Brief pause before next text
          setTimeout(() => {
            setCurrentTextIndex((prev) => (prev + 1) % textOptions.length)
            setIsTyping(true)
            setShowCursor(true)
          }, 300)
        }
      }, 40) // Fast erase
      
      return () => clearInterval(erasingInterval)
    }
  }, [currentTextIndex, isTyping])

  const handleUpvote = async (storyId: string) => {
    await upvoteStory(storyId)
    // No need to reload or refetch - the callback will update the state
  }

  const recentStories = stories
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 5)

  return (
    <>
      <StructuredData page="home" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Hero Section - Always show immediately */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span>Building safer rides together</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight px-2">
            <span className="inline-block relative">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {displayedText}
              </span>
              <span 
                className={`inline-block w-0.5 h-[0.9em] bg-gradient-to-b from-blue-500 to-purple-600 ml-1 ${showCursor ? 'animate-pulse' : 'opacity-0'} transition-opacity duration-200`}
                style={{ animation: showCursor ? 'pulse 1s ease-in-out infinite' : 'none' }}
              ></span>
            </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Ride</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
            Share and discover real experiences with ride-hailing drivers. Check license plates, read community feedback, and help others stay safe.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 sm:mb-8 px-4">
            {!session ? (
              <button
                onClick={handleSignInClick}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                type="button"
              >
                Sign In to Share Stories
              </button>
            ) : (
              <button
                onClick={handleShareClick}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                type="button"
              >
                Share Your Story
              </button>
            )}
          </div>
          
          {/* Search Bar - Always show immediately */}
          <div className="max-w-md mx-auto px-4">
            <SearchBar />
          </div>
        </div>

        {/* Recent Stories Section - Only this part shows loading */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-0">Recent Community Stories</h3>
            <span className="text-xs sm:text-sm text-gray-500">Latest feedback from riders</span>
          </div>
          
          {/* Only show loading/error in this section */}
          {loading ? (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100">
              <Loading message="Loading recent stories..." />
            </div>
          ) : error ? (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            <StoryList 
              stories={recentStories}
              showViewAllButton={true}
              onUpvote={handleUpvote}
            />
          )}
        </div>

        {/* CTA Section - Always show immediately */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center text-white">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Help Build a Safer Community</h3>
          <p className="text-blue-100 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            Your experiences matter. Share your ride stories to help fellow passengers make informed decisions and stay safe.
          </p>
          <button
            onClick={handleShareClick}
            className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-blue-600 font-semibold rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
            type="button"
          >
            Share Your Story
          </button>
        </div>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center text-sm text-gray-500">
            <Link href="/about" className="hover:text-gray-700 transition-colors">
              About ShareRideStories
            </Link>
            <Link href="/terms" className="hover:text-gray-700 transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-400">
              © {new Date().getFullYear()} ShareRideStories
            </span>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
