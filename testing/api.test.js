const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const startDB = require('./test_DB/test_DB')
const { mockData } = require('./test_DB/mockData')
const { ApiError } = require('../scripts/ErrorApi')
const len = mockData.length


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
	test('prueba de error', async () => {
		await api
			.get('/api/error')
			.expect(400)
			.expect('Content-Type', /application\/json/)
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
		const newBlog = {
			title: 'mis 10 extensiones favoritas de vsCode',
			author: 'AbrahamBorja',
			url: 'www.miblog.com',
			likes: 5
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

	test('creacion de una nueva entrada sin likes', async () => {
		const newBlog = {
			title: 'mis 10 extensiones favoritas de vsCode',
			author: 'AbrahamBorja',
			url: 'www.miblog.com',
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
		expect(result.body.error).toBeInstanceOf(Object)
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



/* describe('Pruebas del api', () => {
	test('La lista de blogs esta en formato JSON y tiene 2 entradas', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(2)
	})

	test('La lista de blogs tiene un atributo llamado ID', async () => {
		const response = await api.get('/api/blogs')
		response.body.forEach(blog => {
			expect(blog).toHaveProperty('id')
		})
	})

	test('La lista de blogs tiene un atributo llamado ID', async () => {
		const response = await api.get('/api/blogs')
		response.body.forEach(blog => {
			expect(blog).toHaveProperty('id')
		})
	})

	test('Post a blog', async () => {
		const newEntry = {
			title: 'haz tu propio conjunto de tests',
			author: 'Abraham Borja',
			url: 'www.miblog.com',
			likes: 0,
		}
		await api
			.post('/api/blogs')
			.send(newEntry)
			.expect(200)
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(3)

	})

	test('blog not have a likes', async () => {
		const newEntry = {
			title: 'haz tu propio conjunto de tests',
			author: 'Abraham Borja',
			url: 'www.miblog.com',
		}
		await api
			.post('/api/blogs')
			.send(newEntry)
			.expect(200)
		const response = await api.post('/api/blogs')
		expect(response.body).toHaveProperty('likes')
		expect(response.body.likes).toEqual(0)

	})

	test('error 404', async () => {
		await api
			.get('/api/posts')
			.expect(404)
	})
}) */

afterAll(async () => {
	await mongoose.connection.close()
	server.close()
}) 