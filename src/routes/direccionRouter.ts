import express from "express"
import { verifyToken } from "../auth/authMiddleware"
import { actualizarDireccion, crearDireccion, eliminarDireccionPorId, getAllDireccion, getDireccionPorId } from "../controllers/direccionController"

const direccionRouter = express.Router()

direccionRouter.get('/', getAllDireccion)
direccionRouter.get('/:id', getDireccionPorId)
direccionRouter.post('/', crearDireccion, verifyToken)
direccionRouter.put('/', actualizarDireccion, verifyToken)
direccionRouter.delete('/:id',eliminarDireccionPorId, verifyToken)

export default direccionRouter