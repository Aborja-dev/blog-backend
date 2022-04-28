const { mockData } = require('./mockData')
const { mockUsers } = require('./mockusers')
const Blog = require('../../models/Blog.model')
const User = require('../../models/User')

const startDB =  async ()=>{
	await Blog.deleteMany({})
	let blogObject = new Blog(mockData[0])
	await blogObject.save()
	blogObject = new Blog(mockData[1])
	await blogObject.save()
}
const startDBUser =  async ()=>{
	await User.deleteMany({})
	let userObject = new User(mockUsers[0])
	await userObject.save()
}
module.exports= {startDB, startDBUser}


