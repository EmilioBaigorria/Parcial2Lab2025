import express from "express"
import { verifyToken } from "../auth/authMiddleware"
import { actualizarCategoria, crearCategoria, eliminarCategoriaPorId, getAllCategorias, getCategoriaPorId } from "../controllers/categoriaController"

const categoriaRouter = express.Router()

categoriaRouter.get('/', getAllCategorias)
categoriaRouter.get('/:id', getCategoriaPorId)
categoriaRouter.post('/', crearCategoria, verifyToken)
categoriaRouter.put('/', actualizarCategoria, verifyToken)
categoriaRouter.delete('/:id',eliminarCategoriaPorId, verifyToken)

export default categoriaRouter