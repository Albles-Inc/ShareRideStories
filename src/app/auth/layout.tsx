import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication | ShareRideStories',
  description: 'Sign in or sign up to ShareRideStories',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
