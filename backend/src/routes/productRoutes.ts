import express from "express";
import { initializeProducts, getAvailableProducts, getMyBoughtProducts } from "../controllers/productController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/initialize", authenticate, initializeProducts);
router.get("/available", authenticate, getAvailableProducts);
router.get("/bought", authenticate, getMyBoughtProducts);

export default router;
