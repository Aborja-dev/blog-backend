const notFound = (request, response)=>{
	return response.status(404).end()
}

module.exports = { notFound }