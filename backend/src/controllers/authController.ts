import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullName, email, document, password } = req.body;
        const user = await registerUser(fullName, email, document, password);
        res.status(201).json({ message: "User registered successfully", user });
        return;
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
        return;
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const token = await loginUser(email, password);
        if (!token) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        res.json({ message: "Login successful", token });
        return;
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
        return;
    }
};
