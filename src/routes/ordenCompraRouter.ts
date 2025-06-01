import express from "express"
import { verifyToken } from "../auth/authMiddleware"
import { actualizarOrdenCompra, crearOrdenCompra, eliminarOrdenCompraPorId, getAllOrdenCompra, getOrdenCompraPorId } from "../controllers/ordenCompra"

const ordenCompraRouter = express.Router()

ordenCompraRouter.get('/', getAllOrdenCompra)
ordenCompraRouter.get('/:id', getOrdenCompraPorId)
ordenCompraRouter.post('/', verifyToken, crearOrdenCompra)
ordenCompraRouter.put('/', verifyToken, actualizarOrdenCompra)
ordenCompraRouter.delete('/:id', verifyToken, eliminarOrdenCompraPorId)

export default ordenCompraRouter