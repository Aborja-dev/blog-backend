import { Blog } from "./schema"

interface InsertBlog {
    title: String,
    author: String,
    url: String,
    likes: Number
}

export const selectAllBlog = async () => {
    return await Blog.find({})
}

export const insertBlog = async (blog: InsertBlog) => {
    const newBlog = new Blog(blog)
    return await newBlog.save()
}