/* eslint-disable no-prototype-builtins */
require('dotenv').config()
require('./mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const { notFound } = require('./middleware/error')
const { errorHandler } = require('./middleware/errorHandler')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())

app.get('/api/error', (request, response, next) => {
		console.log('error');
		next(new Error('es un error'))

})

app.use('/api/login',loginRouter)
app.use('/api/blogs',blogsRouter)
app.use('/api/users',usersRouter)
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }