import express from "express";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import { AppDataSource } from "./config/database";
import cors from "cors";
import healthRoute from "./routes/healthRoute";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());


app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/health", healthRoute);

dotenv.config();

const PORT = parseInt(process.env.PORT || "3000");
AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.log(error));