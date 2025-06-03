import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient

export const getAllPedidoItem = async (req: Request, res: Response) => {
    try {
        const response = await prisma.pedidoItem.findMany({
            include: {
                pedido: true,
                producto: true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todos los pedidoItem: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de todos los pedidoItem" })
    }
}
export const getPedidoItemPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const pediItemId = parseInt(id, 10)
        const response = await prisma.pedidoItem.findUnique({
            where: { id: pediItemId },
            include: {
                pedido: true,
                producto: true
            }
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
export const actualizarPedidoItem = async (req: Request, res: Response) => {
    try {
        const { id, cantidad, productoId, pedidoId } = req.body;

        if (!id) {
            res.status(400).json({ message: "El ID es requerido" });
            return 
        }

        const data = {
            ...(cantidad && { cantidad }),
            ...(productoId && { productoId }),
            ...(pedidoId && { pedidoId })
        };

        const response = await prisma.pedidoItem.update({
            where: { id: Number(id) },
            data,
            include: {
                producto: true,
                pedido: true
            }
        });

        res.status(200).json(response);

    } catch (error) {
        console.error("Ocurrió un error durante la actualización de un pedidoItem: ", error);
        res.status(500).json({
            message: "Ocurrió un error durante la actualización de un pedidoItem",
            error
        });
    }
};

export const eliminarPedidoItemPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const pediItemId = parseInt(id, 10)
        const response = await prisma.pedidoItem.update({
            where: { id: pediItemId },
            data: { estadoM: "INACTIVO" }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de un pedidoItem: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la eliminacion de un pedidoItem" })
    }
}