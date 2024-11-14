import { Request, Response } from "express";
import { blogRepository } from "./repository";
import { Service } from "../service";

export class BlogController {
    constructor() { }
    static getBlogs = async (request: Request, response: Response) => {
        try {
            const { id } = request.app.locals.auth.user
            const blogs = await blogRepository.selectBlogForUser(id)
            response.json(blogs)
        } catch (error: Error | any) {
            response.status(400).json({ error: error.message })
        }
    }
    static create = async (request: Request, response: Response) => {
        const { title, author, url, likes } = request.body
        const { id } = request.app.locals.auth.user
        let service = new Service()
        try {
            const blog = await service.createNewBlog({ title, author, url, likes }, id)
            response.json(blog)
        } catch (error: Error | any) {
            response.status(400).json({ error: error.message })
        } finally {
            service = null as unknown as Service
        }
    }
    static update = async (request: Request, response: Response) => {
        const { id } = request.params
        const { title, author, url, likes } = request.body
        try {
            await blogRepository.updateBlog(id, { title, author, url, likes })
            response.status(204).end()
        } catch (error: Error | any) {
            response.status(400).json({ error: error.message })
        }
    }
    static remove = async (request: Request, response: Response) => {
        const { id } = request.params
        try {
            await blogRepository.deleteBlog(id)
            response.status(204).end()
        } catch (error: Error | any) {
            response.status(400).json({ error: error.message })
        }
    }
}