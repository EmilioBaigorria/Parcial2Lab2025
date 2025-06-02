import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient

export const getAllDescuentos = async (req: Request, res: Response) => {
    try {
        const response = await prisma.descuento.findMany({
            include: {
                productos: true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todos los descuentos: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de todos los descuentos" })
    }
}
export const getDescuentoPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const descId = parseInt(id, 10)
        const response = await prisma.descuento.findUnique({
            where: { id: descId },
            include: {
                productos: true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de uno de los descuentos: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de uno de los descuentos" })
    }
}
export const crearDescuento = async (req: Request, res: Response) => {
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
export const actualizarDescuento = async (req: Request, res: Response) => {
    try {
        const { id, fechaInicio, fechaCierre, descuento, productos } = req.body;

        if (!id) {
            return res.status(400).json({ message: "El ID es requerido" });
        }

        const data: any = {
            ...(fechaInicio && { fechaInicio }),
            ...(fechaCierre && { fechaCierre }),
            ...(descuento && { descuento }),
            ...(productos && {
                productos: {
                    connect: productos.map((id: number) => ({ id }))
                }
            })
        };

        const response = await prisma.descuento.update({
            where: { id: Number(id) },
            data,
            include: {
                productos: true
            }
        });

        res.status(200).json(response);
    } catch (error) {
        console.error("Ocurrió un error durante la actualización de un descuento:", error);
        res.status(500).json({
            message: "Ocurrió un error durante la actualización de un descuento",
            error
        });
    }
};

export const eliminarDescuento = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const descId = parseInt(id, 10)
        const response = await prisma.descuento.update({
            where: { id: descId },
            data: { estadoM: "INACTIVO" }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de un descuento: ", error)
        res.status(500).json({ message: "Ocurrio un error eliminacion la creacion de un descuento" })
    }
}