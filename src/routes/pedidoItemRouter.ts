import express from "express"
import { verifyToken } from "../auth/authMiddleware"
import { actualizarPedidoItem, crearPedidoItem, eliminarPedidoItemPorId, getAllPedidoItem, getPedidoItemPorId } from "../controllers/pedidoItem"

const pedidoItemRouter = express.Router()

pedidoItemRouter.get('/', getAllPedidoItem)
pedidoItemRouter.get('/:id', getPedidoItemPorId)
pedidoItemRouter.post('/', verifyToken, crearPedidoItem)
pedidoItemRouter.put('/', verifyToken, actualizarPedidoItem)
pedidoItemRouter.delete('/:id', verifyToken, eliminarPedidoItemPorId)

export default pedidoItemRouter