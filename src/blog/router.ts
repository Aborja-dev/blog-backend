import { Router } from "express";
import { Blog } from "./schema";
import { insertBlog, selectAllBlog } from "./repository";
export const blogRouter = Router();


blogRouter.get('/', (request, response) => {
    selectAllBlog()
        .then(blogs => {
            response.json(blogs)
        })
})

blogRouter.post('/', (request, response) => {
    const blog = request.body
    insertBlog(blog)
        .then(result => {
            response.status(201).json(result)
        })
})