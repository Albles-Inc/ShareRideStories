import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import connectToDatabase from '@/lib/mongodb/connection'
import { Story } from '@/lib/mongodb/models/Story'
import { transformStoryFromDB } from '@/transformers'

// GET /api/user/stories - Get stories by current user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    await connectToDatabase()
    
    const stories = await Story.find({ userEmail: session.user.email })
      .sort({ createdAt: -1 })
      .lean()

    const transformedStories = stories.map(transformStoryFromDB)

    return NextResponse.json({
      success: true,
      data: transformedStories
    })
  } catch (error) {
    console.error('Error fetching user stories:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stories' },
      { status: 500 }
    )
  }
}
