import bcrypt from "bcryptjs";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const pass = async () => {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const newUser = await prisma.usuario.create({
        data: { nombre:"TeamDina", apellido:"Peligo", email:"admin123@gmail.com", password: hashedPassword },
    });
    console.log(newUser)
}
