import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import connectToDatabase from '@/lib/mongodb/connection'
import { Story } from '@/lib/mongodb/models/Story'
import { transformStoryFromDB } from '@/transformers'

// GET /api/stories/[id] - Get single story
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    
    const { id } = params
    const story = await Story.findById(id).lean()

    if (!story) {
      return NextResponse.json(
        { success: false, error: 'Story not found' },
        { status: 404 }
      )
    }

    const transformedStory = transformStoryFromDB(story)

    return NextResponse.json({
      success: true,
      data: transformedStory
    })
  } catch (error) {
    console.error('Error fetching story:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch story' },
      { status: 500 }
    )
  }
}

// DELETE /api/stories/[id] - Delete story (only by owner)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    await connectToDatabase()
    
    const { id } = params
    const story = await Story.findById(id)

    if (!story) {
      return NextResponse.json(
        { success: false, error: 'Story not found' },
        { status: 404 }
      )
    }

    // Check if user owns this story
    if (story.userEmail !== session.user.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - you can only delete your own stories' },
        { status: 403 }
      )
    }

    await Story.findByIdAndDelete(id)

    return NextResponse.json({
      success: true,
      message: 'Story deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting story:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete story' },
      { status: 500 }
    )
  }
}

// PUT /api/stories/[id] - Update story (only by owner)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { plateNumber, story: storyText, location, rating } = body

    // Validation
    if (!plateNumber || !storyText || !rating) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (storyText.length > 500) {
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
    
    const { id } = params
    const existingStory = await Story.findById(id)

    if (!existingStory) {
      return NextResponse.json(
        { success: false, error: 'Story not found' },
        { status: 404 }
      )
    }

    // Check if user owns this story
    if (existingStory.userEmail !== session.user.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - you can only edit your own stories' },
        { status: 403 }
      )
    }

    const updatedStory = await Story.findByIdAndUpdate(
      id,
      {
        plateNumber: plateNumber.toUpperCase(),
        story: storyText.trim(),
        location: location?.trim(),
        rating,
      },
      { new: true }
    )

    const transformedStory = transformStoryFromDB(updatedStory!.toObject())

    return NextResponse.json({
      success: true,
      data: transformedStory
    })
  } catch (error) {
    console.error('Error updating story:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update story' },
      { status: 500 }
    )
  }
}
