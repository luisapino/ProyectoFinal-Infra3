import express from "express";
import { addProductToCart, purchaseCart } from "../controllers/cartController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/add", authenticate, addProductToCart);
router.post("/purchase", authenticate, purchaseCart);

export default router;