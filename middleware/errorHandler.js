const { ApiError } = require('../scripts/ErrorApi')

const errorHandler = (err, request, response, next) => {
	console.log(err)
	const _error = new ApiError(request, 'Post error', err)
	//const _error = new Error('post error')
	response.status(400).json({error: _error})
}

module.exports = {errorHandler}