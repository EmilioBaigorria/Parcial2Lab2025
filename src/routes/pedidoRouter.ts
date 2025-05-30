import express from "express"
import { actualizarPedido, crearPedido, eliminarPedidoPorId, getAllPedidos, getPedidoPorId } from "../controllers/pedidoController"

const pedidoRouter = express.Router()

pedidoRouter.get('/', getAllPedidos)
pedidoRouter.get('/:id', getPedidoPorId)
pedidoRouter.post('/', crearPedido)
pedidoRouter.put('/', actualizarPedido)
pedidoRouter.delete('/:id',eliminarPedidoPorId)

export default pedidoRouter