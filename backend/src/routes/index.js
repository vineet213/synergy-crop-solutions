import express from "express";
import authRoutes from "./authRoutes.js";
import adminRoutes from "./adminRoutes.js";
import productRoutes from "./productRoutes.js";
import distributorRoutes from "./distributorRoutes.js";
import leadRoutes from "./leadRoutes.js";
import statsRoutes from "./statsRoutes.js";
import testimonialRoutes from "./testimonialRoutes.js";
import certificationRoutes from "./certificationRoutes.js";
import cropRoutes from "./cropRoutes.js";
import diseaseRoutes from "./diseaseRoutes.js";
import websiteSettingsRoutes from "./websiteSettingsRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use(adminRoutes);
router.use(productRoutes);
router.use(distributorRoutes);
router.use(leadRoutes);
router.use(statsRoutes);
router.use(testimonialRoutes);
router.use(certificationRoutes);
router.use(cropRoutes);
router.use(diseaseRoutes);
router.use(websiteSettingsRoutes);

export default router;
