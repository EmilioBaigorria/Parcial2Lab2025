import express from "express"
import { verifyToken } from "../auth/authMiddleware"
import { actualizarPedido, crearPedido, eliminarPedidoPorId, getAllPedidos, getPedidoPorId } from "../controllers/pedidoController"

const pedidoRouter = express.Router()

pedidoRouter.get('/', getAllPedidos)
pedidoRouter.get('/:id', getPedidoPorId)
pedidoRouter.post('/', crearPedido, verifyToken)
pedidoRouter.put('/', actualizarPedido, verifyToken)
pedidoRouter.delete('/:id',eliminarPedidoPorId, verifyToken)

export default pedidoRouter