const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { uniquevalidator, validatorUser} = require('../utils/user_helper') 
usersRouter.get('/', async (request, response)=>{
	const users = await User
	.find({}).populate('notes', { title: 1, url: 1 })
	response.json(users)
	
})

usersRouter.post('/', async (request, response, next) => {
	const body = request.body
	const validator = await validatorUser(body)
	if(validator){
		return next('invalid user')
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