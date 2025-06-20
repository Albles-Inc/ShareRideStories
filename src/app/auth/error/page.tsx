'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'


function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (errorType: string | null) => {
    switch (errorType) {
      case 'Verification':
        return {
          title: 'Verification Failed',
          message: 'The verification link was invalid or has expired.',
          suggestion: 'Please try signing in again to get a new verification link.'
        }
      case 'AccessDenied':
        return {
          title: 'Access Denied',
          message: 'You do not have permission to access this resource.',
          suggestion: 'Please contact support if you believe this is an error.'
        }
      case 'EmailCreateAccount':
        return {
          title: 'Account Creation Failed',
          message: 'Could not create account with this email address.',
          suggestion: 'Please try with a different email or contact support.'
        }
      case 'OAuthSignin':
      case 'OAuthCallback':
      case 'OAuthCreateAccount':
      case 'EmailSignin':
        return {
          title: 'Sign-in Error',
          message: 'There was a problem with the sign-in process.',
          suggestion: 'Please try signing in again.'
        }
      case 'SessionRequired':
        return {
          title: 'Session Required',
          message: 'You must be signed in to access this page.',
          suggestion: 'Please sign in to continue.'
        }
      default:
        return {
          title: 'Authentication Error',
          message: 'An unexpected error occurred during authentication.',
          suggestion: 'Please try again or contact support if the problem persists.'
        }
    }
  }

  const errorInfo = getErrorMessage(error)

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">🚗</span>
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                ShareRideStories
              </h1>
              <p className="text-xs text-gray-500">Community-driven ride safety</p>
            </div>
          </Link>
        </div>

        {/* Error Icon */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{errorInfo.title}</h1>
        <p className="text-gray-600 mb-4">{errorInfo.message}</p>
        <p className="text-sm text-gray-500 mb-6">{errorInfo.suggestion}</p>
        
        <div className="space-y-3">
          <Link
            href="/auth"
            className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
          >
            Try Again
          </Link>
          
          <Link
            href="/"
            className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors font-medium"
          >
            Back to Homepage
          </Link>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-2">Error Details</h3>
            <p className="text-sm text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="animate-pulse text-center">
          <div className="h-12 w-12 bg-gray-200 rounded-xl mx-auto mb-8"></div>
          <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-6"></div>
          <div className="h-8 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
          <div className="space-y-3">
            <div className="h-12 bg-gray-200 rounded-xl"></div>
            <div className="h-12 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthErrorContent />
    </Suspense>
  )
}
