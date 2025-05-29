import express from "express"
import dotenv from "dotenv"
import categoriaRouter from "./routes/categoriaRouter"
import descuentoRouter from "./routes/descuentoRoute"
import detalleOrdenRouter from "./routes/detalleOrdenRouter"
import direccionRouter from "./routes/direccionRouter"
dotenv.config()

const expApp = express()

expApp.use(express.json())

//Rutas
expApp.use('/categorias', categoriaRouter)

expApp.use('/descuento',descuentoRouter)

expApp.use('/detalleOrden',detalleOrdenRouter)

expApp.use('/direcciones',direccionRouter)

export default expApp