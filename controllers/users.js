const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { uniquevalidator} = require('../utils/user_helper') 
usersRouter.get('/', async (request, response)=>{
	const result = await User.find({})
	response.json(result)
})

usersRouter.post('/', async (request, response) => {
	const body = request.body
	if(!uniquevalidator(body.username)){
		return response.status(400).end()
	}
	
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash,
	})
	const savedUser = await user.save()
	response.json(savedUser)
})

module.exports = usersRouter