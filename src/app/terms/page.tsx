'use client'

import Header from '@/components/Header'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header showBack={true} showShareButton={false} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Terms of <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Service</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Agreement */}
          <div className="mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-blue-900 mb-3">Agreement to Terms</h2>
              <p className="text-blue-800 leading-relaxed">
                By accessing and using ShareRideStories, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-10">
            {/* Use of Service */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Use of Service</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  ShareRideStories is a community platform designed to help users share and discover experiences with ride-hailing drivers. 
                  Our service allows you to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Search for driver experiences by license plate number</li>
                  <li>Share your own ride experiences and ratings</li>
                  <li>Read and upvote community-contributed stories</li>
                  <li>Access community safety information</li>
                </ul>
                <p>
                  You must be at least 18 years old to use this service. By using ShareRideStories, you represent and warrant that you 
                  meet this age requirement.
                </p>
              </div>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. User Accounts</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  To access certain features of our service, you may be required to create an account. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized access or security breach</li>
                </ul>
              </div>
            </section>

            {/* Content Guidelines */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Content Guidelines</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>When sharing content on ShareRideStories, you agree to:</p>
                
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 my-4">
                  <h3 className="font-semibold text-green-900 mb-2">✓ Acceptable Content:</h3>
                  <ul className="list-disc list-inside space-y-1 text-green-800 text-sm">
                    <li>Honest, factual experiences based on actual rides</li>
                    <li>Constructive feedback focused on service quality</li>
                    <li>Respectful language and tone</li>
                    <li>Relevant details about the ride experience</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4 my-4">
                  <h3 className="font-semibold text-red-900 mb-2">✗ Prohibited Content:</h3>
                  <ul className="list-disc list-inside space-y-1 text-red-800 text-sm">
                    <li>False, misleading, or fabricated reviews</li>
                    <li>Personal attacks, harassment, or discriminatory language</li>
                    <li>Private personal information of drivers or other users</li>
                    <li>Spam, promotional content, or irrelevant material</li>
                    <li>Content that violates laws or regulations</li>
                    <li>Threats, intimidation, or incitement to violence</li>
                  </ul>
                </div>

                <p>
                  We reserve the right to remove any content that violates these guidelines and may suspend or terminate 
                  accounts that repeatedly violate our community standards.
                </p>
              </div>
            </section>

            {/* Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Privacy and Data</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Your privacy is important to us. We collect and use your information in accordance with our Privacy Policy. 
                  By using our service, you consent to the collection and use of information as outlined in our Privacy Policy.
                </p>
                <p>
                  We implement appropriate security measures to protect your personal information against unauthorized access, 
                  alteration, disclosure, or destruction.
                </p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  The ShareRideStories platform, including its design, functionality, and content, is protected by copyright, 
                  trademark, and other intellectual property laws.
                </p>
                <p>
                  By posting content to our platform, you grant ShareRideStories a non-exclusive, royalty-free, worldwide license 
                  to use, modify, publicly display, and distribute your content in connection with operating and improving our service.
                </p>
                <p>
                  You retain ownership of any content you post, and you represent that you have the right to grant the above license.
                </p>
              </div>
            </section>

            {/* Disclaimers */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Disclaimers and Limitations</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-yellow-800 font-medium">
                    ⚠️ Important: ShareRideStories provides information based on user-generated content. We do not verify the 
                    accuracy of user reviews and experiences.
                  </p>
                </div>
                <p>
                  Our service is provided "as is" without warranties of any kind. We disclaim all warranties, express or implied, 
                  including but not limited to merchantability, fitness for a particular purpose, and non-infringement.
                </p>
                <p>
                  ShareRideStories is not responsible for:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>The accuracy or reliability of user-generated content</li>
                  <li>Decisions made based on information found on our platform</li>
                  <li>Any incidents, disputes, or issues between users and ride-hailing drivers</li>
                  <li>Third-party services or websites linked from our platform</li>
                </ul>
              </div>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Termination</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We may terminate or suspend your access to our service immediately, without prior notice or liability, 
                  for any reason, including breach of these Terms of Service.
                </p>
                <p>
                  You may terminate your account at any time by contacting us. Upon termination, your right to use the 
                  service will cease immediately.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to Terms</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We reserve the right to modify or replace these Terms of Service at any time. If a revision is material, 
                  we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
                <p>
                  Your continued use of the service after we post any modifications to the Terms of Service constitutes 
                  acceptance of those changes.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  If you have any questions about these Terms of Service, please contact us through our support channels 
                  or by visiting our <Link href="/about" className="text-blue-600 hover:text-blue-700 font-medium">About page</Link>.
                </p>
              </div>
            </section>
          </div>

          {/* Footer CTA */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                By using ShareRideStories, you agree to these terms and help build a safer ride-sharing community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Back to Home
                </Link>
                <Link
                  href="/about"
                  className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all duration-200"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
