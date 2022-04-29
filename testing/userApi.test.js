const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')
const { usersInDb } = require('../utils/user_helper')
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
})

afterAll(async () => {
	await mongoose.connection.close()
	server.close()
}) 