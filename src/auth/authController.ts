import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();
const SECRETO = process.env.CLAVE_JWT || "TeamDinamitaPrueba";

export const register = async (req: Request, res: Response): Promise<void> => {
    const { nombre, apellido, email, password } = req.body;

    try {
        const existingUser = await prisma.usuario.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ msg: "Email ya registrado" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.usuario.create({
            data: { nombre, apellido, email, password: hashedPassword },
        });

        res.status(201).json({ msg: "Usuario registrado", user: newUser });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor", error });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await prisma.usuario.findUnique({ where: { email } });
        if (user?.estado == "INACTIVO") {
            res.status(401).json({ msg: "El usuario proporcionado esta inactivo" });
            return;
        }
        if (!user) {
            res.status(401).json({ msg: "El usuario proporcionado no existe" });
            return;
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            res.status(401).json({ msg: "Credenciales invalidas" });
            return;
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, rol: user.rol },
            SECRETO,
            { expiresIn: "12h" }
        );

        res.json({ msg: "Login exitoso", token });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor", error });
    }
};