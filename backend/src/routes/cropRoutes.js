import express from "express";
import * as cropController from "../controllers/cropController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.get("/public/crops", cropController.listPublicCrops);
router.get("/public/crops/:id", cropController.getPublicCrop);

router.get("/admin/crops", authenticate, cropController.adminListCrops);
router.get("/admin/crops/:id", authenticate, cropController.adminGetCrop);
router.post("/admin/crops", authenticate, cropController.adminCreateCrop);
router.patch("/admin/crops/:id", authenticate, cropController.adminUpdateCrop);
router.delete("/admin/crops/:id", authenticate, cropController.adminDeleteCrop);

export default router;
