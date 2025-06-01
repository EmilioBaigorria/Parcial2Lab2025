import express from "express"
import { verifyToken } from "../auth/authMiddleware"
import { actualizarUsuario, crearUsuario, eliminarUsuarioPorId, getAllUsuarios, getUsuarioPorId } from "../controllers/usuarioController"

const usuarioRouter = express.Router()

usuarioRouter.get('/', getAllUsuarios)
usuarioRouter.get('/:id', getUsuarioPorId)
usuarioRouter.post('/', crearUsuario, verifyToken)
usuarioRouter.put('/', actualizarUsuario, verifyToken)
usuarioRouter.delete('/:id',eliminarUsuarioPorId, verifyToken)

export default usuarioRouter