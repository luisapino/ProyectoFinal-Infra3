import { Request, Response } from "express";
import { addToCart, purchaseCart as purchaseCartService } from "../services/cartService";
import { getCart } from "../services/cartService";

export const addProductToCart = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(400).json({ message: "User not authenticated" });
            return;
        }
        if (!req.body.productId) {
            res.status(400).json({ message: "Product id is required" });
            return;
        }
        const userId = req.user.id;
        const { productId } = req.body;
        await addToCart(userId, productId);
        res.json({ message: "Product added to cart" });
        return;
    } catch (error) {
        res.status(500).json({ message: "Error adding product to cart", error });
        return;
    }
};

export const purchaseCart = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(400).json({ message: "User not authenticated" });
            return;
        }
        const userId = req.user.id;
        await purchaseCartService(userId);
        res.json({ message: "Cart purchased successfully" });
        return;
    } catch (error) {
        res.status(500).json({ message: "Error purchasing cart", error });
        return;
    }
};


export const getCartItems = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(400).json({ message: "User not authenticated" });
            return;
        }
        const userId = req.user.id;
        const cartItems = await getCart(userId);
        res.json(cartItems);
        return;
    } catch (error) {
        res.status(500).json({ message: "Error retrieving cart items", error });
        return;
    }
};
