import express from "express"
import { verifyToken } from "../auth/authMiddleware"
import { actualizarUsuario, crearUsuario, eliminarUsuarioPorId, getAllUsuarios, getUsuarioPorId } from "../controllers/usuarioController"

const usuarioRouter = express.Router()

usuarioRouter.get('/', getAllUsuarios)
usuarioRouter.get('/:id', getUsuarioPorId)
usuarioRouter.post('/', verifyToken, crearUsuario)
usuarioRouter.put('/', verifyToken, actualizarUsuario)
usuarioRouter.delete('/:id', verifyToken,eliminarUsuarioPorId)

export default usuarioRouter