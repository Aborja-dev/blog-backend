const { ApiError } = require('../scripts/ErrorApi')

const errorHandler = (err, request, response, next) => {
	switch (err.name) {
		case 'CastError':
			return response.status(400).send({
				error: new ApiError(request, 'Bad request error', 'malformatted id')
			 })
		case 'ValidationError':
			return response.status(400).json({
				error: new ApiError(request, 'Validation error', error.message )
			})
		case 'JsonWebTokenError':
			return response.status(401).json({
				error: new ApiError(request, 'Bad token error', 'invalid token' )
			})
		default:
			response.status(400).json({
				error: err
			}) 
	}
}

module.exports = {errorHandler}