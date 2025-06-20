import { NextRequest, NextResponse } from 'next/server'
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
    await connectToDatabase()
    
    const { id } = await params
    
    const story = await Story.findByIdAndUpdate(
      id,
      { $inc: { upvotes: 1 } },
      { new: true }
    )

    if (!story) {
      return NextResponse.json(
        { success: false, error: 'Story not found' },
        { status: 404 }
      )
    }

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
