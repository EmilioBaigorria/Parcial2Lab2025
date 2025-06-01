import express from "express"
import { verifyToken } from "../auth/authMiddleware"
import { actualizarProducto, crearProducto, eliminarProductoPorId, getAllProductos, getProductoPorId } from "../controllers/productoController"

const productoRouter = express.Router()

productoRouter.get('/', getAllProductos)
productoRouter.get('/:id', getProductoPorId)
productoRouter.post('/', crearProducto, verifyToken)
productoRouter.put('/', actualizarProducto, verifyToken)
productoRouter.delete('/:id', eliminarProductoPorId, verifyToken)

export default productoRouter
