import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRETO = process.env.CLAVE_JWT || "TeamDinamita";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(403).json({ msg: "Token requerido" });
        return;
    }

    try {
        if (!SECRETO) {
            throw new Error("La clave JWT no está definida en las variables de entorno.");
        }
        const decoded = jwt.verify(token, SECRETO);
        // if(req.body.user){
        //     req.body.user = decoded;
        // }
        next();
    } catch (err) {
        console.log("Ocurrio un error durante la aturorizacion: ",err)
        res.status(401).json({ msg: "Token inválido" });
    }
};