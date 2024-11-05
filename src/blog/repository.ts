import { Document, ObjectId } from "mongoose"
import { Blog } from "./schema"
import { User } from "../user/schema"

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
    user?: any
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
        likes: blog.likes,
        user: blog.user
    }
}
export const selectAllBlog = async (): Promise<Blog[]> => {
    const blogs: BlogModel[] = await Blog.find({})
    return blogs.map(transformBlog)
}

export const insertBlog = async (blog: InsertBlog): Promise<Blog> => {
    const user = await User.findById('6729b3af9ebb6007c3cf96e5')
    const newBlog = new Blog({
        user: '6729b3af9ebb6007c3cf96e5',
        ...blog,
    })
    user?.blogs.push(newBlog)
    await user?.save()
    await newBlog.save()
    return transformBlog(newBlog)
}

export const deleteBlog = async (id: String): Promise<Blog> => {
    const blog = await Blog.findByIdAndDelete(id)
    return transformBlog(blog)
}

export const updateBlog = async (id: String, blog: Partial<InsertBlog>): Promise<Blog> => {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    return transformBlog(updatedBlog)
}