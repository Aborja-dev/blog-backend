const notFound = (request, response)=>{
   return response.status(404)
}

module.exports = { notFound }