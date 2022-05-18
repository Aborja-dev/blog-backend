/* const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')
const { usersInDb, uniquevalidator, validatorUser } = require('../utils/user_helper')
const { mockUsers } = require('./test_DB/mockusers')
const { startDBUser } = require('./test_DB/test_DB')
const api = supertest(app)

beforeEach(startDBUser)
describe('Pruebas de api users', () => {
	test('prueba de endpoint get users', async () => {
		await api
			.get('/api/users')
			.expect(200)
			.expect('Content-Type', /application\/json/)
		const result = await api.get('/api/users')
		expect(result.body).toHaveLength(mockUsers.length)
	})
	test('prueba de userinDb', async () => {
		const result = await usersInDb()
		expect(result).toHaveLength(mockUsers.length)
	})
	test('prueba de endpoint create new user', async () => {

		const newuser = {
			'username': 'Marak',
			'name': 'Mario',
			'password': '1234'
		}

		await api
			.post('/api/users')
			.send(newuser)
			.expect(200)
			.expect('Content-Type', /application\/json/)
		const result = await api.get('/api/users')
		expect(result.body).toHaveLength(mockUsers.length + 1)
	})
	test('nombre de usuario debe ser unico', async () => {

		const newuser = {
			'username': 'killer',
			'name': 'Mario',
			'password': '1234'
		}

		await api
			.post('/api/users')
			.send(newuser)
			.expect(400)
			
	})
	test('prueba de uniquevalidator', async () => {
		const resultTrue = await uniquevalidator('abraham')
		expect(resultTrue).toBe(true)
		const resultFalse = await uniquevalidator('killer')
		expect(resultFalse).toBe(false)
	})
	test('prueba de user validator', async () => {
		user1 = {username: 'abraham', password: 'asdf1234'}
		user2 = {username: 'abraham', password: 'adf'}
		user3 = {username: 'killer', password: 'asdf1234'}
		let result = await validatorUser(user1)
		expect(result).toBe(null)
		result = await validatorUser(user2)
		expect(result).toHaveProperty('password')
		result = await validatorUser(user3)
		expect(result).toHaveProperty('unique')
	})
})

afterAll(async () => {
	await mongoose.connection.close()
	server.close()
})  */