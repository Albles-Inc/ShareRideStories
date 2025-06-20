import { User as UserType, Story as StoryType } from '@/types'
import { IUser } from '@/lib/mongodb/models/User'
import { IStory } from '@/lib/mongodb/models/Story'

export function transformUserFromDB(dbUser: IUser): UserType {
  return {
    id: dbUser._id.toString(),
    email: dbUser.email,
    name: dbUser.name,
    image: dbUser.image,
    createdAt: dbUser.createdAt,
    updatedAt: dbUser.updatedAt
  }
}

export function transformStoryFromDB(dbStory: IStory): StoryType {
  return {
    id: dbStory._id.toString(),
    plateNumber: dbStory.plateNumber,
    story: dbStory.story,
    timestamp: dbStory.createdAt,
    location: dbStory.location,
    rating: dbStory.rating,
    upvotes: dbStory.upvotes,
    userId: dbStory.userId.toString(),
    userEmail: dbStory.userEmail
  }
}

export function transformStoryForDB(story: Omit<StoryType, 'id' | 'timestamp'>) {
  return {
    plateNumber: story.plateNumber.toUpperCase(),
    story: story.story.trim(),
    location: story.location?.trim(),
    rating: story.rating,
    upvotes: story.upvotes || 0,
    userId: story.userId,
    userEmail: story.userEmail
  }
}
