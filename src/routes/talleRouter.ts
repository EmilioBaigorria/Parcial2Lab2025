import express from "express"
import { verifyToken } from "../auth/authMiddleware"
import { actualizarTalle, crearTalle, eliminarTallePorId, getAllTalle, getTallePorId } from "../controllers/talleController"

const talleRouter = express.Router()

talleRouter.get('/', getAllTalle)
talleRouter.get('/:id', getTallePorId)
talleRouter.post('/', verifyToken, crearTalle)
talleRouter.put('/', verifyToken, actualizarTalle)
talleRouter.delete('/:id', verifyToken, eliminarTallePorId)

export default talleRouter