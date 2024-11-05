import express from 'express'
const app = express()
import cors from 'cors'
import { connectDB } from "./mongo";

app.use(cors())
app.use(express.json())

const PORT = 3003
const runApp = async() => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })  
}

runApp()
