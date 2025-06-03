import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient

export const getAllOrdenCompra = async (req: Request, res: Response) => {
    try {
        const response = await prisma.ordenCompra.findMany({
            include: {
                detalles: true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todas las Ordenes de compra: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de todas las Ordenes de compra" })
    }
}
export const getOrdenCompraPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const OCId = parseInt(id, 10)
        const response = await prisma.ordenCompra.findUnique({
            where: { id: OCId },
            include: {
                detalles: true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de una de las ordenes de compra: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de una de las ordenes de compra" })
    }
}
export const crearOrdenCompra = async (req: Request, res: Response) => {
    try {
        const { montototal, mediopago, detalles, pedidoId } = req.body;

        // Estructura base obligatoria
        const data: any = {
            montototal,
            mediopago: mediopago || "MercadoPago", // Valor por defecto
            detalles: {
                connect: detalles.map((id: number) => ({ id }))
            }
        };

        // Conexión opcional con pedido
        if (pedidoId) {
            data.pedido = { connect: { id: pedidoId } };
        }

        const response = await prisma.ordenCompra.create({ data });
        res.status(200).json(response);

    } catch (error) {
        console.error("Error al crear orden de compra:", error);
        res.status(500).json({
            message: "Error al crear orden de compra",
            error: error// Muestra el error real
        });
    }
};
export const actualizarOrdenCompra = async (req: Request, res: Response) => {
    try {
        const { id, montototal, mediopago, detalles, pedidoId } = req.body;

        if (!id) {
            res.status(400).json({ message: "El ID es requerido" });
            return 
        }

        const data = {
            ...(montototal && { montototal }),
            ...(mediopago && { mediopago }),
            ...(detalles && {
                detalles: {
                    connect: detalles.map((id: number) => ({ id }))
                }
            }),
            ...(pedidoId && { pedidoId })
        };

        const response = await prisma.ordenCompra.update({
            where: { id: Number(id) },
            data,
            include: {
                detalles: true,
                pedido: true
            }
        });

        res.status(200).json(response);

    } catch (error) {
        console.error("Ocurrió un error durante la actualización de una orden de compra: ", error);
        res.status(500).json({
            message: "Ocurrió un error durante la actualización de una orden de compra",
            error
        });
    }
};

export const eliminarOrdenCompraPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const OCId = parseInt(id, 10)
        const response = await prisma.ordenCompra.update({
            where: { id: OCId },
            data: { estadoM: "INACTIVO" }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de una orden de compra: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la eliminacion de una orden de compra" })
    }
}