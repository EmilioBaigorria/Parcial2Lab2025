import express from "express"
import { actualizarCategoria, crearCategoria, eliminarCategoriaPorId, getAllCategorias, getCategoriaPorId } from "../controllers/categoriaController"

const categoriaRouter = express.Router()

categoriaRouter.get('/', getAllCategorias)
categoriaRouter.get('/:id', getCategoriaPorId)
categoriaRouter.post('/', crearCategoria)
categoriaRouter.put('/', actualizarCategoria)
categoriaRouter.delete('/:id',eliminarCategoriaPorId)

export default categoriaRouter