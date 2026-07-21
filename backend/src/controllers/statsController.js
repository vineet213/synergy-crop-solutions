import Product from "../models/Product.js";
import Distributor from "../models/Distributor.js";
import Lead from "../models/Lead.js";

export async function adminStats(req, res, next) {
  try {
    const [productCount, distributorCount, leadCount, recentLeads] = await Promise.all([
      Product.countDocuments({ $or: [{ status: "published" }, { published: true }] }),
      Distributor.countDocuments({ status: "active" }),
      Lead.countDocuments({}),
      Lead.find({}).sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    res.json({
      success: true,
      data: {
        products: productCount,
        distributors: distributorCount,
        leads: leadCount,
        recentLeads,
      },
    });
  } catch (error) {
    next(error);
  }
}

export default { adminStats };
