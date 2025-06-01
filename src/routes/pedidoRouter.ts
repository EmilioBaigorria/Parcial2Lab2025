import express from "express"
import { verifyToken } from "../auth/authMiddleware"
import { actualizarPedido, crearPedido, eliminarPedidoPorId, getAllPedidos, getPedidoPorId } from "../controllers/pedidoController"

const pedidoRouter = express.Router()

pedidoRouter.get('/', getAllPedidos)
pedidoRouter.get('/:id', getPedidoPorId)
pedidoRouter.post('/', verifyToken, crearPedido)
pedidoRouter.put('/', verifyToken, actualizarPedido)
pedidoRouter.delete('/:id', verifyToken, eliminarPedidoPorId)

export default pedidoRouter