const { haveAllProperties } = require('../utils/api_helpers')

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
})