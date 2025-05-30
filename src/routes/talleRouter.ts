import express from "express"
import { actualizarTalle, crearTalle, eliminarTallePorId, getAllTalle, getTallePorId } from "../controllers/talleController"

const talleRouter = express.Router()

talleRouter.get('/', getAllTalle)
talleRouter.get('/:id', getTallePorId)
talleRouter.post('/', crearTalle)
talleRouter.put('/', actualizarTalle)
talleRouter.delete('/:id',eliminarTallePorId)

export default talleRouter