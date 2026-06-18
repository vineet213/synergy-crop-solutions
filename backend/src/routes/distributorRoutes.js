import express from "express";
import * as distributorController from "../controllers/distributorController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.get("/public/distributors", distributorController.listPublicDistributors);
router.get("/public/distributors/:id", distributorController.getPublicDistributor);

router.get("/admin/distributors", authenticate, distributorController.adminListDistributors);
router.get("/admin/distributors/:id", authenticate, distributorController.adminGetDistributor);
router.post("/admin/distributors", authenticate, distributorController.adminCreateDistributor);
router.patch("/admin/distributors/:id", authenticate, distributorController.adminUpdateDistributor);
router.delete("/admin/distributors/:id", authenticate, distributorController.adminDeleteDistributor);

export default router;
