import Crop from "../models/Crop.js";
import { AppError } from "../middleware/errorHandler.js";

export async function listPublicCrops(req, res, next) {
  try {
    const crops = await Crop.find({ status: "active" })
      .sort({ createdAt: -1 })
      .lean();
    res.json({ success: true, data: crops });
  } catch (error) {
    next(error);
  }
}

export async function getPublicCrop(req, res, next) {
  try {
    const { id } = req.params;
    const crop = await Crop.findOne({ _id: id, status: "active" })
      .populate("products")
      .lean();
    if (!crop) return next(new AppError("Crop not found", 404));
    res.json({ success: true, data: crop });
  } catch (error) {
    next(error);
  }
}

export async function adminListCrops(req, res, next) {
  try {
    const crops = await Crop.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: crops });
  } catch (error) {
    next(error);
  }
}

export async function adminGetCrop(req, res, next) {
  try {
    const { id } = req.params;
    const crop = await Crop.findById(id).populate("products");
    if (!crop) return next(new AppError("Crop not found", 404));
    res.json({ success: true, data: crop });
  } catch (error) {
    next(error);
  }
}

export async function adminCreateCrop(req, res, next) {
  try {
    const { _id, __v, createdAt, updatedAt, ...payload } = req.body;
    if (!payload.slug && payload.name) {
      payload.slug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }
    const crop = await Crop.create(payload);
    res.status(201).json({ success: true, data: crop });
  } catch (error) {
    next(error);
  }
}

export async function adminUpdateCrop(req, res, next) {
  try {
    const { id } = req.params;
    const { _id, __v, createdAt, updatedAt, ...updates } = req.body;
    const crop = await Crop.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!crop) return next(new AppError("Crop not found", 404));
    res.json({ success: true, data: crop });
  } catch (error) {
    next(error);
  }
}

export async function adminDeleteCrop(req, res, next) {
  try {
    const { id } = req.params;
    const crop = await Crop.findByIdAndDelete(id);
    if (!crop) return next(new AppError("Crop not found", 404));
    res.json({ success: true, data: crop });
  } catch (error) {
    next(error);
  }
}

export default {
  listPublicCrops,
  getPublicCrop,
  adminListCrops,
  adminGetCrop,
  adminCreateCrop,
  adminUpdateCrop,
  adminDeleteCrop,
};
