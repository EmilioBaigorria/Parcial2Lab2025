import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient

export const getAllDireccion = async (req: Request, res: Response) => { //--not tested
    try {
        const response = await prisma.direccion.findMany()
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todas las direcciones: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de todas las direcciones" })
    }
}
export const getDireccionPorId = async (req: Request, res: Response) => { //--not tested
    try {
        const { id } = req.params
        const direcId = parseInt(id, 10)
        const response = await prisma.direccion.findUnique({
            where: { id: direcId }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de una de las direcciones: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de una de las direcciones" })
    }
}
export const crearDireccion = async (req: Request, res: Response) => { //--not tested
    try {
        const { calle, codpost, usuarios } = req.body
        const response = await prisma.direccion.create({
            data: {
                calle: calle,
                codpost: codpost,
                usuarios: {
                    connect:usuarios.map.map((id: number) => ({ id }))
                }
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de una direccion: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la creacion de un direccion" })
    }
}
export const actualizarDireccion = async (req: Request, res: Response) => { //--not tested
    try {
        const { id,calle, codpost, usuarios } = req.body
        const response = await prisma.direccion.update({
            where: { id: id },
            data: {
                calle: calle,
                codpost: codpost,
                usuarios: {
                    connect:usuarios.map.map((id: number) => ({ id }))
                }
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la actualizacion de un direccion: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la actualizacion de un direccion" })
    }
}
export const eliminarDireccionPorId = async (req: Request, res: Response) => { //--not tested
    try {
        const { id } = req.params
        const DirecId = parseInt(id, 10)
        const response = await prisma.direccion.delete({
            where: { id: DirecId },
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de un direccion: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la eliminacion de un direccion" })
    }
}