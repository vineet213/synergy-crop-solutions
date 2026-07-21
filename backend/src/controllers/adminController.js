import Admin from "../models/Admin.js";
import { AppError } from "../middleware/errorHandler.js";

function sanitizeAdmin(admin) {
  const { password, __v, ...safe } = admin.toObject();
  return safe;
}

export async function listAdmins(_req, res, next) {
  try {
    const admins = await Admin.find().sort({ createdAt: -1 });
    res.json({ success: true, data: admins.map(sanitizeAdmin) });
  } catch (error) {
    next(error);
  }
}

export async function getAdmin(req, res, next) {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return next(new AppError("Admin not found", 404));
    }
    res.json({ success: true, data: sanitizeAdmin(admin) });
  } catch (error) {
    next(error);
  }
}

export async function createAdmin(req, res, next) {
  try {
    const { name, email, password, role } = req.body;

    if (!password || password.length < 8) {
      return next(new AppError("Password must be at least 8 characters", 400));
    }

    const existing = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return next(new AppError("An admin with this email already exists", 409));
    }

    const admin = new Admin({
      name,
      email: email.toLowerCase().trim(),
      password,
      role: role || "admin",
      createdBy: req.user._id,
    });
    await admin.save();

    res.status(201).json({ success: true, data: sanitizeAdmin(admin) });
  } catch (error) {
    next(error);
  }
}

export async function updateAdmin(req, res, next) {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return next(new AppError("Admin not found", 404));
    }

    const { name, email, role } = req.body;

    if (email && email.toLowerCase().trim() !== admin.email) {
      const existing = await Admin.findOne({ email: email.toLowerCase().trim() });
      if (existing) {
        return next(new AppError("An admin with this email already exists", 409));
      }
      admin.email = email.toLowerCase().trim();
    }

    if (name !== undefined) admin.name = name;
    if (role !== undefined) {
      if (req.user._id.toString() === admin._id.toString() && role !== "superadmin") {
        return next(new AppError("You cannot remove your own superadmin role", 400));
      }
      admin.role = role;
    }

    await admin.save();
    res.json({ success: true, data: sanitizeAdmin(admin) });
  } catch (error) {
    next(error);
  }
}

export async function deleteAdmin(req, res, next) {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return next(new AppError("Admin not found", 404));
    }

    if (req.user._id.toString() === admin._id.toString()) {
      return next(new AppError("You cannot delete your own account", 400));
    }

    await Admin.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
}

export async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.user._id).select("+password");
    if (!(await admin.comparePassword(currentPassword))) {
      return next(new AppError("Current password is incorrect", 400));
    }

    if (!newPassword || newPassword.length < 8) {
      return next(new AppError("New password must be at least 8 characters", 400));
    }

    admin.password = newPassword;
    await admin.save();

    res.json({ success: true, data: null, message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
}
