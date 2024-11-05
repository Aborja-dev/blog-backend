import { config } from "dotenv";
config()
import jwt from "jsonwebtoken";
export const createToken = (user: any) => {
    return jwt.sign({ user }, process.env.JWT_SECRET || 'secret') 
}

export const decodeToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret')
}