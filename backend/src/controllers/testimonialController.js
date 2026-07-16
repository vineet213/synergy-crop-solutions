import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Testimonial from "../models/Testimonial.js";
import { AppError } from "../middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseBodyFields(body) {
  const data = { ...body };
  if (data.isFeatured !== undefined) {
    data.isFeatured = data.isFeatured === "true" || data.isFeatured === true;
  }
  if (data.rating !== undefined && data.rating !== "") {
    data.rating = Number(data.rating);
  } else {
    delete data.rating;
  }
  if (data.displayOrder !== undefined && data.displayOrder !== "") {
    data.displayOrder = Number(data.displayOrder);
  } else {
    delete data.displayOrder;
  }
  if (data.videoType !== undefined && data.videoType !== "") {
    data.videoType = data.videoType;
  } else {
    delete data.videoType;
  }
  if (data.video !== undefined && data.video !== "") {
    // keep string video (youtube URL or old path)
  } else if (!data.video || data.video === "") {
    delete data.video;
  }
  if (data.thumbnail !== undefined && data.thumbnail !== "") {
    // keep string thumbnail (old path)
  } else {
    delete data.thumbnail;
  }
  if (data.image !== undefined && data.image !== "") {
    // keep string image (old path)
  } else {
    delete data.image;
  }
  return data;
}

function resolveUploadedPath(file) {
  if (!file) return null;
  const sub = path.basename(path.dirname(file.path));
  return `uploads/testimonials/${sub}/${file.filename}`;
}

function deleteFile(relativePath) {
  if (!relativePath) return;
  const abs = path.resolve(__dirname, "../..", relativePath);
  try {
    if (fs.existsSync(abs)) fs.unlinkSync(abs);
  } catch { /* ignore cleanup errors */ }
}

export async function listPublicTestimonials(req, res, next) {
  try {
    const { featured, limit, sort } = req.query;
    const filter = { status: "active" };
    if (featured === "true") filter.isFeatured = true;

    let query = Testimonial.find(filter);

    if (sort) {
      const sortObj = {};
      sort.split(",").forEach((field) => {
        const desc = field.startsWith("-");
        const name = desc ? field.slice(1) : field;
        sortObj[name] = desc ? -1 : 1;
      });
      query = query.sort(sortObj);
    } else {
      query = query.sort({ displayOrder: 1, createdAt: -1 });
    }

    if (limit) query = query.limit(Number(limit));

    const testimonials = await query.lean();
    res.json({ success: true, data: testimonials });
  } catch (error) {
    next(error);
  }
}

export async function getPublicTestimonial(req, res, next) {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findOne({ _id: id, status: "active" }).lean();
    if (!testimonial) return next(new AppError("Testimonial not found", 404));
    res.json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
}

export async function adminListTestimonials(req, res, next) {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    next(error);
  }
}

export async function adminGetTestimonial(req, res, next) {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) return next(new AppError("Testimonial not found", 404));
    res.json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
}

export async function adminCreateTestimonial(req, res, next) {
  try {
    const data = parseBodyFields(req.body);
    const files = req.files || {};

    if (files.video && files.video[0]) {
      data.video = resolveUploadedPath(files.video[0]);
      data.videoType = "mp4";
    }
    if (files.thumbnail && files.thumbnail[0]) {
      data.thumbnail = resolveUploadedPath(files.thumbnail[0]);
    }
    if (files.image && files.image[0]) {
      data.image = resolveUploadedPath(files.image[0]);
    }

    const testimonial = await Testimonial.create(data);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
}

export async function adminUpdateTestimonial(req, res, next) {
  try {
    const { id } = req.params;
    const existing = await Testimonial.findById(id);
    if (!existing) return next(new AppError("Testimonial not found", 404));

    const data = parseBodyFields(req.body);
    const files = req.files || {};

    if (files.video && files.video[0]) {
      if (existing.video && !existing.video.startsWith("http")) {
        deleteFile(existing.video);
      }
      data.video = resolveUploadedPath(files.video[0]);
      data.videoType = "mp4";
    } else if (data.video === undefined) {
      data.video = existing.video;
    }

    if (files.thumbnail && files.thumbnail[0]) {
      if (existing.thumbnail && !existing.thumbnail.startsWith("http")) {
        deleteFile(existing.thumbnail);
      }
      data.thumbnail = resolveUploadedPath(files.thumbnail[0]);
    } else if (data.thumbnail === undefined) {
      data.thumbnail = existing.thumbnail;
    }

    if (files.image && files.image[0]) {
      if (existing.image && !existing.image.startsWith("http")) {
        deleteFile(existing.image);
      }
      data.image = resolveUploadedPath(files.image[0]);
    } else if (data.image === undefined) {
      data.image = existing.image;
    }

    const testimonial = await Testimonial.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    res.json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
}

export async function adminDeleteTestimonial(req, res, next) {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) return next(new AppError("Testimonial not found", 404));

    if (testimonial.video && !testimonial.video.startsWith("http")) {
      deleteFile(testimonial.video);
    }
    if (testimonial.thumbnail && !testimonial.thumbnail.startsWith("http")) {
      deleteFile(testimonial.thumbnail);
    }
    if (testimonial.image && !testimonial.image.startsWith("http")) {
      deleteFile(testimonial.image);
    }

    res.json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
}

export default {
  listPublicTestimonials,
  getPublicTestimonial,
  adminListTestimonials,
  adminGetTestimonial,
  adminCreateTestimonial,
  adminUpdateTestimonial,
  adminDeleteTestimonial,
};
