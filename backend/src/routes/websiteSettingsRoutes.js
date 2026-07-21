import express from "express";
import * as websiteSettingsController from "../controllers/websiteSettingsController.js";
import { authenticate } from "../middleware/authenticate.js";
import { settingsUpload } from "../config/multer.js";

const router = express.Router();

router.get("/public/settings", websiteSettingsController.getPublicSettings);

router.get("/admin/settings", authenticate, websiteSettingsController.adminGetSettings);
router.put("/admin/settings", authenticate, websiteSettingsController.adminUpdateSettings);

router.post("/admin/settings/logo", authenticate, settingsUpload, websiteSettingsController.adminUploadLogo);
router.post("/admin/settings/favicon", authenticate, settingsUpload, websiteSettingsController.adminUploadFavicon);
router.post("/admin/settings/certificates/:certId/image", authenticate, settingsUpload, websiteSettingsController.adminUploadCertificateImage);
router.delete("/admin/settings/asset/:assetType", authenticate, websiteSettingsController.adminDeleteAsset);

export default router;
