import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import { Cart } from "../entities/Cart";

export const registerUser = async (fullName: string, email: string, document: string, password: string) => {
    const userRepo = AppDataSource.getRepository(User);
    const cartRepo = AppDataSource.getRepository(Cart);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepo.create({ fullName, email, document, password: hashedPassword });
    cartRepo.create({ user, productList: [] });
    return await userRepo.save(user);
};

export const loginUser = async (email: string, password: string) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) return null;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    return token;
};
