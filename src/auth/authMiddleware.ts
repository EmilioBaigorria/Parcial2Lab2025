import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRETO = process.env.CLAVE_JWT || "TeamDinamitaPrueba";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(403).json({ msg: "Token requerido" });
        return;
    }

    try {
        const decoded = jwt.verify(token, SECRETO);
        req.body.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token inválido" });
    }
};