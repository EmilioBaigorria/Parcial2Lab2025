import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient

export const getAllDescuentos = async (req: Request, res: Response) => { //--not tested
    try {
        const response = await prisma.descuento.findMany()
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todos los descuentos: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de todos los descuentos" })
    }
}
export const getDescuentoPorId = async (req: Request, res: Response) => { //--not tested
    try {
        const { id } = req.params
        const descId = parseInt(id, 10)
        const response = await prisma.descuento.findUnique({
            where: { id: descId }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de uno de los descuentos: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de uno de los descuentos" })
    }
}
export const crearDescuento = async (req: Request, res: Response) => { //--not tested
    try {
        const { fechaInicio, fechaCierre, descuento, productos } = req.body
        const response = await prisma.descuento.create({
            data: {
                fechaInicio: fechaInicio,
                fechaCierre: fechaCierre,
                descuento: descuento,
                productos: {
                    connect: productos.map((id: number) => ({ id }))
                }
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de un descuento: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la creacion de un descuento" })
    }
}
export const actualizarDescuento = async (req: Request, res: Response) => { //--not tested
    try {
        const { id,fechaInicio, fechaCierre, descuento, productos } = req.body
        const response = await prisma.descuento.update({
            where: { id: id },
            data: {
                fechaInicio: fechaInicio,
                fechaCierre: fechaCierre,
                descuento: descuento,
                productos: {
                    connect: productos.map((id: number) => ({ id }))
                }
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la actualizacion de un descuento: ", error)
        res.status(500).json({ message: "Ocurrio un error actualizacion la creacion de un descuento" })
    }
}
export const eliminarDescuento = async (req: Request, res: Response) => { //--not tested
    try {
        const { id } = req.params
        const descId = parseInt(id, 10)
        const response = await prisma.descuento.delete({
            where: { id: descId },
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de un descuento: ", error)
        res.status(500).json({ message: "Ocurrio un error eliminacion la creacion de un descuento" })
    }
}