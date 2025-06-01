import express from "express"
import { verifyToken } from "../auth/authMiddleware"
import { actualizarOrdenCompra, crearOrdenCompra, eliminarOrdenCompraPorId, getAllOrdenCompra, getOrdenCompraPorId } from "../controllers/ordenCompra"

const ordenCompraRouter = express.Router()

ordenCompraRouter.get('/', getAllOrdenCompra)
ordenCompraRouter.get('/:id', getOrdenCompraPorId)
ordenCompraRouter.post('/', crearOrdenCompra, verifyToken)
ordenCompraRouter.put('/', actualizarOrdenCompra, verifyToken)
ordenCompraRouter.delete('/:id',eliminarOrdenCompraPorId, verifyToken)

export default ordenCompraRouter