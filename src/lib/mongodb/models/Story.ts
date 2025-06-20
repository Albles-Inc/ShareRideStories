import mongoose, { Schema, Document } from 'mongoose'

export interface IStory extends Document {
  _id: string
  plateNumber: string
  story: string
  location?: string
  rating: 'positive' | 'negative' | 'neutral'
  upvotes: number
  userId: mongoose.Types.ObjectId
  userEmail: string
  createdAt: Date
  updatedAt: Date
}

const StorySchema = new Schema<IStory>({
  plateNumber: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  story: {
    type: String,
    required: true,
    maxlength: 500,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  rating: {
    type: String,
    enum: ['positive', 'negative', 'neutral'],
    required: true,
    default: 'neutral'
  },
  upvotes: {
    type: Number,
    default: 0,
    min: 0
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

// Compound index for efficient plate number queries
StorySchema.index({ plateNumber: 1, createdAt: -1 })
// Index for user stories
StorySchema.index({ userId: 1, createdAt: -1 })

export const Story = mongoose.models.Story || mongoose.model<IStory>('Story', StorySchema)
