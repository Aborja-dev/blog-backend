const mongoose = require('mongoose')
let conectionString
if (process.env.NODE_ENV === 'test') {
	conectionString = process.env.MONGO_DB_URL_TEST
} else {
	conectionString = process.env.MONGO_DB_URL
}
//conexion a mongo
mongoose.connect(conectionString)
	.then(()=>{
		console.info(`conexion a base de datos exitosa en ${process.env.NODE_ENV}`)
	})
	.catch((e)=>{
		console.error('ha ocurrido un error', e)
	})
