import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Access denied" });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};
