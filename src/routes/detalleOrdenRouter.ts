import express from "express"
import { actualizarDetalleOrden, crearDetalleOrden, eliminarDetalleOrdenPorId, getAllDetalleOrden, getDetalleOrdenPorId } from "../controllers/detalleOrdenController"

const detalleOrdenRouter = express.Router()

detalleOrdenRouter.get('/', getAllDetalleOrden)
detalleOrdenRouter.get('/:id', getDetalleOrdenPorId)
detalleOrdenRouter.post('/', crearDetalleOrden)
detalleOrdenRouter.put('/', actualizarDetalleOrden)
detalleOrdenRouter.delete('/:id',eliminarDetalleOrdenPorId)

export default detalleOrdenRouter