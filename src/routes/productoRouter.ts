import express from "express"
import { actualizarProducto, crearProducto, eliminarProductoPorId, getAllProductos, getProductoPorId } from "../controllers/productoController"

const productoRouter = express.Router()

productoRouter.get('/', getAllProductos)
productoRouter.get('/:id', getProductoPorId)
productoRouter.post('/', crearProducto)
productoRouter.put('/', actualizarProducto)
productoRouter.delete('/:id', eliminarProductoPorId)

export default productoRouter
