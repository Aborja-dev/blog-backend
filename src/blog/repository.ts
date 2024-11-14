import { HydratedDocument } from "mongoose"
import { Blog } from "./schema"
import { ForInsertBlog, IBlog } from "./types"

const transformBlog = (blog: HydratedDocument<IBlog>): IBlog => {
    return {
        id: blog._id.toString(),
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: blog.user
    }
}

export const selectAllBlog = async (): Promise<IBlog[]> => {
    const blogs = await Blog.find({})
    return blogs.map(transformBlog)
}

export const selectBlogForUser = async (id: String): Promise<IBlog[]> => {
    try {
        const blogs = await Blog.find({ user: id })
        return blogs.map(transformBlog)
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export const insertBlog = async (blog: ForInsertBlog, userID: string): Promise<IBlog> => {
    console.log(userID);
       
    try {
        const newBlog = new Blog({
            user: userID,
            ...blog,
        })
        await newBlog.save()
        return transformBlog(newBlog)
    } catch (error) {
        throw new Error((error as Error).message)
    } 
    
}

export const deleteBlog = async (id: String): Promise<void> => {
    try {
        await Blog.findByIdAndDelete(id)
    } catch (error) {
        throw new Error((error as Error).message)
    } 
}

export const updateBlog = async (id: String, blog: Partial<ForInsertBlog>): Promise<void> => {
    console.log(id, blog);
    try {
        await Blog.findByIdAndUpdate(id, blog, { new: true })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export const blogRepository = {
    selectAllBlog,
    selectBlogForUser,
    insertBlog,
    deleteBlog,
    updateBlog
}

export type IBlogRepository = typeof blogRepository