import { AppDataSource } from "../config/database";
import { Cart } from "../entities/Cart";
import { Product } from "../entities/Product";
import { User } from "../entities/User";

export const addToCart = async (userId: number, productId: number) => {
    const cartRepo = AppDataSource.getRepository(Cart);
    const productRepo = AppDataSource.getRepository(Product);
    const userRepo = AppDataSource.getRepository(User);

    let cart = await cartRepo.findOne({ where: { user: { id: userId } }, relations: ["productList"] });
    const product = await productRepo.findOneBy({ id: productId });

    if (!cart) {
        const user = await userRepo.findOneBy({ id: userId });
        if (!user || !product) return;
        cart = cartRepo.create({ user, productList: [product] });
    } else {
        cart.productList.push(product!);
    }
    await cartRepo.save(cart);
};

export const purchaseCart = async (userId: number) => {
    const cartRepo = AppDataSource.getRepository(Cart);
    const productRepo = AppDataSource.getRepository(Product);

    const cart = await cartRepo.findOne({ where: { user: { id: userId } }, relations: ["productList"] });
    if (cart) {
        cart.productList.forEach((product) => {
            product.bought = true;
            product.buyerUser = cart.user;
        });
        await productRepo.save(cart.productList);
        await cartRepo.remove(cart);
    }
};
