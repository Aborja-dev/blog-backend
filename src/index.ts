import express from 'express'
const app = express()
import cors from 'cors'
import { connectDB } from "./mongo";
import { blogRouter } from './blog/router';
import { UserRouter } from './user/router';
import morgan from "morgan";
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('views'))
app.use('/api/blogs', blogRouter)
app.use('/api/users', UserRouter)
app.get('/', (req, res) => {
  res.send(`
    <p>Backen</p>
    <ul>
        <li>
            <p>Blogs</p>
            <a href="/api/blogs">/api/blogs</a>
        </li>
        <li>
            <p>Users</p>
            <a href="/api/users">/api/users</a>
        </li>
    </ul>
    `)
})
const PORT = 3003
const runApp = async() => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })  
}

runApp()
