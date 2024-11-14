import mongoose from 'mongoose'
import { IBlog } from './types'

const blogSchema = new mongoose.Schema<IBlog>({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

export const Blog = mongoose.model<IBlog>('Blog', blogSchema)