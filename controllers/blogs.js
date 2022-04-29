/* eslint-disable no-prototype-builtins */

const Blog = require('../models/Blog.model')
const User = require('../models/user')
const { haveAllProperties } = require('../utils/api_helpers')

const blogsRouter = require('express').Router()

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

	if (!haveAllProperties(body, properties)) {
		return next('faltan atributos')
	}
	const user = await User.findById(body.user)
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