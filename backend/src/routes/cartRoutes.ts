import express from "express";
import { addProductToCart, getCartItems, purchaseCart } from "../controllers/cartController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/add", authenticate, addProductToCart);
router.post("/purchase", authenticate, purchaseCart);
router.get("/items", authenticate, getCartItems);

export default router;