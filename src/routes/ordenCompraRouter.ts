import express from "express"
import { actualizarOrdenCompra, crearOrdenCompra, eliminarOrdenCompraPorId, getAllOrdenCompra, getOrdenCompraPorId } from "../controllers/ordenCompra"

const ordenCompraRouter = express.Router()

ordenCompraRouter.get('/', getAllOrdenCompra)
ordenCompraRouter.get('/:id', getOrdenCompraPorId)
ordenCompraRouter.post('/', crearOrdenCompra)
ordenCompraRouter.put('/', actualizarOrdenCompra)
ordenCompraRouter.delete('/:id',eliminarOrdenCompraPorId)

export default ordenCompraRouter