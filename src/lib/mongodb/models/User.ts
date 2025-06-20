import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  _id: string
  email: string
  name?: string
  image?: string
  emailVerified?: Date
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  emailVerified: {
    type: Date
  }
}, {
  timestamps: true
})

// Index for faster email lookups (unique index)
UserSchema.index({ email: 1 }, { unique: true })

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
