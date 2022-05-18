/* eslint-disable no-prototype-builtins */
const jwt = require('jsonwebtoken')
const Blog = require('../models/Blog.model')
const User = require('../models/user')
const { haveAllProperties } = require('../utils/api_helpers')

const blogsRouter = require('express').Router()
const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
	  return authorization.substring(7)
	}
	return null
 }
blogsRouter.get('/', async (request, response) => {

	Blog
		.find({})
		.populate('user', { username: 1, name: 1 })
		.then(res => {
			response.status(200).json(res)
		})
})

blogsRouter.post('/', async (request, response, next) => {
	const properties = ['title', 'author']
	const body = request.body
	const token = getTokenFrom(request)
	if (!haveAllProperties(body, properties)) {
		return next('faltan atributos')
	}
	const decodedToken = jwt.verify(token, 'SECRET')
  	if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  	}
  	const user = await User.findById(decodedToken.id)
	const newBlog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.hasOwnProperty('likes')?body.likes:0,
      user: user._id
	})
	const savedNote = await newBlog.save()
	user.notes = user.notes.concat(savedNote._id)
	await user.save()
   
	response.json(savedNote)
})

module.exports = blogsRouter