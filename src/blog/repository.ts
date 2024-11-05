import { Document } from "mongoose"
import { Blog } from "./schema"

interface InsertBlog {
    title: String,
    author: String,
    url: String,
    likes: Number
}

interface Blog {
    title: String,
    author: String,
    url: String,
    likes: Number
    id: String
}

interface BlogModel extends Document {
    "_id": String,
    "title": String,
    "author": String,
    "url": String,
    "likes": Number,
    "__v": Number
}

const transformBlog = (blog: any): Blog => {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }
}
export const selectAllBlog = async (): Promise<Blog[]> => {
    const blogs: BlogModel[] = await Blog.find({})
    return blogs.map(transformBlog)
}

export const insertBlog = async (blog: InsertBlog): Promise<Blog> => {
    const newBlog = new Blog(blog)
    await newBlog.save()
    return transformBlog(newBlog)
}