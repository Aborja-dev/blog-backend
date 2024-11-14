import { Router } from "express";
import { UserController } from "./controller";

export const UserRouter = Router()


UserRouter.post('/login', UserController.login)
UserRouter.get('/', UserController.getAll)
UserRouter.post('/', UserController.create)
UserRouter.put('/:id', UserController.update)
UserRouter.delete('/:id', UserController.remove)