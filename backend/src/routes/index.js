import express from "express";
import authRoutes from "./authRoutes.js";
import productRoutes from "./productRoutes.js";
import distributorRoutes from "./distributorRoutes.js";
import leadRoutes from "./leadRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use(productRoutes);
router.use(distributorRoutes);
router.use(leadRoutes);

export default router;
