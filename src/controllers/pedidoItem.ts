import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient

export const getAllPedidoItem = async (req: Request, res: Response) => { //--not tested
    try {
        const response = await prisma.pedidoItem.findMany()
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todos los pedidoItem: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de todos los pedidoItem" })
    }
}
export const getPedidoItemPorId = async (req: Request, res: Response) => { //--not tested
    try {
        const { id } = req.params
        const pediItemId = parseInt(id, 10)
        const response = await prisma.pedidoItem.findUnique({
            where: { id: pediItemId }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de un pedidoItem: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de un pedidoItem" })
    }
}
export const crearPedidoItem = async (req: Request, res: Response) => {
    try {
        const { cantidad, productoId, pedidoId } = req.body;

        const data = {
            cantidad,
            producto: { connect: { id: productoId } },
            ...(pedidoId && { pedido: { connect: { id: pedidoId } } })
        };

        const response = await prisma.pedidoItem.create({ data });
        res.status(201).json(response);

    } catch (error) {
        res.status(500).json({ 
            message: "Error al crear pedidoItem",
            error: error
        });
    }
};
export const actualizarPedidoItem = async (req: Request, res: Response) => { //--not tested
    try {
        const { id, cantidad, productoId, pedidoId } = req.body
        const response = await prisma.pedidoItem.update({
            where: { id: id },
            data: {
                cantidad: cantidad,
                productoId: productoId,
                pedidoId: pedidoId
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la actualizacion de un pedidoItem: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la actualizacion de un pedidoItem" })
    }
}
export const eliminarPedidoItemPorId = async (req: Request, res: Response) => { //--not tested
    try {
        const { id } = req.params
        const pediItemId = parseInt(id, 10)
        const response = await prisma.pedidoItem.delete({
            where: { id: pediItemId },
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de un pedidoItem: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la eliminacion de un pedidoItem" })
    }
}