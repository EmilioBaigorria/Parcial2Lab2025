import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient

export const getAllDireccion = async (req: Request, res: Response) => {
    try {
        const response = await prisma.direccion.findMany({
            include: {
                usuarios: true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todas las direcciones: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de todas las direcciones" })
    }
}
export const getDireccionPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const direcId = parseInt(id, 10)
        const response = await prisma.direccion.findUnique({
            where: { id: direcId },
            include: {
                usuarios: true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de una de las direcciones: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de una de las direcciones" })
    }
}
export const crearDireccion = async (req: Request, res: Response) => {
    try {
        const { calle, codpost, usuarios } = req.body
        const response = await prisma.direccion.create({
            data: {
                calle: calle,
                codpost: codpost,
                usuarios: {
                    connect: usuarios.map((id: number) => ({ id }))
                }
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de una direccion: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la creacion de un direccion" })
    }
}
export const actualizarDireccion = async (req: Request, res: Response) => {
    try {
        const { id, calle, codpost, usuarios } = req.body;

        if (!id) {
            res.status(400).json({ message: "El ID es requerido" });
            return 
        }

        const data = {
            ...(calle && { calle }),
            ...(codpost && { codpost }),
            ...(usuarios && { 
                usuarios: { 
                    connect: usuarios.map((id: number) => ({ id })) 
                }
            })
        };

        const response = await prisma.direccion.update({
            where: { id: Number(id) },
            data
        });

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Error al actualizar dirección",
            error: error 
        });
    }
};
export const eliminarDireccionPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const DirecId = parseInt(id, 10)
        const response = await prisma.direccion.update({
            where: { id: DirecId },
            data: { estadoM: "INACTIVO" }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de un direccion: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la eliminacion de un direccion" })
    }
}