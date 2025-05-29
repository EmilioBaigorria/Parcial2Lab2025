import express from "express"
import { actualizarDireccion, crearDireccion, eliminarDireccionPorId, getAllDireccion, getDireccionPorId } from "../controllers/direccionController"

const direccionRouter = express.Router()

direccionRouter.get('/', getAllDireccion)
direccionRouter.get('/:id', getDireccionPorId)
direccionRouter.post('/', crearDireccion)
direccionRouter.put('/', actualizarDireccion)
direccionRouter.delete('/:id',eliminarDireccionPorId)

export default direccionRouter