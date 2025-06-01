import express from "express"
import { verifyToken } from "../auth/authMiddleware"
import { actualizarDetalleOrden, crearDetalleOrden, eliminarDetalleOrdenPorId, getAllDetalleOrden, getDetalleOrdenPorId } from "../controllers/detalleOrdenController"

const detalleOrdenRouter = express.Router()

detalleOrdenRouter.get('/', getAllDetalleOrden)
detalleOrdenRouter.get('/:id', getDetalleOrdenPorId)
detalleOrdenRouter.post('/', crearDetalleOrden, verifyToken)
detalleOrdenRouter.put('/', actualizarDetalleOrden, verifyToken)
detalleOrdenRouter.delete('/:id',eliminarDetalleOrdenPorId, verifyToken)

export default detalleOrdenRouter