import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectToDatabase from '@/lib/mongodb/connection'
import { Story } from '@/lib/mongodb/models/Story'
import { transformStoryFromDB } from '@/transformers'

// PATCH /api/stories/[id]/upvote - Upvote a story

type RouteParams = Promise<{ id: string }>

export async function PATCH(
  request: NextRequest,
  { params }: { params: RouteParams }
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
    
    const { id } = await params
    
    // Check if user already upvoted this story
    const existingStory = await Story.findById(id)
    if (!existingStory) {
      return NextResponse.json(
        { success: false, error: 'Story not found' },
        { status: 404 }
      )
    }

    if (existingStory.upvotedBy && existingStory.upvotedBy.includes(session.user.email)) {
      return NextResponse.json(
        { success: false, error: 'You have already upvoted this story' },
        { status: 400 }
      )
    }
    
    const story = await Story.findByIdAndUpdate(
      id,
      { 
        $inc: { upvotes: 1 },
        $addToSet: { upvotedBy: session.user.email }
      },
      { new: true }
    )

    const transformedStory = transformStoryFromDB(story.toObject())

    return NextResponse.json({
      success: true,
      data: transformedStory
    })
  } catch (error) {
    console.error('Error upvoting story:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upvote story' },
      { status: 500 }
    )
  }
}
