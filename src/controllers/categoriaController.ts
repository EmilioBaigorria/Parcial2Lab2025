
import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

export const getAllCategorias = async (req: Request, res: Response) => {
    try {
        const response = await prisma.categoria.findMany()
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todas las categorias: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de todas las categorias" })
    }
}
export const getCategoriaPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const cateid = parseInt(id, 10)
        const response = await prisma.categoria.findUnique({
            where: { id: cateid }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de una de las categorias: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de una de las categorias" })
    }
}
export const crearCategoria = async (req: Request, res: Response) => {
    try {
        const { nombre, productos } = req.body
        const response = await prisma.categoria.create({
            data: {
                nombre: nombre,
                productos: {
                    connect: productos.map((id: number) => ({ id }))
                }
            }
        })
        res.status(201).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de una categoria: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la creacion de una categoria" })
    }
}
export const actualizarCategoria = async (req: Request, res: Response) => {
    try {
        const { id,nombre, productos } = req.body
        const response = await prisma.categoria.update({
            where: { id: id },
            data: {
                nombre: nombre,
                productos: {
                    connect: productos.map((id: number) => ({ id }))
                }
            }
        })
        res.status(201).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la actualizacion de una categoria: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la actualizacion de una categoria" })
    }
}
export const eliminarCategoriaPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const cateid = parseInt(id, 10)
        const response = await prisma.categoria.delete({
            where: { id: cateid }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de una categoria: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la eliminacion de una categoria" })
    }
}

