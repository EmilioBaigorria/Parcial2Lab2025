import express from "express"
import { verifyToken } from "../auth/authMiddleware"
import { actualizarCategoria, crearCategoria, eliminarCategoriaPorId, getAllCategorias, getCategoriaPorId } from "../controllers/categoriaController"

const categoriaRouter = express.Router()

categoriaRouter.get('/', getAllCategorias)
categoriaRouter.get('/:id', getCategoriaPorId)
categoriaRouter.post('/', verifyToken, crearCategoria)
categoriaRouter.put('/', verifyToken, actualizarCategoria)
categoriaRouter.delete('/:id', verifyToken, eliminarCategoriaPorId)

export default categoriaRouter