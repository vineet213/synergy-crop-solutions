import express from "express";
import authRoutes from "./authRoutes.js";
import productRoutes from "./productRoutes.js";
import distributorRoutes from "./distributorRoutes.js";
import leadRoutes from "./leadRoutes.js";
import statsRoutes from "./statsRoutes.js";
import testimonialRoutes from "./testimonialRoutes.js";
import certificationRoutes from "./certificationRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use(productRoutes);
router.use(distributorRoutes);
router.use(leadRoutes);
router.use(statsRoutes);
router.use(testimonialRoutes);
router.use(certificationRoutes);

export default router;
