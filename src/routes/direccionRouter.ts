import express from "express"
import { verifyToken } from "../auth/authMiddleware"
import { actualizarDireccion, crearDireccion, eliminarDireccionPorId, getAllDireccion, getDireccionPorId } from "../controllers/direccionController"

const direccionRouter = express.Router()

direccionRouter.get('/', getAllDireccion)
direccionRouter.get('/:id', getDireccionPorId)
direccionRouter.post('/', verifyToken, crearDireccion)
direccionRouter.put('/', verifyToken, actualizarDireccion)
direccionRouter.delete('/:id', verifyToken, eliminarDireccionPorId)

export default direccionRouter