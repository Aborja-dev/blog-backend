import { Document } from "mongoose"
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
export const selectBlogForUser = async (id: String): Promise<Blog[]> => {
    try {
        const blogs = await Blog.find({ user: id })
        return blogs.map(transformBlog)
    } catch (error) {
        console.log(error)
    }
}
export const insertBlog = async (blog: InsertBlog, userID: String): Promise<Blog> => {
    console.log(userID);

    const user = await User.findById(userID)
    const newBlog = new Blog({
        user: userID,
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
    console.log(id, blog);
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
        return transformBlog(updatedBlog)
    } catch (e) {
        console.log(e.message);

    }

}