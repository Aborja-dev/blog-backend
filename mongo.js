const mongoose = require('mongoose')

const conectionString = process.env.MONGO_DB_URL
//conexion a mongo
mongoose.connect(conectionString)
	.then(()=>{
		console.info('conexion a base de datos exitosa')
	})
	.catch((e)=>{
		console.error('ha ocurrido un error', e)
	})
