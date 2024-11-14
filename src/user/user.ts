import { comparePassword, createToken } from "./auth/token";
import { ForInsertUser, IUserRepository, UserRepository } from "./repository";
import { IUser } from "./schema";

export class UserService {
    constructor(private readonly User: IUserRepository = UserRepository) {}
    login = async (username: string, password: string): Promise<any | null> => {
        // find user
        const user = await this.User.findUser('username', username)
        if (!user) return null
        const isMatch = comparePassword(password, user.passwordHash)
        if (!isMatch) return null
        const tokenPayload = {
            id: user.id,
        }
        const token = createToken(tokenPayload)
        return { token, id: user.id, name: user.name, blogs: user.blogs }
    }
    getAll = async (): Promise<IUser[]> => {
        const users = await this.User.getUsers()
        return users
    }
    create = async (user: ForInsertUser): Promise<IUser> => {
        const createdUser = await this.User.insertUser(user)
        return createdUser
    }
    update = async (id: string, user: Partial<ForInsertUser>): Promise<void> => {
        const updatedUser = await this.User.update(id, user)
    }
    remove = async (id: string): Promise<void> => {
        await this.User.deleteOne(id)
    }
}