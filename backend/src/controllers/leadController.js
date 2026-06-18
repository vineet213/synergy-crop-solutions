import Lead from "../models/Lead.js";
import { AppError } from "../middleware/errorHandler.js";

export async function createPublicLead(req, res, next) {
  try {
    const { assignedDistributor, assignedAt, ...payload } = req.body;
    const lead = await Lead.create(payload);
    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
}

const POPULATE_OPTS = [{ path: "assignedDistributor", select: "name company" }];

export async function adminListLeads(req, res, next) {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const leads = await Lead.find(filter).sort({ createdAt: -1 }).populate(POPULATE_OPTS);
    res.json({ success: true, data: leads });
  } catch (error) {
    next(error);
  }
}

export async function adminGetLead(req, res, next) {
  try {
    const { id } = req.params;
    const lead = await Lead.findById(id).populate(POPULATE_OPTS);
    if (!lead) return next(new AppError("Lead not found", 404));
    res.json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
}

export async function adminUpdateLead(req, res, next) {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    if (updates.assignedDistributor) {
      updates.assignedAt = new Date();
    } else if (updates.assignedDistributor === null) {
      updates.assignedAt = null;
    }
    const lead = await Lead.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate(POPULATE_OPTS);
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
