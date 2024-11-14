

import { blogRepository, IBlogRepository } from "./blog/repository";
import { ForInsertBlog } from "./blog/types";
import { IUserRepository, UserRepository } from "./user/repository";

export class Service {
    user: any
    constructor (
        private readonly User: IUserRepository = UserRepository,
        private readonly Blog: IBlogRepository = blogRepository
    ) {}
    loadUser = async (id: string) => {this.user = this.User.selectUser(id)}
    createNewBlog = async (input: ForInsertBlog, id: string) => {
        const user = await this.User.selectUser(id)
        const blog = await this.Blog.insertBlog(input, id)
        user?.blogs.push(blog.id)
        await user?.save()
        return blog
    }
    updateBlog = async (id: string, input: Partial<ForInsertBlog>) => this.Blog.updateBlog(id, input)
    deleteBlog = async (id: string) => this.Blog.deleteBlog(id)
}