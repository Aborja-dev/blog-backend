import { Router } from "express";
import { selectAllBlog } from "./repository";
import { AuthMiddleware } from "../middleware/auth";
import { BlogController } from "./controller";
export const blogRouter = Router();

blogRouter.get('/', (request, response) => {
    selectAllBlog()
        .then(blogs => {
            response.json(blogs)
        })
})
blogRouter.get('/:id',AuthMiddleware ,BlogController.getBlogs)
blogRouter.post('/', AuthMiddleware, BlogController.create)
blogRouter.delete('/:id', AuthMiddleware, BlogController.remove)
blogRouter.put('/:id', AuthMiddleware, BlogController.update)