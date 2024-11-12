import { Router } from "express";
import { Blog } from "./schema";
import { blogRepository, deleteBlog, insertBlog, selectAllBlog, selectBlog, selectBlogForUser, updateBlog } from "./repository";
import { AuthMiddleware } from "../middleware/auth";
import { Service } from "../service";
import { UserRepository } from "../user/repository";
export const blogRouter = Router();


blogRouter.get('/', (request, response) => {
    selectAllBlog()
        .then(blogs => {
            response.json(blogs)
        })
})
blogRouter.get('/:id', (request, response) => {
    const id = request.params.id
    try {

        selectBlogForUser(id)
            .then(blog => {
                response.json(blog)
            })
    } catch (error) {
        return response.status(401).json({ error: 'invalid token' }).end()
    }
})
blogRouter.post('/', AuthMiddleware, (request, response) => {
    const { user } = request.app.locals.auth
    const service = new Service(UserRepository, blogRepository)
    if (!user) {
        response.status(401).json({ error: 'invalid token' }).end()
    }
    try {
        const blog = request.body
        service.createNewBlog(blog, user.id)
            .then(result => {
                return response.status(201).json(result)
            })
    } catch (error) {
        return response.status(401).json({ error: 'invalid token' }).end()
    }

})

blogRouter.delete('/:id', (request, response) => {
    const id = request.params.id
    try {

        deleteBlog(id)
            .then(() => {
                response.status(204).end()
            })
    } catch (error) {
        return response.status(401).json({ error: 'invalid token' }).end()
    }
})

blogRouter.put('/:id', (request, response) => {
    try {
        const id = request.params.id
        const blog = request.body
        updateBlog(id, blog)
            .then(result => {
                response.json(result)
            })
    } catch (error) {
        return response.status(401).json({ error: 'invalid token' }).end()
    }

})