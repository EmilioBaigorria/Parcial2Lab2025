import express from "express"
import { actualizarUsuario, crearUsuario, eliminarUsuarioPorId, getAllUsuarios, getUsuarioPorId } from "../controllers/usuarioController"

const usuarioRouter = express.Router()

usuarioRouter.get('/', getAllUsuarios)
usuarioRouter.get('/:id', getUsuarioPorId)
usuarioRouter.post('/', crearUsuario)
usuarioRouter.put('/', actualizarUsuario)
usuarioRouter.delete('/:id',eliminarUsuarioPorId)

export default usuarioRouter