import express from "express";
import { adminStats } from "../controllers/statsController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.get("/admin/stats", authenticate, adminStats);

export default router;
