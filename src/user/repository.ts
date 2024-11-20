import { HydratedDocument } from "mongoose"
import { IUser, User } from "./schema"

interface User {
    username: String
    name: String
    passwordHash: String
    id: string
}
export type ForInsertUser = Omit<IUser, 'id'>
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
    const user = await User.findById(value).populate('blogs')
    if (!user) return null
    return transform(user)
}

export const selectUser = async (id: string) => {
    const user = await User.findById(id).populate('blogs')
    return user
}
export const getUsers = async (): Promise<IUser[]> => {
    const users = await User.find({})
    return users.map(transform)

}

export const insertUser = async (user: ForInsertUser): Promise<IUser> => {
    const newUser = new User(user)
    await newUser.save()
    return transform(newUser)
}

export const update = async (id: string, user: Partial<ForInsertUser>): Promise<void> => {
    await User.findByIdAndUpdate(id, user, { new: true })
}

export const deleteOne = async (id: string): Promise<void> => {
    await User.findByIdAndDelete(id)
}
export const transform = <T>(user: HydratedDocument<IUser> ): IUser => {
    return {
        id: user._id.toString(),
        username: user.username,
        name: user.name,
        passwordHash: user.passwordHash
    }
}

export const UserRepository = {
    selectUser,
    findUser,
    getUsers,
    insertUser,
    update,
    deleteOne
}

export type IUserRepository = typeof UserRepository