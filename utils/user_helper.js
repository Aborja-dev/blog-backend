const User = require('../models/user')

const usersInDb = async () => {
	const users = await User.find({})
	return users
}

const uniquevalidator = async (_username) => {
	const allusers = await usersInDb()
	const findUser = allusers.some(({ username }) => username == _username)
	return !findUser
}

const validatorUser = async (usuario) => {
	const error = {}
	if (usuario.username.length < 3) {
		error['username'] = 'el nombre debe ser mayor a 3 caracteres'
	}
	if (usuario.password.length <= 3) {
		error['password'] = 'la contraseña debe ser mayor a 3 caracteres'
	}
	const unique = await uniquevalidator(usuario.username)
	if (!unique) { error['unique'] = 'el usuario ya existe' }
	return Object.entries(error) == 0
		? null
		: error
}


module.exports = { uniquevalidator, usersInDb, validatorUser }