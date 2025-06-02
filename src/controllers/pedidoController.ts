import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient

export const getAllPedidos = async (req: Request, res: Response) => {
    try {
        const response = await prisma.pedido.findMany({
            include: {
                items: {
                    select: {
                        id: true
                    }
                },
                ordenCompra:{
                    select:{
                        id:true
                    }
                }
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todos los pedidos: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de todos los pedidos" })
    }
}
export const getPedidoPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const pediId = parseInt(id, 10)
        const response = await prisma.pedido.findUnique({
            where: { id: pediId },
            include: {
                items: {
                    select: {
                        id: true
                    }
                },
                ordenCompra:{
                    select:{
                        id:true
                    }
                }
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de un pedio: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de un pedio" })
    }
}
export const crearPedido = async (req: Request, res: Response) => {
    try {
        const { estado, fechacreacion, items, usuarioId, ordenCompra } = req.body;

        const data = {
            estado,
            fechacreacion: new Date(fechacreacion),
            items: {
                connect: items.map((id: number) => ({ id }))
            },
            usuario: {
                connect: { id: usuarioId }
            },
            ...(ordenCompra && { ordenCompra: { connect: { id: ordenCompra } } })
        };

        const response = await prisma.pedido.create({
            data,
            include: {
                items: true,
                usuario: true,
                ordenCompra: true
            }
        });

        res.status(201).json(response);

    } catch (error) {
        console.error(error);

        if (error === 'P2025') {
            res.status(404).json({
                message: "Uno de los IDs proporcionados no existe",
                details: error
            });
        } else {
            res.status(500).json({
                message: "Error al crear pedido",
                error: error
            });
        }
    }
};
export const actualizarPedido = async (req: Request, res: Response) => {
    try {
        const { id, estado, fechacreacion, items, usuarioId, ordenCompra } = req.body;

        const data = {
            ...(estado && { estado }),
            ...(fechacreacion && { fechacreacion: new Date(fechacreacion) }),
            ...(items && { items: { connect: items.map((id: number) => ({ id })) } }),
            ...(usuarioId && { usuario: { connect: { id: usuarioId } } }),
            ...(ordenCompra !== undefined ? {
                ordenCompra: ordenCompra ? { connect: { id: ordenCompra } } : { disconnect: true }
            } : {})
        };

        const response = await prisma.pedido.update({
            where: { id: Number(id) },
            data,
            include: {
                items: true,
                usuario: true,
                ordenCompra: true
            }
        });

        res.status(200).json(response);

    } catch (error) {
        console.error(error);

        if (error === 'P2025') {
            res.status(404).json({
                message: "ID no encontrado",
                details: error
            });
        } else {
            res.status(500).json({
                message: "Error al actualizar pedido",
                error: error
            });
        }
    }
};
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