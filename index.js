/* eslint-disable no-prototype-builtins */
require('dotenv').config()
require('./mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/Blog.model')
const { haveAllProperties } = require('./utils/api_helpers')
const { notFound } = require('./middleware/error')
const { errorHandler } = require('./middleware/errorHandler')
const usersRouter = require('./controllers/users')

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
	Blog
		.find({})
		.then(res => {
			response.status(200).json(res)
		})
})

app.post('/api/blogs', async (request, response) => {
	const properties = ['title', 'author']
	const body = request.body
	
	if (!haveAllProperties(body, properties)) {
		throw 'faltan atributos'
	}
	const newBlog = new Blog({
		...body,
		likes: body.hasOwnProperty('likes')?body.likes:0
	})
	newBlog
		.save()
		.then(res => {
			response.status(200).json(res)
		})
})
app.get('/api/error', (request, response, next) => {
		console.log('error');
		next(new Error('es un error'))

})

app.use('/api/users',usersRouter)
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }