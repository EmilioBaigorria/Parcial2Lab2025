import express from "express"
import { verifyToken } from "../auth/authMiddleware"
import { actualizarProducto, crearProducto, eliminarProductoPorId, getAllProductos, getProductoPorId } from "../controllers/productoController"

const productoRouter = express.Router()

productoRouter.get('/', getAllProductos)
productoRouter.get('/:id', getProductoPorId)
productoRouter.post('/', verifyToken, crearProducto)
productoRouter.put('/', verifyToken, actualizarProducto)
productoRouter.delete('/:id', verifyToken, eliminarProductoPorId)

export default productoRouter
