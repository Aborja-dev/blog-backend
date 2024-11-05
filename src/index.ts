import express from 'express'
const app = express()
import cors from 'cors'
import { connectDB } from "./mongo";
import { blogRouter } from './blog/router';
import { UserRouter } from './user/router';

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', UserRouter)
const PORT = 3003
const runApp = async() => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })  
}

runApp()
