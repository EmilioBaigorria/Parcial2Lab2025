import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient

export const getAllDetalleOrden = async (req: Request, res: Response) => { //--not tested
    try {
        const response = await prisma.detalleOrden.findMany()
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todos los detalleOrden: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de todos los detalleOrden" })
    }
}
export const getDetalleOrdenPorId = async (req: Request, res: Response) => { //--not tested
    try {
        const { id } = req.params
        const doId = parseInt(id, 10)
        const response = await prisma.detalleOrden.findUnique({
            where: { id: doId }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de uno de los detalleOrden: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de uno de los detalleOrden" })
    }
}
export const crearDetalleOrden = async (req: Request, res: Response) => { //--not tested
    try {
        const { cantidad, precioUnitario, productoId, ordenCompraId } = req.body
        const response = await prisma.detalleOrden.create({
            data: {
                cantidad: cantidad,
                precioUnitario: precioUnitario,
                productoId: productoId,
                ordenCompraId: ordenCompraId
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de un detalleOrden: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la creacion de un detalleOrden" })
    }
}
export const actualizarDetalleOrden = async (req: Request, res: Response) => { //--not tested
    try {
        const { id, cantidad, precioUnitario, productoId, ordenCompraId } = req.body
        const response = await prisma.detalleOrden.update({
            where: { id: id },
            data: {
                cantidad: cantidad,
                precioUnitario: precioUnitario,
                productoId: productoId,
                ordenCompraId: ordenCompraId
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la actualizacion de un detalleOrden: ", error)
        res.status(500).json({ message: "Ocurrio un error actualizacion la creacion de un detalleOrden" })
    }
}
export const eliminarDetalleOrdenPorId = async (req: Request, res: Response) => { //--not tested
    try {
        const { id } = req.params
        const DOId = parseInt(id, 10)
        const response = await prisma.descuento.delete({
            where: { id: DOId },
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de un descuento: ", error)
        res.status(500).json({ message: "Ocurrio un error eliminacion la creacion de un descuento" })
    }
}