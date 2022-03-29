require('dotenv').config()
require('./mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/Blog.model')
const { notFound } = require('./middleware/error')

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
})

app.post('/api/blogs', (request, response) => {
	const blog = new Blog(request.body)

	blog
		.save()
		.then(result => {
			response.status(201).json(result)
		})
})
app.use(notFound)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})