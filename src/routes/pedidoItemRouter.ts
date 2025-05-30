import express from "express"
import { actualizarPedidoItem, crearPedidoItem, eliminarPedidoItemPorId, getAllPedidoItem, getPedidoItemPorId } from "../controllers/pedidoItem"

const pedidoItemRouter = express.Router()

pedidoItemRouter.get('/', getAllPedidoItem)
pedidoItemRouter.get('/:id', getPedidoItemPorId)
pedidoItemRouter.post('/', crearPedidoItem)
pedidoItemRouter.put('/', actualizarPedidoItem)
pedidoItemRouter.delete('/:id',eliminarPedidoItemPorId)

export default pedidoItemRouter