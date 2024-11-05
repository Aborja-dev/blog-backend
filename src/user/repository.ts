import { HydratedDocument } from "mongoose"
import { IUser, User } from "./schema"

interface User {
    username: String
    name: String
    passwordHash: String
    id: string
}

interface UserWithBlogs extends User {
    blogs: any
}

export const findUser = async (key: keyof IUser, value: any) => {
    return await User.findOne({ [key]: value })
}

export const selectUser = (id: string) => {
    return User.findById(id).populate('blogs')
}

export const transform = (user: HydratedDocument<IUser> ): User => {
    return {
        id: user._id.toString(),
        username: user.username,
        name: user.name,
        passwordHash: user.passwordHash
    }
}