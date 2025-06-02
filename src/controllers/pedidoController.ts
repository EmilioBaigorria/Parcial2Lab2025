import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient

export const getAllPedidos = async (req: Request, res: Response) => { //--not tested
    try {
        const response = await prisma.pedido.findMany()
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todos los pedidos: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de todos los pedidos" })
    }
}
export const getPedidoPorId = async (req: Request, res: Response) => { //--not tested
    try {
        const { id } = req.params
        const pediId = parseInt(id, 10)
        const response = await prisma.pedido.findUnique({
            where: { id: pediId }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de un pedio: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de un pedio" })
    }
}
export const crearPedido = async (req: Request, res: Response) => { //--not tested
    try {
        const { estado, fechacreacion, items, usuarioId, ordenCompra } = req.body
        const response = await prisma.pedido.create({
            data: {
                estado: estado,
                fechacreacion: fechacreacion,
                items: {
                    connect: items.map((id: number) => ({ id }))
                },
                usuario: {
                    connect: { id: usuarioId }
                },
                ordenCompra: ordenCompra 
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de un pedido: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la creacion de un pedido" })
    }
}
export const actualizarPedido = async (req: Request, res: Response) => { //--not tested
    try {
        const { id, estado, fechacreacion, items, usuarioId, ordenCompra } = req.body
        const response = await prisma.pedido.update({
            where: { id: id },
            data: {
                estado: estado,
                fechacreacion: fechacreacion,
                items: {
                    connect: items.map.map((id: number) => ({ id }))
                },
                usuarioId: usuarioId,
                ordenCompra: ordenCompra
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la actualizacion de un pedido: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la actualizacion de un pedido" })
    }
}
export const eliminarPedidoPorId = async (req: Request, res: Response) => { //--not tested
    try {
        const { id } = req.params
        const pediId = parseInt(id, 10)
        const response = await prisma.pedido.delete({
            where: { id: pediId },
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de un pedido: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la eliminacion de un pedido" })
    }
}