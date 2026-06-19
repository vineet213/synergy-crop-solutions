import express from "express";
import * as diseaseController from "../controllers/diseaseController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.get("/public/diseases", diseaseController.listPublicDiseases);
router.get("/public/diseases/:id", diseaseController.getPublicDisease);

router.get("/admin/diseases", authenticate, diseaseController.adminListDiseases);
router.get("/admin/diseases/:id", authenticate, diseaseController.adminGetDisease);
router.post("/admin/diseases", authenticate, diseaseController.adminCreateDisease);
router.patch("/admin/diseases/:id", authenticate, diseaseController.adminUpdateDisease);
router.delete("/admin/diseases/:id", authenticate, diseaseController.adminDeleteDisease);

export default router;
