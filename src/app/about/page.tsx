'use client'

import Header from '@/components/Header'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header showBack={true} showShareButton={false} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ShareRideStories</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Building safer ride-hailing experiences through community-driven transparency and shared experiences.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8 border border-blue-100">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                ShareRideStories empowers riders to make informed decisions by providing a platform where real experiences with ride-hailing drivers are shared transparently and honestly.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe that by sharing our stories - both positive and negative - we can collectively create a safer, more accountable ride-hailing ecosystem for everyone.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl sm:text-3xl">🔍</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Search & Discover</h3>
                <p className="text-gray-600 leading-relaxed">
                  Enter a license plate number to see what other riders have experienced with that specific driver.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl sm:text-3xl">✍️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Share Your Experience</h3>
                <p className="text-gray-600 leading-relaxed">
                  Rate your ride and share honest feedback about your experience to help future passengers.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl sm:text-3xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Build Community</h3>
                <p className="text-gray-600 leading-relaxed">
                  Upvote helpful reviews and contribute to a growing database of verified ride experiences.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Our Values</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold">💯</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparency</h3>
                  <p className="text-gray-600">We believe in honest, unfiltered feedback that helps everyone make better decisions.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600 font-bold">🛡️</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety First</h3>
                  <p className="text-gray-600">Every feature we build prioritizes the safety and security of our community members.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 font-bold">🌍</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Driven</h3>
                  <p className="text-gray-600">Our platform is powered by real people sharing real experiences to help each other.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-yellow-600 font-bold">⚖️</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Fair & Balanced</h3>
                  <p className="text-gray-600">We encourage balanced feedback that recognizes both positive and negative experiences.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Community Guidelines</h2>
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span>Share honest, factual experiences based on your actual ride</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span>Be respectful and constructive in your feedback</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span>Focus on the service and experience, not personal attributes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold mt-1">✗</span>
                  <span>Don't post fake reviews or spam the platform</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold mt-1">✗</span>
                  <span>Avoid discriminatory language or personal attacks</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Ready to help make ride-hailing safer for everyone? Start by sharing your first experience or searching for driver reviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/share"
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Share Your Story
              </Link>
              <Link
                href="/"
                className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all duration-200"
              >
                Explore Stories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
