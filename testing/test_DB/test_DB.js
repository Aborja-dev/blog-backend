const { mockData } = require('./mockData')

const Blog = require('../../models/Blog.model')

const startDB =  async ()=>{
	await Blog.deleteMany({})
	let blogObject = new Blog(mockData[0])
	await blogObject.save()
	blogObject = new Blog(mockData[1])
	await blogObject.save()
}
module.exports= startDB


