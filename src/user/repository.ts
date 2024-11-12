import { HydratedDocument } from "mongoose"
import { IUser, User } from "./schema"

interface User {
    username: String
    name: String
    passwordHash: String
    id: string
}

interface UserWithBlogs extends User {
    blogs: {
        _id: string
        title: string
        author: string
        url: string
        likes: number
    }
}



export const findUser = async (key: keyof IUser, value: any) => {
    return await User.findOne({ [key]: value }).populate('blogs')
}

export const selectUser = async (id: string) => {
    const user = await User.findById(id).populate('blogs')
    return user
}

export const transform = <T>(user: HydratedDocument<IUser> ): User => {
    return {
        id: user._id.toString(),
        username: user.username,
        name: user.name,
        passwordHash: user.passwordHash
    }
}

export const UserRepository = {
    selectUser,
    findUser
}

export type IUserRepository = typeof UserRepository