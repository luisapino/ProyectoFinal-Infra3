import { Request, Response } from "express";
import { initializeProducts as initProducts, getAvailableProducts as getProducts } from "../services/productService";

export const initializeProducts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products = [
            {
                name: "PC gamer",
                description: "PC gamer",
                imageUrl: "https://exitocol.vtexassets.com/arquivos/ids/13631368/computador-pc-torre-gamer-power-l38-amd-ryzen-7-5700g-ssd-128-hdd-1tb-ram-16gb-led-22-pulgadas.jpg?v=637934996671430000",
                bought: false,
                buyerUser: null
            },
            {
                name: "Portatil gamer",
                description: "Portatil gamer",
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKcxE1fXXdlxqwN6WR4S00xzVlRCLHjJw_Cw&s",
                bought: false,
                buyerUser: null
            },
            {
                name: "Televisor",
                description: "Televisor",
                imageUrl: "https://www.semana.com/resizer/v2/4GDPNFO3X5HKZC6KCFPXBWKTBQ.jpg?auth=e3c645995c2ebccecef6f9f2b0bd60477f2ea13759850cc09984eebc215c8349&smart=true&quality=75&width=1280&fitfill=false",
                bought: false,
                buyerUser: null
            }
        ];
        
        await initProducts(products);
        res.status(201).json({ message: "Products initialized" });
    } catch (error) {
        res.status(500).json({ message: "Error initializing products", error });
    }
};

export const getAvailableProducts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products", error });
    }
};
