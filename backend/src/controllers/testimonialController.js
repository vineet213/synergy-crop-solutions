import Testimonial from "../models/Testimonial.js";
import { AppError } from "../middleware/errorHandler.js";

export async function listPublicTestimonials(req, res, next) {
  try {
    const testimonials = await Testimonial.find({ status: "active" })
      .sort({ isFeatured: -1, createdAt: -1 })
      .lean();
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
    const payload = req.body;
    const testimonial = await Testimonial.create(payload);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
}

export async function adminUpdateTestimonial(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const testimonial = await Testimonial.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!testimonial) return next(new AppError("Testimonial not found", 404));
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
