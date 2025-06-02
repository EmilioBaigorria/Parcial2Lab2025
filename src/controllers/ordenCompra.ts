import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient

export const getAllOrdenCompra = async (req: Request, res: Response) => { //--not tested
    try {
        const response = await prisma.ordenCompra.findMany()
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todas las Ordenes de compra: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de todas las Ordenes de compra" })
    }
}
export const getOrdenCompraPorId = async (req: Request, res: Response) => { //--not tested
    try {
        const { id } = req.params
        const OCId = parseInt(id, 10)
        const response = await prisma.ordenCompra.findUnique({
            where: { id: OCId }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de una de las ordenes de compra: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de una de las ordenes de compra" })
    }
}
export const crearOrdenCompra= async (req: Request, res: Response) => { //--not tested
    try {
        const { montototal, mediopago, detalles,pedidoId } = req.body
        const response = await prisma.ordenCompra.create({
            data: {
                montototal: montototal,
                mediopago: "MercadoPago",
                detalles: {
                    connect: detalles.map((id: number) => ({ id }))
                },
                pedido: {
                    connect: { id: pedidoId }
                }
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de una orden de compra: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la creacion de una orden de compra" })
    }
}
export const actualizarOrdenCompra = async (req: Request, res: Response) => { //--not tested
    try {
        const { id,montototal, mediopago, detalles,pedidoId } = req.body
        const response = await prisma.ordenCompra.update({
            where: { id: id },
            data: {
                montototal: montototal,
                mediopago: "MercadoPago",
                detalles: {
                    connect: detalles.map((id: number) => ({ id }))
                },
                pedidoId:pedidoId
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la actualizacion de una orden de compra: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la actualizacion de una orden de compra" })
    }
}
export const eliminarOrdenCompraPorId = async (req: Request, res: Response) => { //--not tested
    try {
        const { id } = req.params
        const OCId = parseInt(id, 10)
        const response = await prisma.ordenCompra.delete({
            where: { id: OCId },
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de una orden de compra: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la eliminacion de una orden de compra" })
    }
}