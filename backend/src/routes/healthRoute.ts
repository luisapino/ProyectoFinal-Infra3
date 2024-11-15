import express from "express";
import { checkHealth } from "../controllers/healthController";

const router = express.Router();

router.get("/", checkHealth);

export default router;