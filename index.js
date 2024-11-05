// importar librerias
import express from "express";
import cors from "cors";
import { config } from 'dotenv'
import morgan from 'morgan'
// importar variables de entorno
config()
// crear aplicacion express
const app = express();
// configurar middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// rutas
app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(process.env.PORT ?? 3000, () => {
    console.log('servidor corriendo en puerto', process.env.PORT ?? 3000);
})

