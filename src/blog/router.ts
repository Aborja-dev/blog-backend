import { Router } from "express";
import { Blog } from "./schema";
import { deleteBlog, insertBlog, selectAllBlog, selectBlog, selectBlogForUser, updateBlog } from "./repository";
import { AuthMiddleware } from "../middleware/auth";
export const blogRouter = Router();


blogRouter.get('/', (request, response) => {
    selectAllBlog()
        .then(blogs => {
            response.json(blogs)
        })
})
blogRouter.get('/:id', (request, response) => {
    const id = request.params.id
    selectBlogForUser(id)
        .then(blog => {
            response.json(blog)
        })
})
blogRouter.post('/',AuthMiddleware, (request, response) => {
    console.log(request.app.locals.auth);
    const user = request.app.locals.auth
    if (!user) {
        response.status(401).json({ error: 'invalid token' }).end()
    }
    const blog = request.body
    insertBlog(blog, user.id)
        .then(result => {
            response.status(201).json(result)
        })
})

blogRouter.delete('/:id', (request, response) => {
    const id = request.params.id
    deleteBlog(id)
        .then(() => {
            response.status(204).end()
        })
})

blogRouter.put('/:id', (request, response) => {
    const id = request.params.id
    const blog = request.body
    updateBlog(id, blog)
        .then(result => {
            response.json(result)
        })
})