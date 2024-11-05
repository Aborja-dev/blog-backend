import { Router } from "express";
import { findUser, selectUser } from "./repository";
import { IUser } from "./schema";
import { createToken } from "./auth/token";

export const UserRouter = Router()
interface AuthenticatedUser extends IUser {
    token: string
}
UserRouter.get('/:id', (request, response) => {
    const id = request.params.id
    selectUser(id)
        .then(user => {
            response.json(user)
        })
})


UserRouter.post('/login', async (request, response) => {
    const { username, password } = request.body
    const userInDB = await findUser('username', username)
    if (!userInDB) {
        response.status(401).json({ error: 'invalid username or password' }).end()
    }
    const tokenPayload = {
        username: userInDB?.username,
        id: userInDB?.id
    }
    const token = createToken(tokenPayload)
    response.json({ token })
})