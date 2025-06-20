# ShareRideStories

A modern, community-driven platform for sharing and discovering ride-hailing experiences based on license plate numbers. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🏗️ Project Structure

```
src/
├── app/                    # App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── search/            # Search page
│   │   └── page.tsx
│   ├── share/             # Share story page
│   │   └── page.tsx
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── Header.tsx         # App header with navigation
│   ├── SearchBar.tsx      # License plate search input
│   ├── StoryCard.tsx      # Individual story display
│   ├── StoryList.tsx      # List of stories
│   ├── EmptyState.tsx     # Empty state component
│   ├── Loading.tsx        # Loading spinner
│   └── index.ts           # Component exports
├── types/                 # TypeScript type definitions
│   └── index.ts
└── utils/                 # Utility functions and data
    └── index.ts
```

## 🚀 Features

### Homepage (`/`)
- **Hero Section** with purpose and search functionality
- **Recent Community Stories** showing the 5 latest stories
- **Call-to-Action** section encouraging participation
- **Modern UI** with gradient backgrounds and glass morphism

### Search Page (`/search`)
- **License Plate Search** via URL parameter
- **Story Listing** for specific drivers
- **Empty State** for drivers with no reviews
- **Upvoting System** for community validation

### Share Page (`/share`)
- **Story Submission Form** with validation
- **Rating System** (positive, neutral, negative)
- **Optional Location** tracking
- **Character Limit** (500 characters)
- **Pre-filled License Plate** from search

## 🛠️ Components

### Core Components
- **Header**: Navigation with logo, back button, and share button
- **SearchBar**: License plate input with search functionality  
- **StoryCard**: Individual story display with rating and upvote
- **StoryList**: Container for multiple story cards
- **EmptyState**: Reusable empty state with call-to-action
- **Loading**: Spinner component for loading states

### Component Props
```tsx
// StoryCard
interface StoryCardProps {
  story: Story
  showPlateNumber?: boolean
  showViewAllButton?: boolean
  onUpvote?: (storyId: string) => void
}

// StoryList  
interface StoryListProps {
  stories: Story[]
  showPlateNumber?: boolean
  showViewAllButton?: boolean
  emptyState?: React.ReactNode
  onUpvote?: (storyId: string) => void
}
```

## 🎨 Design System

### Colors
- **Primary**: Blue to Purple gradient (`from-blue-600 to-purple-600`)
- **Background**: Gradient from blue-50 to purple-50
- **Cards**: White with 70% opacity and backdrop blur
- **Text**: Gray scale (900, 600, 500)

### Typography
- **Headings**: Bold with gradient text effects
- **Body**: Regular with good line-height for readability
- **License Plates**: Monospace font family

### Animations
- **Hover Effects**: Scale and shadow transitions
- **Button States**: Transform and color transitions
- **Loading**: Smooth spinning animations
- **Page Transitions**: Backdrop blur and slide effects

## 📱 Mobile-First Design

- **Responsive Layout**: Works on all screen sizes
- **Touch Targets**: Proper sizing for mobile interaction
- **Optimized Performance**: Lazy loading and code splitting
- **Accessibility**: Focus states and semantic HTML

## 🔧 Development

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Key Technologies
- **Next.js 15**: App Router, TypeScript, Suspense
- **Tailwind CSS 4**: Modern styling with glass morphism
- **Local Storage**: Client-side data persistence
- **URL Parameters**: Deep linking for search results

## 📊 Data Management

### Story Interface
```tsx
interface Story {
  id: string
  plateNumber: string
  story: string
  timestamp: Date
  location?: string
  rating: 'positive' | 'negative' | 'neutral'
  upvotes: number
}
```

### Data Flow
1. **Mock Data**: Initial stories for demonstration
2. **Local Storage**: Persistent storage for new stories
3. **State Management**: React useState for UI state
4. **URL Parameters**: Deep linking for search/share

## 🎯 Core User Flows

1. **Search Flow**: Homepage → Search Page → Story Details
2. **Share Flow**: Any page → Share Page → Search Results  
3. **Discovery Flow**: Homepage → Recent Stories → View All

This architecture provides a solid foundation for a scalable, modern web application with clean separation of concerns and reusable components!
