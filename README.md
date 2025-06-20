# ShareRideStories

A modern, community-driven platform for sharing and discovering ride-hailing experiences based on license plate numbers. Built with Next.js 15, TypeScript, Tailwind CSS, NextAuth.js, MongoDB, and Resend for email verification.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Resend account for email sending

### Installation

1. **Clone and install dependencies:**
```bash
cd shareridestories
npm install
```

2. **Set up environment variables:**
Copy `.env.local` and update with your values:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/shareridestories
# or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/shareridestories

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production

# Resend Email
RESEND_API_KEY=re_Xf61S9NL_3pwS9qFg8QqbL4fUxgztKWKs
EMAIL_FROM=send@shop-page-app.com
```

3. **Initialize the database:**
```bash
npm run init-db
```

4. **Start the development server:**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app!

## 🔐 Authentication Flow

### How it works:
1. **User enters email** on `/auth` page
2. **Resend sends verification email** with sign-in link
3. **User clicks email link** → automatically signed in
4. **User can now share stories** (protected by middleware)
5. **Stories saved to MongoDB** with user information

### Protected Routes:
- `/share` - Create new stories (requires authentication)
- `/api/stories` POST - API endpoint for creating stories

## 🏗️ Architecture

### **Database Models (MongoDB + Mongoose):**

#### User Schema
```typescript
interface IUser {
  _id: string
  email: string
  name?: string
  image?: string
  emailVerified?: Date
  createdAt: Date
  updatedAt: Date
}
```

#### Story Schema
```typescript
interface IStory {
  _id: string
  plateNumber: string // Indexed for fast searches
  story: string // Max 500 characters
  location?: string
  rating: 'positive' | 'negative' | 'neutral'
  upvotes: number
  userId: ObjectId // Reference to User
  userEmail: string // For display
  createdAt: Date
  updatedAt: Date
}
```

### **API Routes:**

#### Stories API
- `GET /api/stories` - Get stories (with optional plate filter)
- `POST /api/stories` - Create story (authenticated)
- `PATCH /api/stories/[id]/upvote` - Upvote a story

#### Authentication API
- `POST /api/auth/[...nextauth]` - NextAuth.js endpoints
- Handles email verification and session management

### **Key Components:**

#### Pages
- **Homepage** (`/`) - Hero, search, recent stories
- **Search** (`/search?plate=XXX`) - Stories for specific plates
- **Share** (`/share?plate=XXX`) - Create stories (auth required)
- **Auth** (`/auth`) - Email sign-in with Resend

#### Reusable Components
- **Header** - Navigation with auth state
- **StoryCard** - Individual story with upvoting
- **StoryList** - List container with empty states
- **SearchBar** - License plate search
- **EmptyState** - No data states
- **Loading** - Loading spinners

#### Custom Hooks
- **useStories** - Fetch stories with plate filtering
- **useCreateStory** - Create stories with validation
- **useUpvoteStory** - Upvote functionality

#### Data Transformers
- **transformUserFromDB** - MongoDB → UI format
- **transformStoryFromDB** - MongoDB → UI format  
- **transformStoryForDB** - UI → MongoDB format

## 🎨 Modern UI Features

### 2025 Design Elements:
- **Glass morphism** with backdrop blur effects
- **Gradient backgrounds** and buttons
- **Micro-animations** and hover effects
- **Responsive design** optimized for mobile
- **Modern color palette** (blues/purples)
- **Accessibility** with proper focus states

### Email Template:
- **Professional HTML email** with inline CSS
- **Responsive design** for all email clients
- **Branded styling** matching the app
- **Security notices** and best practices

## 🔧 Development

### Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run init-db    # Initialize database indexes
```

### Project Structure
```
src/
├── app/                     # App Router pages
│   ├── auth/               # Authentication pages
│   ├── search/             # Search results page
│   ├── share/              # Story creation page
│   ├── api/                # API routes
│   │   ├── auth/           # NextAuth endpoints
│   │   └── stories/        # Story CRUD operations
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Homepage
├── components/             # Reusable UI components
├── hooks/                  # Custom React hooks
├── lib/                    # External service integrations
│   ├── auth/              # NextAuth configuration
│   ├── email/             # Resend email service
│   └── mongodb/           # Database connection & models
├── transformers/          # Data transformation utilities
├── types/                 # TypeScript type definitions
└── utils/                 # Helper functions
```

## 📊 Database Design

### Indexes for Performance:
- **User.email** - Fast user lookups
- **Story.plateNumber + createdAt** - Efficient plate searches
- **Story.userId + createdAt** - User's stories

### Data Flow:
1. **Authentication** → User record in MongoDB
2. **Story Creation** → Story with userId reference
3. **Search** → Query by plateNumber index
4. **Upvoting** → Atomic increment operations

## 🚀 Deployment

### Environment Setup:
1. **MongoDB Atlas** - Production database
2. **Vercel/Railway** - App hosting
3. **Resend** - Email service
4. **Environment variables** - Secure configuration

### Production Checklist:
- [ ] Update `NEXTAUTH_URL` to production domain
- [ ] Generate secure `NEXTAUTH_SECRET`
- [ ] Configure MongoDB Atlas connection
- [ ] Verify Resend domain authentication
- [ ] Test email delivery
- [ ] Run database initialization

This architecture provides a scalable foundation for a community-driven platform with proper authentication, data persistence, and modern UX patterns!
