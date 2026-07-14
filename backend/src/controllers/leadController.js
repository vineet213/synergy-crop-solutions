import fs from "fs";
import path from "path";
import Lead from "../models/Lead.js";
import { AppError } from "../middleware/errorHandler.js";
import ExcelJS from "exceljs";
import logger from "../utils/logger.js";

export async function createPublicLead(req, res, next) {
  try {
    const { assignedDistributor, assignedAt, ...payload } = req.body;
    const lead = await Lead.create(payload);
    await appendLeadToExcel(lead);
    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
}

const POPULATE_OPTS = [{ path: "assignedDistributor", select: "name company" }];

function buildFilter(query) {
  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.product) filter.product = query.product;
  if (query.state) filter.state = query.state;
  if (query.assignedDistributor) filter.assignedDistributor = query.assignedDistributor;
  if (query.dateFrom || query.dateTo) {
    filter.createdAt = {};
    if (query.dateFrom) filter.createdAt.$gte = new Date(query.dateFrom);
    if (query.dateTo) {
      const to = new Date(query.dateTo);
      to.setHours(23, 59, 59, 999);
      filter.createdAt.$lte = to;
    }
  }
  if (query.search) {
    const regex = new RegExp(query.search, "i");
    filter.$or = [
      { name: regex },
      { email: regex },
      { phone: regex },
      { company: regex },
      { district: regex },
      { village: regex },
      { crop: regex },
      { product: regex },
      { notes: regex },
    ];
  }
  return filter;
}

