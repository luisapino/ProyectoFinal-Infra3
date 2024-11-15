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
    if (!product) throw new Error("Product not found");

    if (!cart) {
        const user = await userRepo.findOneBy({ id: userId });
        if (!user || !product) return;
        cart = cartRepo.create({ user, productList: [product] });
    } else {
        if(cart.productList.find((p) => p.id === productId)) throw new Error("Product already in cart");
        if (product.bought) throw new Error("Product already bought");
        cart.productList.push(product);
    }
    await cartRepo.save(cart);
};

export const purchaseCart = async (userId: number) => {
    const cartRepo = AppDataSource.getRepository(Cart);
    const productRepo = AppDataSource.getRepository(Product);
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error("User not found");
    const cart = await cartRepo.findOne({ where: { user: { id: user.id } }, relations: ["productList"] });
    if (cart) {
        cart.productList.forEach((product) => {
            product.bought = true;
            product.buyerUser = user
        });
        await productRepo.save(cart.productList);
        await cartRepo.remove(cart);
    }
};

export const getCart = async (userId: number) => {
    const cartRepo = AppDataSource.getRepository(Cart);
    const cart = await cartRepo.findOne({ where: { user: { id: userId } }, relations: ["productList"] });
    return cart;
};