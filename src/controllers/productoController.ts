import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient

export const getAllProductos = async (req: Request, res: Response) => { //--not tested
    try {
        const response = await prisma.producto.findMany({
            include: {
                categorias: true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todos los productos: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de todos los productos" })
    }
}
export const getProductoPorId = async (req: Request, res: Response) => { //--not tested
    try {
        const { id } = req.params
        const produId = parseInt(id, 10)
        const response = await prisma.producto.findUnique({
            where: { id: produId },
            include: {
                categorias: true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de un producto: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la obtencion de un producto" })
    }
}
export const crearProducto = async (req: Request, res: Response) => { //--not tested
    try {
        const { nombre, descripcion, precio, stock, categorias, color, marca, imagen, descuentoId, pedidoItems, detalleOrden, talles } = req.body
        const response = await prisma.producto.create({
            data: {
                nombre: nombre,
                descripcion: descripcion,
                precio: precio,
                stock: stock,
                categorias: {
                    connect: categorias.map((id: number) => ({ id }))
                },
                color: color,
                marca: marca,
                imagen: imagen,
                descuentoId: descuentoId,
                //Quiza esto este mal, no estoy seguro
                pedidoItems: {
                    connect: pedidoItems.map((id: number) => ({ id }))
                }, detalleOrden: {
                    connect: detalleOrden.map((id: number) => ({ id }))
                }, talles: {
                    connect: talles.map((id: number) => ({ id }))
                },
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de un producto: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la creacion de un producto" })
    }
}
export const actualizarProducto = async (req: Request, res: Response) => {
    try {
        const {
            id,
            nombre,
            descripcion,
            precio,
            stock,
            categorias,
            color,
            marca,
            imagen,
            descuentoId,
            pedidoItems,
            detalleOrden,
            talles
        } = req.body;

        if (!id) {
            return res.status(400).json({ message: "El ID es requerido" });
        }

        const data = {
            ...(nombre && { nombre }),
            ...(descripcion && { descripcion }),
            ...(precio && { precio }),
            ...(stock && { stock }),
            ...(categorias && {
                categorias: {
                    connect: categorias.map((id: number) => ({ id }))
                }
            }),
            ...(color && { color }),
            ...(marca && { marca }),
            ...(imagen && { imagen }),
            ...(descuentoId && { descuentoId }),
            ...(pedidoItems && {
                pedidoItems: {
                    connect: pedidoItems.map((id: number) => ({ id }))
                }
            }),
            ...(detalleOrden && {
                detalleOrden: {
                    connect: detalleOrden.map((id: number) => ({ id }))
                }
            }),
            ...(talles && {
                talles: {
                    connect: talles.map((id: number) => ({ id }))
                }
            })
        };

        const response = await prisma.producto.update({
            where: { id: Number(id) },
            data,
            include: {
                categorias: true,
                pedidoItems: true,
                detalleOrden: true,
                talles: true
            }
        });

        res.status(200).json(response);

    } catch (error) {
        console.error("Ocurrió un error durante la actualización de un producto: ", error);
        res.status(500).json({
            message: "Ocurrió un error durante la actualización de un producto",
            error
        });
    }
};

export const eliminarProductoPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const produId = parseInt(id, 10)
        const response = await prisma.producto.update({
            where: { id: produId },
            data: { estadoM: "INACTIVO" }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de un producto: ", error)
        res.status(500).json({ message: "Ocurrio un error durante la eliminacion de un producto" })
    }
}