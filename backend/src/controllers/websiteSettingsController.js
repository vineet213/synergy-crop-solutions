import WebsiteSettings from "../models/WebsiteSettings.js";
import { AppError } from "../middleware/errorHandler.js";
import {
  deleteSettingsFile,
} from "../config/multer.js";

async function getOrCreate() {
  const settings = await WebsiteSettings.findOneAndUpdate(
    {},
    { $setOnInsert: {} },
    { new: true, upsert: true }
  );
  return settings;
}

function validateSettingsInput(body) {
  const errors = [];

  const str = (val, max) => {
    if (val !== undefined && val !== null && val !== "") {
      if (typeof val !== "string") return `${val} must be a string`;
      if (max && val.length > max) return `must be at most ${max} characters`;
    }
    return null;
  };

  const email = (val) => {
    if (val && val !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      return "is not a valid email";
    }
    return null;
  };

  const phone = (val) => {
    if (val && val !== "" && !/^\+?[\d\s\-()]{7,20}$/.test(val)) {
      return "is not a valid phone number";
    }
    return null;
  };

  const url = (val, max) => {
    if (val && val !== "") {
      if (typeof val !== "string") return "must be a string";
      if (max && val.length > max) return `must be at most ${max} characters`;
    }
    return null;
  };

  if (body.company) {
    const c = body.company;
    if (typeof c !== "object" || Array.isArray(c)) {
      errors.push({ field: "company", message: "must be an object" });
    } else {
      const m = str(c.name, 200) || str(c.tagline, 300) || str(c.address, 500) || str(c.city, 100) || str(c.state, 100) || str(c.pinCode, 10);
      if (m) errors.push({ field: "company", message: m });
    }
  }

  if (body.contact) {
    const c = body.contact;
    if (typeof c !== "object" || Array.isArray(c)) {
      errors.push({ field: "contact", message: "must be an object" });
    } else {
      if (c.phoneNumbers !== undefined) {
        if (!Array.isArray(c.phoneNumbers)) {
          errors.push({ field: "contact.phoneNumbers", message: "must be an array" });
        } else {
          for (let i = 0; i < c.phoneNumbers.length; i++) {
            if (c.phoneNumbers[i] && typeof c.phoneNumbers[i] !== "string") {
              errors.push({ field: `contact.phoneNumbers[${i}]`, message: "must be a string" });
              break;
            }
            const pErr = phone(c.phoneNumbers[i]);
            if (pErr) { errors.push({ field: `contact.phoneNumbers[${i}]`, message: pErr }); break; }
          }
        }
      }
      const m = phone(c.whatsappNumber) || str(c.whatsappNumber, 20) || email(c.email) || str(c.officeHours, 200);
      if (m) errors.push({ field: "contact", message: m });
    }
  }

  if (body.location) {
    const l = body.location;
    if (typeof l !== "object" || Array.isArray(l)) {
      errors.push({ field: "location", message: "must be an object" });
    } else {
      const m = url(l.googleMapsEmbedUrl, 1000);
      if (m) errors.push({ field: "location.googleMapsEmbedUrl", message: m });
    }
  }

  if (body.socialMedia) {
    const s = body.socialMedia;
    if (typeof s !== "object" || Array.isArray(s)) {
      errors.push({ field: "socialMedia", message: "must be an object" });
    } else {
      const m = url(s.facebook, 500) || url(s.instagram, 500) || url(s.linkedin, 500) || url(s.youtube, 500) || url(s.twitter, 500);
      if (m) errors.push({ field: "socialMedia", message: m });
    }
  }

  if (body.website) {
    const w = body.website;
    if (typeof w !== "object" || Array.isArray(w)) {
      errors.push({ field: "website", message: "must be an object" });
    } else {
      const m = str(w.footerText, 1000) || str(w.copyrightText, 500);
      if (m) errors.push({ field: "website", message: m });
    }
  }

  if (body.certificates !== undefined) {
    if (!Array.isArray(body.certificates)) {
      errors.push({ field: "certificates", message: "must be an array" });
    } else {
      for (let i = 0; i < body.certificates.length; i++) {
        const cert = body.certificates[i];
        if (typeof cert !== "object" || cert === null || Array.isArray(cert)) {
          errors.push({ field: `certificates[${i}]`, message: "must be an object" });
          break;
        }
        const m = str(cert.title, 200) || str(cert.description, 1000) || str(cert.imageUrl, 500);
        if (m) { errors.push({ field: `certificates[${i}]`, message: m }); break; }
      }
    }
  }

  return errors;
}

