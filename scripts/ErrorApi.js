class ApiError{
	constructor(req, type, message){
		this.method = req.method
		this.type = type
		this.endpoint = req.url
      this.message = message
	}
}

module.exports = { ApiError }