import express from "express"
import { verifyToken } from "../auth/authMiddleware"
import { actualizarPedidoItem, crearPedidoItem, eliminarPedidoItemPorId, getAllPedidoItem, getPedidoItemPorId } from "../controllers/pedidoItem"

const pedidoItemRouter = express.Router()

pedidoItemRouter.get('/', getAllPedidoItem)
pedidoItemRouter.get('/:id', getPedidoItemPorId)
pedidoItemRouter.post('/', crearPedidoItem, verifyToken)
pedidoItemRouter.put('/', actualizarPedidoItem, verifyToken)
pedidoItemRouter.delete('/:id',eliminarPedidoItemPorId, verifyToken)

export default pedidoItemRouter