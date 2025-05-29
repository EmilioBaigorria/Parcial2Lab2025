import express from "express"
import { actualizarDescuento, crearDescuento, eliminarDescuento, getAllDescuentos, getDescuentoPorId } from "../controllers/descuentoController"

const descuentoRouter = express.Router()

descuentoRouter.get('/', getAllDescuentos)
descuentoRouter.get('/:id', getDescuentoPorId)
descuentoRouter.post('/', crearDescuento)
descuentoRouter.put('/', actualizarDescuento)
descuentoRouter.delete('/:id',eliminarDescuento)

export default descuentoRouter