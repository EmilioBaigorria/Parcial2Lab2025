import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient

export const getAllUsuarios = async (req: Request, res: Response) => { //--not tested
    try {
        const response = await prisma.usuario.findMany()
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todos los usuarios: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de todos los usuarios" })
    }
}
export const getUsuarioPorId = async (req: Request, res: Response) => { //--not tested
    try {
        const { id } = req.params
        const usuarioId = parseInt(id, 10)
        const response = await prisma.usuario.findUnique({
            where: { id: usuarioId }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de un usuario: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de un usuario" })
    }
}
export const crearUsuario = async (req: Request, res: Response) => { //--not tested
    try {
        const { nombre, apellido, email, password, rol, direcciones, pedidos } = req.body
        const response = await prisma.usuario.create({
            data: {
                nombre: nombre,
                apellido: apellido,
                email: email,
                password: password,
                rol: rol,
                direcciones: {
                    connect: direcciones.map((id: number) => ({ id }))
                },
                pedidos: {
                    connect: pedidos.map((id: number) => ({ id }))
                }
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de un usuario: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la creacion de un usuario" })
    }
}
export const actualizarUsuario = async (req: Request, res: Response) => { //--not tested
    try {
        const { id, nombre, apellido, email, password, rol, direcciones, pedidos } = req.body
        const response = await prisma.usuario.update({
            where: { id: id },
            data: {
                nombre: nombre,
                apellido: apellido,
                email: email,
                password: password,
                rol: rol,
                direcciones: {
                    connect: direcciones.map((id: number) => ({ id }))
                },
                pedidos: {
                    connect: pedidos.map((id: number) => ({ id }))
                }
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la actualizacion de un usuario: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la actualizacion de un usuario" })
    }
}
export const eliminarUsuarioPorId = async (req: Request, res: Response) => { //--not tested
    try {
        const { id } = req.params
        const usuarioId = parseInt(id, 10)
        const response = await prisma.usuario.delete({
            where: { id: usuarioId },
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de un usuario: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la eliminacion de un usuario" })
    }
}