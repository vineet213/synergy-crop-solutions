import Lead from "../models/Lead.js";
import { AppError } from "../middleware/errorHandler.js";

export async function createPublicLead(req, res, next) {
  try {
    const payload = req.body;
    const lead = await Lead.create(payload);
    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
}

export async function adminListLeads(req, res, next) {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: leads });
  } catch (error) {
    next(error);
  }
}

export async function adminGetLead(req, res, next) {
  try {
    const { id } = req.params;
    const lead = await Lead.findById(id);
    if (!lead) return next(new AppError("Lead not found", 404));
    res.json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
}

export async function adminUpdateLead(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const lead = await Lead.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!lead) return next(new AppError("Lead not found", 404));
    res.json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
}

export async function adminDeleteLead(req, res, next) {
  try {
    const { id } = req.params;
    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) return next(new AppError("Lead not found", 404));
    res.json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
}

export default {
  createPublicLead,
  adminListLeads,
  adminGetLead,
  adminUpdateLead,
  adminDeleteLead,
};
