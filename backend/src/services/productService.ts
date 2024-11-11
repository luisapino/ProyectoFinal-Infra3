import { User } from "../entities/User";
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


export const getMyBoughtProducts = async (userId: number) => {
    const productRepo = AppDataSource.getRepository(Product);
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({where: { id: userId }});

    if(!user) throw new Error("User not found");

    const boughtProducts = await productRepo.find({
        where: { buyerUser: { id: userId } },
        relations: ["buyerUser"]
    });
    if(!boughtProducts) throw new Error("No products found");
    return boughtProducts;
};
