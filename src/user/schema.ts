import mongoose from "mongoose";
export interface IUser {
    id: string
    username: String
    name: String
    passwordHash: String
    blogs?: any
}
const userSchema = new mongoose.Schema<IUser>({
    username: String,
    name: String,
    passwordHash: String,
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ],
  })

  export const User = mongoose.model<IUser>('User', userSchema)