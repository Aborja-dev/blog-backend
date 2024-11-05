import mongoose from "mongoose"
import { config } from "dotenv";
config()
export const connectDB = async () => {
    const mongoUrl = process.env.MONGODB_URI
    if (!mongoUrl) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
    }
    try {
        await mongoose.connect(mongoUrl)
        console.log('MongoDB connected')
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

