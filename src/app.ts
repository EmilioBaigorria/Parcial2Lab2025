import dotenv from "dotenv"
import express from "express"
import authRouter from "./auth/authService"
import categoriaRouter from "./routes/categoriaRouter"
import descuentoRouter from "./routes/descuentoRoute"
import detalleOrdenRouter from "./routes/detalleOrdenRouter"
import direccionRouter from "./routes/direccionRouter"
import ordenCompraRouter from "./routes/ordenCompraRouter"
import pedidoItemRouter from "./routes/pedidoItemRouter"
import pedidoRouter from "./routes/pedidoRouter"
import productoRouter from "./routes/productoRouter"
import talleRouter from "./routes/talleRouter"
import usuarioRouter from "./routes/usuarioRouter"
dotenv.config()

const expApp = express()

expApp.use(express.json())
//Rutas
expApp.use('/categorias', categoriaRouter)

expApp.use('/descuento', descuentoRouter)

expApp.use('/detalleOrden', detalleOrdenRouter)

expApp.use('/direcciones', direccionRouter)

expApp.use('/ordenCompra',ordenCompraRouter)

expApp.use('/pedido', pedidoRouter)

expApp.use('/pedidoItem', pedidoItemRouter)

expApp.use('/producto', productoRouter)

expApp.use('/talle',talleRouter)

expApp.use('/usuario',usuarioRouter)

//Auth
expApp.use('/auth',authRouter)



export default expApp