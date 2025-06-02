import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient

export const getAllDetalleOrden = async (req: Request, res: Response) => {
    try {
        const response = await prisma.detalleOrden.findMany({
            include: {
                producto: true,
                ordenCompra: true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todos los detalleOrden: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de todos los detalleOrden" })
    }
}
export const getDetalleOrdenPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const doId = parseInt(id, 10)
        const response = await prisma.detalleOrden.findUnique({
            where: { id: doId },
            include: {
                producto: true,
                ordenCompra: true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de uno de los detalleOrden: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de uno de los detalleOrden" })
    }
}
export const crearDetalleOrden = async (req: Request, res: Response) => {
    try {
        const { cantidad, precioUnitario, productoId, ordenCompraId } = req.body
        const response = await prisma.detalleOrden.create({
            data: {
                cantidad: cantidad,
                precioUnitario: precioUnitario,
                producto: {
                    connect: { id: productoId }
                },
                ordenCompra: {
                    connect: { id: ordenCompraId }
                }
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de un detalleOrden: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la creacion de un detalleOrden" })
    }
}
export const actualizarDetalleOrden = async (req: Request, res: Response) => {
    try {
        const { id, cantidad, precioUnitario, productoId, ordenCompraId } = req.body;

        if (!id) {
            return res.status(400).json({ message: "El ID es requerido" });
        }

        const data: any = {
            ...(cantidad && { cantidad }),
            ...(precioUnitario && { precioUnitario }),
            ...(productoId && {
                producto: {
                    connect: { id: productoId }
                }
            }),
            ...(ordenCompraId && {
                ordenCompra: {
                    connect: { id: ordenCompraId }
                }
            })
        };

        const response = await prisma.detalleOrden.update({
            where: { id: Number(id) },
            data,
            include: {
                producto: true,
                ordenCompra: true
            }
        });

        res.status(200).json(response);
    } catch (error) {
        console.error("Ocurrió un error durante la actualización de un detalle de orden:", error);
        res.status(500).json({
            message: "Ocurrió un error durante la actualización de un detalle de orden",
            error
        });
    }
};

export const eliminarDetalleOrdenPorId = async (req: Request, res: Response) => {
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