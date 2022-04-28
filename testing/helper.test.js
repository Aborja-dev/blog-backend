const { haveAllProperties } = require('../utils/api_helpers')
const { uniquevalidator } = require('../utils/user_helper')
describe('prueba de helpers', () => {
	test('haveAllProperties', () => {
		const body = {
			name:'Abraha',
			author:'yo',
			message: 'hola',
		}
		const result = haveAllProperties(body, ['name', 'author'])
		expect(result).toBeTruthy()

	})
	test('uniqueValidator', () => {
		const username = 'killer'
		const result = uniquevalidator(username)
		expect(result).not.toBeTruthy()

	})
})