import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient

export const getAllTalle = async (req: Request, res: Response) => {
    try {
        const response = await prisma.talle.findMany()
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todos los talles: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de todos los talles" })
    }
}
export const getTallePorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const talleId = parseInt(id, 10)
        const response = await prisma.talle.findUnique({
            where: { id: talleId }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de un talle: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de un talle" })
    }
}
export const crearTalle = async (req: Request, res: Response) => {
    try {
        const { talle, productos } = req.body
        const response = await prisma.talle.create({
            data: {
                talle: talle,
                productos: {
                    connect: productos.map((id: number) => ({ id }))
                }
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de un talle: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la creacion de un talle" })
    }
}
export const actualizarTalle = async (req: Request, res: Response) => {
    try {
        const { id, talle, productos } = req.body
        const response = await prisma.talle.update({
            where: { id: id },
            data: {
                talle: talle,
                productos: {
                    connect: productos.map((id: number) => ({ id }))
                }
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la actualizacion de un direccion: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la actualizacion de un direccion" })
    }
}
export const eliminarTallePorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const talleId = parseInt(id, 10)
        const response = await prisma.talle.delete({
            where: { id: talleId },
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de un talle: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la eliminacion de un talle" })
    }
}