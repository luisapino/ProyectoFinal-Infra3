import { Request, Response } from "express";

export const checkHealth = async (_req: Request, res: Response): Promise<void> => {
    res.status(200).json({message: "Healthy"});
}