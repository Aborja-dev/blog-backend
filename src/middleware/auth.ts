import { Request } from "express"
import { decodeToken } from "../user/auth/token"

export const AuthMiddleware = (request: Request, response: any, next: any) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const token = authorization.substring(7)
        try {
            request.app.locals.auth = decodeToken(token)
        } catch (error) {
            return response.status(401).json({ error: 'invalid token' }).end()
        }
    }
    next()
}