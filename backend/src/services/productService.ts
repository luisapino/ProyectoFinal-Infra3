import { AppDataSource } from "../config/database";
import { Product } from "../entities/Product";

export const initializeProducts = async (products: Partial<Product>[]) => {
    const productRepo = AppDataSource.getRepository(Product);
    await productRepo.save(products);
};

export const getAvailableProducts = async () => {
    const productRepo = AppDataSource.getRepository(Product);
    return await productRepo.findBy({ bought: false });
};
