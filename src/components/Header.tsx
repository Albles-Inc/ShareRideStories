'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

interface HeaderProps {
  title?: string
  showBack?: boolean
  showShareButton?: boolean
}

export default function Header({ title, showBack = false, showShareButton = true }: HeaderProps) {
  const router = useRouter()
  const { data: session, status } = useSession()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const handleShareClick = () => {
    if (!session) {
      router.push('/auth?callbackUrl=' + encodeURIComponent('/share'))
    } else {
      router.push('/share')
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {showBack ? (
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <span className="text-lg">←</span>
              <span className="font-medium">Back</span>
            </button>
          ) : (
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">🚗</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  ShareRideStories
                </h1>
                <p className="text-xs text-gray-500">Community-driven ride safety</p>
              </div>
            </Link>
          )}
          
          {title && (
            <div className="font-mono text-lg font-bold text-gray-900">{title}</div>
          )}
          
          {showShareButton && (
            <div className="flex items-center space-x-3">
              {status === 'loading' ? (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              ) : session ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {session.user.email?.[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium hidden sm:block">Profile</span>
                  </Link>
                  
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/auth"
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Sign In
                </Link>
              )}
              
              <button
                onClick={handleShareClick}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Share Story
              </button>
            </div>
          )}
          
          {!showShareButton && !title && <div></div>}
        </div>
      </div>
    </div>
  )
}
