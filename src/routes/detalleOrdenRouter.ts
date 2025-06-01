import express from "express"
import { verifyToken } from "../auth/authMiddleware"
import { actualizarDetalleOrden, crearDetalleOrden, eliminarDetalleOrdenPorId, getAllDetalleOrden, getDetalleOrdenPorId } from "../controllers/detalleOrdenController"

const detalleOrdenRouter = express.Router()

detalleOrdenRouter.get('/', getAllDetalleOrden)
detalleOrdenRouter.get('/:id', getDetalleOrdenPorId)
detalleOrdenRouter.post('/', verifyToken, crearDetalleOrden)
detalleOrdenRouter.put('/', verifyToken, actualizarDetalleOrden)
detalleOrdenRouter.delete('/:id', verifyToken, eliminarDetalleOrdenPorId)

export default detalleOrdenRouter