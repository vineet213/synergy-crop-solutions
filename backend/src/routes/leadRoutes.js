import express from "express";
import * as leadController from "../controllers/leadController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post("/public/leads", leadController.createPublicLead);

router.get("/admin/leads", authenticate, leadController.adminListLeads);
router.get("/admin/leads/:id", authenticate, leadController.adminGetLead);
router.patch("/admin/leads/:id", authenticate, leadController.adminUpdateLead);
router.delete("/admin/leads/:id", authenticate, leadController.adminDeleteLead);

export default router;
