import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectToDatabase from '@/lib/mongodb/connection'
import { Story } from '@/lib/mongodb/models/Story'
import { transformStoryFromDB, transformStoryForDB } from '@/transformers'

// GET /api/stories - Get stories (optionally filtered by plate number)
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()
    
    const searchParams = request.nextUrl.searchParams
    const plateNumber = searchParams.get('plate')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = parseInt(searchParams.get('skip') || '0')

    let query = {}
    if (plateNumber) {
      query = { plateNumber: plateNumber.toUpperCase() }
    }

    const stories = await Story.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean()

    const transformedStories = stories.map((story: any) => transformStoryFromDB(story))

    return NextResponse.json({
      success: true,
      data: transformedStories,
      total: await Story.countDocuments(query)
    })
  } catch (error) {
    console.error('Error fetching stories:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stories' },
      { status: 500 }
    )
  }
}

// POST /api/stories - Create a new story (requires authentication)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { plateNumber, story, location, rating } = body

    // Validation
    if (!plateNumber || !story || !rating) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (story.length > 500) {
      return NextResponse.json(
        { success: false, error: 'Story must be 500 characters or less' },
        { status: 400 }
      )
    }

    if (!['positive', 'negative', 'neutral'].includes(rating)) {
      return NextResponse.json(
        { success: false, error: 'Invalid rating' },
        { status: 400 }
      )
    }

    await connectToDatabase()

    const storyData = transformStoryForDB({
      plateNumber,
      story,
      location,
      rating,
      upvotes: 0,
      userId: session.user.id || session.user.email, // Use email as fallback
      userEmail: session.user.email
    })

    const newStory = await Story.create(storyData)
    const transformedStory = transformStoryFromDB(newStory.toObject())

    return NextResponse.json({
      success: true,
      data: transformedStory
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating story:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create story' },
      { status: 500 }
    )
  }
}
