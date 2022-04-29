const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')
const { mockUsers } = require('./test_DB/mockusers')
const { startDBUser } = require('./test_DB/test_DB')
const api = supertest(app)

beforeEach(startDBUser)
describe('Pruebas de api users', () => {
	test('prueba de login', async () => {
		const login = {
			username: 'drowned',
			password: 'secret'
		}

		await api
			.post('/api/login')
			.send(login)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const result = await api.post('/api/users').send(login)
		expect(result.body).toHaveProperty('token')
	})
	test('login no autorizado', async () => {

		const login = {
			username: 'drowned',
			password: 'noye123'
		}

		await api
			.post('/api/login')
			.send(login)
			.expect(401)
			.expect('Content-Type', /application\/json/)
	})
})
afterAll(async () => {
	await mongoose.connection.close()
	server.close()
}) 