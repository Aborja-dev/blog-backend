const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const { startDB } = require('./test_DB/test_DB')
const { mockData } = require('./test_DB/mockData')
const len = mockData.length
const { usersInDb } = require('../utils/user_helper')


beforeEach(startDB)
describe('Pruebas de api', () => {
	test('prueba de endpoint get', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
		const result = await api.get('/api/blogs')
		expect(result.body).toHaveLength(len)

	})

	test('los blogs tienen atributo id', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
		const result = await api.get('/api/blogs')
		result.body.forEach(blog => {
			expect(blog).toHaveProperty('id')
		})

	})
	test('creacion de una nueva entrada', async () => {
		const users = await usersInDb()		
		const {_id: id } = users[0]

		const newBlog = {
			title: 'mis 10 extensiones favoritas de vsCode',
			author: 'AbrahamBorja',
			url: 'www.miblog.com',
			likes: 5,
			user: id,
		}
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const result = await api.get('/api/blogs')

		expect(result.body).toHaveLength(len + 1)
		const lastentry = result.body.pop()
		expect(lastentry.likes).toEqual(newBlog.likes)

	})
	test('busquedaDelUsuario', async () => {
const users = await usersInDb()		
		const {_id: id } = users[0]


		const newBlog = {
			title: 'mis 10 extensiones favoritas de vsCode',
			author: 'AbrahamBorja',
			url: 'www.miblog.com',
			likes: 5,
			user: id,
		}
		const result = await api.post('/api/blogs').send(newBlog)
		expect(result.body).toHaveProperty('user')
	})

	test('creacion de una nueva entrada sin likes', async () => {
		const users = await usersInDb()		
		const {_id: id } = users[0]
		const newBlog = {
			title: 'mis 10 extensiones favoritas de vsCode',
			author: 'AbrahamBorja',
			url: 'www.miblog.com',
			user: id,
		}
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const result = await api
			.post('/api/blogs')
			.send(newBlog)
		expect(result.body.likes).toEqual(0)

	})
	test('devuelve una lista de blogs con usuario ', async () => {
		const response = await api.get('/api/blogs')

	})

	test('envia una entrada vacia', async () => {
		const newBlog = {
			url: 'www.miblog.com',
		}
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		const result = await api
			.post('/api/blogs')
			.send(newBlog)
		expect(result.body).toBeInstanceOf(Object)
	})
	/* 	test('la entrada ya existe', async () => {
			const newBlog = {
				title: 'mis 10 extensiones favoritas de vsCode',
				author: 'AbrahamBorja'
			}
			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(200)
				.expect('Content-Type', /application\/json/)
	
			const result = await api
				.post('/api/blogs')
				.send(newBlog)
			expect(result.body).toHaveProperty('id')
	
		}) */
	/* 	test('prueba del midleware errorhandler', async ()=>{
			await api
				.get('/api/error')
				.expect(400)
		}) */
	test('prueba del midleware notFound', async () => {
		await api
			.get('/api/errordoestas')
			.expect(404)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
	server.close()
}) 