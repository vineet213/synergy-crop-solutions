import Disease from "../models/Disease.js";
import { AppError } from "../middleware/errorHandler.js";

export async function listPublicDiseases(req, res, next) {
  try {
    const diseases = await Disease.find({ status: "active" })
      .sort({ createdAt: -1 })
      .lean();
    res.json({ success: true, data: diseases });
  } catch (error) {
    next(error);
  }
}

export async function getPublicDisease(req, res, next) {
  try {
    const { id } = req.params;
    const disease = await Disease.findOne({ _id: id, status: "active" })
      .populate("products")
      .lean();
    if (!disease) return next(new AppError("Disease not found", 404));
    res.json({ success: true, data: disease });
  } catch (error) {
    next(error);
  }
}

export async function adminListDiseases(req, res, next) {
  try {
    const diseases = await Disease.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: diseases });
  } catch (error) {
    next(error);
  }
}

export async function adminGetDisease(req, res, next) {
  try {
    const { id } = req.params;
    const disease = await Disease.findById(id).populate("products");
    if (!disease) return next(new AppError("Disease not found", 404));
    res.json({ success: true, data: disease });
  } catch (error) {
    next(error);
  }
}

export async function adminCreateDisease(req, res, next) {
  try {
    const { _id, __v, createdAt, updatedAt, ...payload } = req.body;
    if (!payload.slug && payload.name) {
      payload.slug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }
    const disease = await Disease.create(payload);
    res.status(201).json({ success: true, data: disease });
  } catch (error) {
    next(error);
  }
}

export async function adminUpdateDisease(req, res, next) {
  try {
    const { id } = req.params;
    const { _id, __v, createdAt, updatedAt, ...updates } = req.body;
    const disease = await Disease.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!disease) return next(new AppError("Disease not found", 404));
    res.json({ success: true, data: disease });
  } catch (error) {
    next(error);
  }
}

export async function adminDeleteDisease(req, res, next) {
  try {
    const { id } = req.params;
    const disease = await Disease.findByIdAndDelete(id);
    if (!disease) return next(new AppError("Disease not found", 404));
    res.json({ success: true, data: disease });
  } catch (error) {
    next(error);
  }
}

export default {
  listPublicDiseases,
  getPublicDisease,
  adminListDiseases,
  adminGetDisease,
  adminCreateDisease,
  adminUpdateDisease,
  adminDeleteDisease,
};
