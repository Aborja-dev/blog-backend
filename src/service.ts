
import { IBlogRepository, InsertBlog } from "./blog/repository";
import { IUserRepository } from "./user/repository";

export class Service {
    user: any
    constructor (
        private readonly User: IUserRepository,
        private readonly Blog: IBlogRepository
    ) {}
    loadUser = async (id: string) => {this.user = this.User.selectUser(id)}
    createNewBlog = async (input: InsertBlog, id: string) => {
        const user = await this.User.selectUser(id)
        const blog = await this.Blog.insertBlog(input, id)
        user?.blogs.push(blog.id)
        await user?.save()
        return blog
    }
}