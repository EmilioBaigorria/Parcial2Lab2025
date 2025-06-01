import express from "express"
import { verifyToken } from "../auth/authMiddleware"
import { actualizarDescuento, crearDescuento, eliminarDescuento, getAllDescuentos, getDescuentoPorId } from "../controllers/descuentoController"

const descuentoRouter = express.Router()

descuentoRouter.get('/', getAllDescuentos)
descuentoRouter.get('/:id', getDescuentoPorId)
descuentoRouter.post('/', verifyToken, crearDescuento)
descuentoRouter.put('/', verifyToken, actualizarDescuento)
descuentoRouter.delete('/:id', verifyToken, eliminarDescuento)

export default descuentoRouter