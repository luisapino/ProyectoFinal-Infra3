import express from "express";
import { initializeProducts, getAvailableProducts } from "../controllers/productController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/initialize", authenticate, initializeProducts);
router.get("/available", authenticate, getAvailableProducts);

export default router;
