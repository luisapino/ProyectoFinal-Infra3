import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Cart } from "../entities/Cart";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"), 
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DATABASE,
  entities: [User, Product, Cart],
  synchronize: true,
});
