import express from "express";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import { AppDataSource } from "./config/database";
import cors from "cors";
import healthRoute from "./routes/healthRoute";

const app = express();
app.use(express.json());
app.use(cors());


app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/health", healthRoute);

console.log(process.env.DB_PASSWORD);

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");
        app.listen(3000, () => console.log("Server running on port 3000"));
    })
    .catch((error) => console.log(error));
    app.use(cors());
