import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOADS_ROOT = path.resolve(__dirname, "../../uploads/testimonials");

const DIRS = {
  videos: path.join(UPLOADS_ROOT, "videos"),
  images: path.join(UPLOADS_ROOT, "images"),
  thumbnails: path.join(UPLOADS_ROOT, "thumbnails"),
};

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

Object.values(DIRS).forEach(ensureDirSync);

function uniqueName(originalname) {
  const ext = path.extname(originalname).toLowerCase();
  const base = crypto.randomBytes(16).toString("hex");
  return `${base}${ext}`;
}

function fileFilter(allowedTypes) {
  return (_req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const label = allowedTypes.some((t) => t.startsWith("video/")) ? "video" : "image";
      cb(
        new Error(
          `Invalid ${label} format: ${file.mimetype}. Allowed: ${allowedTypes.join(", ")}`
        ),
        false
      );
    }
  };
}

const VIDEO_TYPES = ["video/mp4", "video/quicktime", "video/webm"];
const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const videoStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, DIRS.videos),
  filename: (_req, file, cb) => cb(null, uniqueName(file.originalname)),
});

const imageStorage = multer.diskStorage({
  destination: (_req, file, cb) => {
    const isThumb = file.fieldname === "thumbnail";
    cb(null, isThumb ? DIRS.thumbnails : DIRS.images);
  },
  filename: (_req, file, cb) => cb(null, uniqueName(file.originalname)),
});

export const uploadVideo = multer({
  storage: videoStorage,
  fileFilter: fileFilter(VIDEO_TYPES),
  limits: { fileSize: 100 * 1024 * 1024 },
});

export const uploadImages = multer({
  storage: imageStorage,
  fileFilter: fileFilter(IMAGE_TYPES),
  limits: { fileSize: 10 * 1024 * 1024 },
});

export function testimonialUpload(req, res, next) {
  const upload = multer({
    storage: multer.diskStorage({
      destination: (_req, file, cb) => {
        if (file.fieldname === "video") return cb(null, DIRS.videos);
        if (file.fieldname === "thumbnail") return cb(null, DIRS.thumbnails);
        if (file.fieldname === "image") return cb(null, DIRS.images);
        cb(null, UPLOADS_ROOT);
      },
      filename: (_req, file, cb) => cb(null, uniqueName(file.originalname)),
    }),
    fileFilter: (req2, file, cb) => {
      if (file.fieldname === "video") {
        if (VIDEO_TYPES.includes(file.mimetype)) return cb(null, true);
        return cb(
          new Error(`Invalid video format: ${file.mimetype}. Allowed: ${VIDEO_TYPES.join(", ")}`),
          false
        );
      }
      if (["thumbnail", "image"].includes(file.fieldname)) {
        if (IMAGE_TYPES.includes(file.mimetype)) return cb(null, true);
        return cb(
          new Error(`Invalid image format: ${file.mimetype}. Allowed: ${IMAGE_TYPES.join(", ")}`),
          false
        );
      }
      cb(null, false);
    },
    limits: { fileSize: 200 * 1024 * 1024 },
  });

  const mw = upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]);

  mw(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File too large. Maximum video size is 100 MB; image size is 10 MB.",
        });
      }
      return res.status(400).json({ success: false, message: err.message });
    }
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
}

export function resolveUploadPath(file) {
  if (!file) return null;
  return `uploads/testimonials/${path.basename(path.dirname(file.path))}/${file.filename}`;
}

export function deleteUploadFile(relativePath) {
  if (!relativePath) return;
  const abs = path.resolve(__dirname, "../..", relativePath);
  try {
    if (fs.existsSync(abs)) fs.unlinkSync(abs);
  } catch { /* ignore */ }
}

export { DIRS, UPLOADS_ROOT };

// ── Product uploads ────────────────────────────────────────────────────────

const PRODUCT_ROOT = path.resolve(__dirname, "../../uploads/products");

const PRODUCT_DIRS = {
  images: path.join(PRODUCT_ROOT, "images"),
  brochure: path.join(PRODUCT_ROOT, "brochure"),
};

Object.values(PRODUCT_DIRS).forEach(ensureDirSync);

const BROCHURE_TYPES = ["application/pdf"];
const PRODUCT_IMAGE_TYPES = IMAGE_TYPES;

export function productUpload(req, res, next) {
  const upload = multer({
    storage: multer.diskStorage({
      destination: (_req, file, cb) => {
        if (file.fieldname === "brochure") return cb(null, PRODUCT_DIRS.brochure);
        cb(null, PRODUCT_DIRS.images);
      },
      filename: (_req, file, cb) => cb(null, uniqueName(file.originalname)),
    }),
    fileFilter: (req2, file, cb) => {
      if (file.fieldname === "brochure") {
        if (BROCHURE_TYPES.includes(file.mimetype)) return cb(null, true);
        return cb(
          new Error(`Invalid brochure format: ${file.mimetype}. Allowed: ${BROCHURE_TYPES.join(", ")}`),
          false
        );
      }
      if (file.fieldname === "images") {
        if (PRODUCT_IMAGE_TYPES.includes(file.mimetype)) return cb(null, true);
        return cb(
          new Error(`Invalid image format: ${file.mimetype}. Allowed: ${PRODUCT_IMAGE_TYPES.join(", ")}`),
          false
        );
      }
      cb(null, false);
    },
    limits: { fileSize: 20 * 1024 * 1024 },
  });

  const mw = upload.fields([
    { name: "images", maxCount: 10 },
    { name: "brochure", maxCount: 1 },
  ]);

  mw(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File too large. Maximum size is 20 MB.",
        });
      }
      return res.status(400).json({ success: false, message: err.message });
    }
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
}

export function resolveProductPath(file) {
  if (!file) return null;
  const dir = file.fieldname === "brochure" ? "brochure" : "images";
  return `uploads/products/${dir}/${file.filename}`;
}

export function deleteProductFile(relativePath) {
  if (!relativePath) return;
  const abs = path.resolve(__dirname, "../..", relativePath);
  try {
    if (fs.existsSync(abs)) fs.unlinkSync(abs);
  } catch { /* ignore */ }
}

// ── Settings uploads (logo, favicon, certificate images) ─────────────────────

const SETTINGS_ROOT = path.resolve(__dirname, "../../uploads/settings");

if (!fs.existsSync(SETTINGS_ROOT)) {
  fs.mkdirSync(SETTINGS_ROOT, { recursive: true });
}

const SETTINGS_IMAGE_TYPES = IMAGE_TYPES;

export function settingsUpload(req, res, next) {
  const upload = multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => cb(null, SETTINGS_ROOT),
      filename: (_req, file, cb) => cb(null, uniqueName(file.originalname)),
    }),
    fileFilter: (_req2, file, cb) => {
      if (SETTINGS_IMAGE_TYPES.includes(file.mimetype)) return cb(null, true);
      return cb(
        new Error(`Invalid image format: ${file.mimetype}. Allowed: ${SETTINGS_IMAGE_TYPES.join(", ")}`),
        false
      );
    },
    limits: { fileSize: 5 * 1024 * 1024 },
  });

  upload.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File too large. Maximum size is 5 MB.",
        });
      }
      return res.status(400).json({ success: false, message: err.message });
    }
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
}

export function deleteSettingsFile(relativePath) {
  if (!relativePath) return;
  const abs = path.resolve(__dirname, "../..", relativePath);
  try {
    if (fs.existsSync(abs)) fs.unlinkSync(abs);
  } catch { /* ignore */ }
}
