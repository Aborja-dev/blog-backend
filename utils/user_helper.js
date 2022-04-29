const { mockUsers } = require('../testing/test_DB/mockusers')
const User = require('../models/user')

const usersInDb = async () => {
	const users = await User.find({})
	return users
}



const uniquevalidator = (_username) => {
	const allusers = mockUsers
   const findUser  = allusers.some( ({username})=> username == _username )
	return !findUser
}

module.exports = { uniquevalidator,usersInDb }