import { Request, Response } from "express"
import { UserService } from "./user"

const service = new UserService()
export class UserController {
    static login =  async (request: Request, response: Response) => {
        const { username, password } = request.body    
        try {
            const result = await service.login(username, password)
            if (!result) {
                response.status(401).json({ error: 'invalid username or password' })            
            }
            response.json(result)
        } catch (error) {
            response.status(400).json({ error: (error as Error).message })
        }
    }
    static getAll = async (request: Request, response: Response) => {
        try {
            const items = await service.getAll()
            response.json(items)
        } catch (error: Error | any) {
            response.status(400).json({ error: error.message })
        }
    }
    static create = async (request: Request, response: Response) => {
        const { name, username, passwordHash } = request.body
        try {
            const item = await service.create({ name, passwordHash, username  })
            response.json(item)
        } catch (error: Error | any) {
            response.status(400).json({ error: error.message })
        } 
    }
    static update = async (request: Request, response: Response) => {
        const { id } = request.params
        const { name, username, passwordHash } = request.body
        try {
            await service.update(id, { name, username, passwordHash })
            response.status(204).end()
        } catch (error: Error | any) {
            response.status(400).json({ error: error.message })
        }
    }
    static remove = async (request: Request, response: Response) => {
        const { id } = request.params
        try {
            await service.remove(id)
            response.status(204).end()
        } catch (error: Error | any) {
            response.status(400).json({ error: error.message })
        }
    }
}