import Script from 'next/script'

interface StructuredDataProps {
  page?: 'home' | 'about'
}

export default function StructuredData({ page = 'home' }: StructuredDataProps) {
  const getStructuredData = () => {
    if (page === 'about') {
      return {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About ShareRideStories",
        "description": "Learn about ShareRideStories' mission to create safer ride-hailing experiences through community-driven transparency.",
        "url": "https://www.shareridestories.com/about",
        "mainEntity": {
          "@type": "Organization",
          "name": "ShareRideStories",
          "url": "https://www.shareridestories.com",
          "logo": "https://www.shareridestories.com/logo.png",
          "description": "Community platform for sharing and discovering ride-hailing driver experiences and safety reviews.",
          "foundingDate": "2024",
          "sameAs": [
            "https://twitter.com/shareridestories"
          ]
        }
      }
    }

    // Default homepage structured data
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "ShareRideStories",
      "alternateName": "Share Ride Stories",
      "url": "https://www.shareridestories.com",
      "description": "Community platform for sharing and discovering ride-hailing driver experiences. Check license plates, read reviews, and help build safer rides.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.shareridestories.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ShareRideStories",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.shareridestories.com/logo.png"
        }
      }
    }
  }

  return (
    <Script
      id={`structured-data-${page}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  )
}