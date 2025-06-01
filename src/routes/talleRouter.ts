import express from "express"
import { verifyToken } from "../auth/authMiddleware"
import { actualizarTalle, crearTalle, eliminarTallePorId, getAllTalle, getTallePorId } from "../controllers/talleController"

const talleRouter = express.Router()

talleRouter.get('/', getAllTalle)
talleRouter.get('/:id', getTallePorId)
talleRouter.post('/', crearTalle, verifyToken)
talleRouter.put('/', actualizarTalle, verifyToken)
talleRouter.delete('/:id',eliminarTallePorId, verifyToken)

export default talleRouter