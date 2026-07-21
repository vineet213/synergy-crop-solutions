import Distributor from "../models/Distributor.js";
import { AppError } from "../middleware/errorHandler.js";

export async function listPublicDistributors(req, res, next) {
  try {
    const { state, search } = req.query;
    const filter = { status: "active" };
    if (state) filter["address.state"] = state;
    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { name: { $regex: escaped, $options: "i" } },
        { company: { $regex: escaped, $options: "i" } },
        { "address.city": { $regex: escaped, $options: "i" } },
        { "address.state": { $regex: escaped, $options: "i" } },
      ];
    }

    const distributors = await Distributor.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: distributors });
  } catch (error) {
    next(error);
  }
}

export async function getPublicDistributor(req, res, next) {
  try {
    const { id } = req.params;
    const distributor = await Distributor.findOne({ _id: id, status: "active" }).lean();
    if (!distributor) return next(new AppError("Distributor not found", 404));
    res.json({ success: true, data: distributor });
  } catch (error) {
    next(error);
  }
}

export async function adminListDistributors(req, res, next) {
  try {
    const distributors = await Distributor.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: distributors });
  } catch (error) {
    next(error);
  }
}

export async function adminGetDistributor(req, res, next) {
  try {
    const { id } = req.params;
    const distributor = await Distributor.findById(id);
    if (!distributor) return next(new AppError("Distributor not found", 404));
    res.json({ success: true, data: distributor });
  } catch (error) {
    next(error);
  }
}

export async function adminCreateDistributor(req, res, next) {
  try {
    const { _id, __v, createdAt, updatedAt, ...payload } = req.body;
    const distributor = await Distributor.create(payload);
    res.status(201).json({ success: true, data: distributor });
  } catch (error) {
    next(error);
  }
}

export async function adminUpdateDistributor(req, res, next) {
  try {
    const { id } = req.params;
    const { _id, __v, createdAt, updatedAt, ...updates } = req.body;
    const distributor = await Distributor.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!distributor) return next(new AppError("Distributor not found", 404));
    res.json({ success: true, data: distributor });
  } catch (error) {
    next(error);
  }
}

export async function adminDeleteDistributor(req, res, next) {
  try {
    const { id } = req.params;
    const distributor = await Distributor.findByIdAndDelete(id);
    if (!distributor) return next(new AppError("Distributor not found", 404));
    res.json({ success: true, data: distributor });
  } catch (error) {
    next(error);
  }
}

export default {
  listPublicDistributors,
  getPublicDistributor,
  adminListDistributors,
  adminGetDistributor,
  adminCreateDistributor,
  adminUpdateDistributor,
  adminDeleteDistributor,
};