export async function getPublicSettings(_req, res, next) {
  try {
    const settings = await getOrCreate();
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
}

export async function adminGetSettings(_req, res, next) {
  try {
    const settings = await getOrCreate();
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
}

export async function adminUpdateSettings(req, res, next) {
  try {
    const errors = validateSettingsInput(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: "Validation failed", errors });
    }

    const settings = await getOrCreate();

    const allowedSections = ["company", "contact", "location", "socialMedia", "website"];
    for (const section of allowedSections) {
      if (req.body[section] && typeof req.body[section] === "object") {
        settings[section] = { ...settings[section].toObject(), ...req.body[section] };
      }
    }

    if (req.body.certificates !== undefined && Array.isArray(req.body.certificates)) {
      const oldCertImages = (settings.certificates || [])
        .filter((c) => c.imageUrl)
        .map((c) => c.imageUrl);
      const newCertImages = req.body.certificates
        .filter((c) => c && c.imageUrl)
        .map((c) => c.imageUrl);

      settings.certificates = req.body.certificates;

      await settings.save();

      for (const imgPath of oldCertImages) {
        if (!newCertImages.includes(imgPath)) {
          deleteSettingsFile(imgPath);
        }
      }

      res.json({ success: true, data: settings });
      return;
    }

    await settings.save();
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
}

export async function adminUploadLogo(req, res, next) {
  try {
    if (!req.file) return next(new AppError("No file uploaded", 400));

    const settings = await getOrCreate();
    const oldPath = settings.assets.logo;

    settings.assets.logo = `uploads/settings/${req.file.filename}`;
    await settings.save();

    if (oldPath) {
      deleteSettingsFile(oldPath);
    }

    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
}

export async function adminUploadFavicon(req, res, next) {
  try {
    if (!req.file) return next(new AppError("No file uploaded", 400));

    const settings = await getOrCreate();
    const oldPath = settings.assets.favicon;

    settings.assets.favicon = `uploads/settings/${req.file.filename}`;
    await settings.save();

    if (oldPath) {
      deleteSettingsFile(oldPath);
    }

    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
}

export async function adminUploadCertificateImage(req, res, next) {
  try {
    if (!req.file) return next(new AppError("No file uploaded", 400));

    const settings = await getOrCreate();
    const certId = req.params.certId;
    const cert = settings.certificates.id(certId);
    if (!cert) return next(new AppError("Certificate not found", 404));

    const oldPath = cert.imageUrl;

    cert.imageUrl = `uploads/settings/${req.file.filename}`;
    await settings.save();

    if (oldPath) {
      deleteSettingsFile(oldPath);
    }

    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
}

export async function adminDeleteAsset(req, res, next) {
  try {
    const { assetType } = req.params;
    const settings = await getOrCreate();

    if (assetType === "logo") {
      if (settings.assets.logo) {
        const oldPath = settings.assets.logo;
        settings.assets.logo = "";
        await settings.save();
        deleteSettingsFile(oldPath);
      }
    } else if (assetType === "favicon") {
      if (settings.assets.favicon) {
        const oldPath = settings.assets.favicon;
        settings.assets.favicon = "";
        await settings.save();
        deleteSettingsFile(oldPath);
      }
    } else {
      return next(new AppError("Invalid asset type", 400));
    }

    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
}

export default {
  getPublicSettings,
  adminGetSettings,
  adminUpdateSettings,
  adminUploadLogo,
  adminUploadFavicon,
  adminUploadCertificateImage,
  adminDeleteAsset,
};
