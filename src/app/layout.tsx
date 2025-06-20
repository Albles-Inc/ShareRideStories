import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from '@/components/Providers'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ShareRideStories - Community-Driven Ride Safety Reviews",
    template: "%s | ShareRideStories"
  },
  description: "Share and discover real ride-hailing driver experiences. Check license plates, read community reviews, and help build safer rides for everyone. Join our community of riders sharing honest feedback.",
  keywords: [
    "ride sharing safety",
    "driver reviews",
    "uber safety",
    "lyft reviews",
    "taxi driver feedback",
    "ride hailing experiences",
    "license plate lookup",
    "driver ratings",
    "passenger safety",
    "community reviews"
  ],
  authors: [{ name: "ShareRideStories Team" }],
  creator: "ShareRideStories",
  publisher: "ShareRideStories",
  metadataBase: new URL('https://www.shareridestories.com'),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ShareRideStories - Community-Driven Ride Safety Reviews",
    description: "Share and discover real ride-hailing driver experiences. Check license plates, read community reviews, and help build safer rides for everyone.",
    url: "https://www.shareridestories.com",
    siteName: "ShareRideStories",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ShareRideStories - Safe ride sharing community",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShareRideStories - Community-Driven Ride Safety Reviews",
    description: "Share and discover real ride-hailing driver experiences. Check license plates, read community reviews, and help build safer rides for everyone.",
    images: ["/logo.png"],
    creator: "@shareridestories",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-google-verification-code",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