export async function adminListLeads(req, res, next) {
  try {
    const filter = buildFilter(req.query);
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

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN");
}

function formatTime(date) {
  if (!date) return "";
  return new Date(date).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

const AUTO_LOG_COLUMNS = [
  { header: "Lead ID", key: "leadId", width: 28 },
  { header: "Date", key: "date", width: 14 },
  { header: "Time", key: "time", width: 14 },
  { header: "Name", key: "name", width: 20 },
  { header: "Phone", key: "phone", width: 16 },
  { header: "Alternate Phone", key: "alternatePhone", width: 18 },
  { header: "Email", key: "email", width: 28 },
  { header: "Company / Farm", key: "company", width: 22 },
  { header: "State", key: "state", width: 16 },
  { header: "District", key: "district", width: 16 },
  { header: "Village", key: "village", width: 16 },
  { header: "Crop", key: "crop", width: 16 },
  { header: "Product", key: "product", width: 18 },
  { header: "Message", key: "message", width: 30 },
  { header: "Source Page", key: "source", width: 16 },
  { header: "Status", key: "status", width: 14 },
  { header: "Notes", key: "notes", width: 28 },
  { header: "Assigned Distributor", key: "assignedDistributor", width: 24 },
  { header: "Assigned Date", key: "assignedDate", width: 14 },
  { header: "Created At", key: "createdDate", width: 14 },
];

const EXCEL_EXPORTS_DIR = path.join(process.cwd(), "exports");
const EXCEL_LEADS_PATH = path.join(EXCEL_EXPORTS_DIR, "leads.xlsx");

function mapLeadForAutoLog(lead) {
  let distributorName = "";
  if (lead.assignedDistributor) {
    if (typeof lead.assignedDistributor === "object" && lead.assignedDistributor.name) {
      distributorName = `${lead.assignedDistributor.name} (${lead.assignedDistributor.company || ""})`;
    } else {
      distributorName = lead.assignedDistributor.toString();
    }
  }

  return {
    leadId: lead._id.toString(),
    date: formatDate(lead.createdAt),
    time: formatTime(lead.createdAt),
    name: lead.name || "",
    phone: lead.phone || "",
    alternatePhone: lead.alternatePhone || "",
    email: lead.email || "",
    company: lead.company || "",
    state: lead.state || "",
    district: lead.district || "",
    village: lead.village || "",
    crop: lead.crop || "",
    product: lead.product || "",
    message: lead.message || "",
    source: lead.source || "",
    status: lead.status || "",
    notes: lead.notes || "",
    assignedDistributor: distributorName,
    assignedDate: formatDate(lead.assignedAt),
    createdDate: formatDate(lead.createdAt),
  };
}

async function appendLeadToExcel(lead) {
  try {
    if (!fs.existsSync(EXCEL_EXPORTS_DIR)) {
      fs.mkdirSync(EXCEL_EXPORTS_DIR, { recursive: true });
    }

    const workbook = new ExcelJS.Workbook();

    if (fs.existsSync(EXCEL_LEADS_PATH)) {
      await workbook.xlsx.readFile(EXCEL_LEADS_PATH);
    } else {
      workbook.creator = "Agri Platform";
      workbook.created = new Date();
      const sheet = workbook.addWorksheet("Leads", {
        views: [{ state: "frozen", ySplit: 1 }],
      });
      sheet.columns = AUTO_LOG_COLUMNS;
      const headerRow = sheet.getRow(1);
      headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
      headerRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF2E7D32" },
      };
      headerRow.alignment = { vertical: "middle", horizontal: "center" };
      headerRow.height = 24;
    }

    const sheet = workbook.getWorksheet("Leads");
    sheet.addRow(mapLeadForAutoLog(lead));
    await workbook.xlsx.writeFile(EXCEL_LEADS_PATH);
  } catch (err) {
    logger.error("[Excel Auto-Log] Failed to append lead to Excel:", err.message);
  }
}

const EXPORT_COLUMNS = [
  { header: "Lead ID", key: "leadId", width: 28 },
  { header: "Date", key: "date", width: 14 },
  { header: "Time", key: "time", width: 14 },
  { header: "Name", key: "name", width: 20 },
  { header: "Phone", key: "phone", width: 16 },
  { header: "Alternate Phone", key: "alternatePhone", width: 18 },
  { header: "Email", key: "email", width: 28 },
  { header: "Company/Farm", key: "company", width: 22 },
  { header: "State", key: "state", width: 16 },
  { header: "District", key: "district", width: 16 },
  { header: "Village", key: "village", width: 16 },
  { header: "Crop", key: "crop", width: 16 },
  { header: "Product", key: "product", width: 18 },
  { header: "Message", key: "message", width: 30 },
  { header: "Source Page", key: "source", width: 16 },
  { header: "Status", key: "status", width: 14 },
  { header: "Notes", key: "notes", width: 28 },
  { header: "Assigned Distributor", key: "assignedDistributor", width: 24 },
  { header: "Assigned Date", key: "assignedDate", width: 14 },
  { header: "Updated Date", key: "updatedDate", width: 14 },
];

function mapLeadToRow(lead) {
  return {
    leadId: lead._id.toString(),
    date: formatDate(lead.createdAt),
    time: formatTime(lead.createdAt),
    name: lead.name || "",
    phone: lead.phone || "",
    alternatePhone: lead.alternatePhone || "",
    email: lead.email || "",
    company: lead.company || "",
    state: lead.state || "",
    district: lead.district || "",
    village: lead.village || "",
    crop: lead.crop || "",
    product: lead.product || "",
    message: lead.message || "",
    source: lead.source || "",
    status: lead.status || "",
    notes: lead.notes || "",
    assignedDistributor: lead.assignedDistributor
      ? `${lead.assignedDistributor.name} (${lead.assignedDistributor.company})`
      : "",
    assignedDate: formatDate(lead.assignedAt),
    updatedDate: formatDate(lead.updatedAt),
  };
}

const STATUS_COLORS = {
  new: { fill: "FFE8F4FD", font: "FF1976D2" },
  contacted: { fill: "FFFFF3E0", font: "FFF57C00" },
  qualified: { fill: "FFE8F5E9", font: "FF388E3C" },
  converted: { fill: "FFF3E5F5", font: "FF7B1FA2" },
  closed: { fill: "FFF5F5F5", font: "FF757575" },
};

export async function adminExportLeads(req, res, next) {
  try {
    const filter = buildFilter(req.query);
    const leads = await Lead.find(filter).sort({ createdAt: -1 }).populate(POPULATE_OPTS);
    const format = req.query.format || "excel";

    if (format === "csv") {
      return exportCSV(leads, res);
    }
    return exportExcel(leads, res);
  } catch (error) {
    next(error);
  }
}

function exportCSV(leads, res) {
  const rows = leads.map(mapLeadToRow);
  const headers = EXPORT_COLUMNS.map((c) => c.header);

  const csvLines = [headers.join(",")];
  for (const row of rows) {
    const values = EXPORT_COLUMNS.map((col) => {
      const val = String(row[col.key] ?? "").replace(/"/g, '""');
      return `"${val}"`;
    });
    csvLines.push(values.join(","));
  }

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="leads-export-${Date.now()}.csv"`);
  res.send("\uFEFF" + csvLines.join("\n"));
}

function exportExcel(leads, res) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Agri Platform";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet("Leads", {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  sheet.columns = EXPORT_COLUMNS;

  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF2E7D32" },
  };
  headerRow.alignment = { vertical: "middle", horizontal: "center" };
  headerRow.height = 24;

  const rows = leads.map(mapLeadToRow);
  for (const rowData of rows) {
    const row = sheet.addRow(rowData);
    const status = rowData.status;
    const color = STATUS_COLORS[status];
    if (color) {
      const statusCell = row.getCell("status");
      statusCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: color.fill },
      };
      statusCell.font = { bold: true, color: { argb: color.font } };
    }
  }

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="leads-export-${Date.now()}.xlsx"`
  );

  workbook.xlsx.writeBuffer().then((buffer) => {
    res.send(Buffer.from(buffer));
  });
}

export default {
  createPublicLead,
  adminListLeads,
  adminGetLead,
  adminUpdateLead,
  adminDeleteLead,
  adminExportLeads,
};
