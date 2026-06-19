import Certification from "../models/Certification.js";
import { AppError } from "../middleware/errorHandler.js";

export async function listPublicCertifications(req, res, next) {
  try {
    const certifications = await Certification.find({ status: "active" })
      .sort({ isFeatured: -1, createdAt: -1 })
      .lean();
    res.json({ success: true, data: certifications });
  } catch (error) {
    next(error);
  }
}

export async function getPublicCertification(req, res, next) {
  try {
    const { id } = req.params;
    const certification = await Certification.findOne({ _id: id, status: "active" }).lean();
    if (!certification) return next(new AppError("Certification not found", 404));
    res.json({ success: true, data: certification });
  } catch (error) {
    next(error);
  }
}

export async function adminListCertifications(req, res, next) {
  try {
    const certifications = await Certification.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: certifications });
  } catch (error) {
    next(error);
  }
}

export async function adminGetCertification(req, res, next) {
  try {
    const { id } = req.params;
    const certification = await Certification.findById(id);
    if (!certification) return next(new AppError("Certification not found", 404));
    res.json({ success: true, data: certification });
  } catch (error) {
    next(error);
  }
}

export async function adminCreateCertification(req, res, next) {
  try {
    const payload = req.body;
    const certification = await Certification.create(payload);
    res.status(201).json({ success: true, data: certification });
  } catch (error) {
    next(error);
  }
}

export async function adminUpdateCertification(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const certification = await Certification.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!certification) return next(new AppError("Certification not found", 404));
    res.json({ success: true, data: certification });
  } catch (error) {
    next(error);
  }
}

export async function adminDeleteCertification(req, res, next) {
  try {
    const { id } = req.params;
    const certification = await Certification.findByIdAndDelete(id);
    if (!certification) return next(new AppError("Certification not found", 404));
    res.json({ success: true, data: certification });
  } catch (error) {
    next(error);
  }
}

export default {
  listPublicCertifications,
  getPublicCertification,
  adminListCertifications,
  adminGetCertification,
  adminCreateCertification,
  adminUpdateCertification,
  adminDeleteCertification,
};
