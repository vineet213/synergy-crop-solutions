import { required, isEmail, maxLength, isIn } from "./common.js";

export const loginSchema = {
  email: [required, isEmail],
  password: [required],
};

export const createAdminSchema = {
  name: [required, maxLength(100)],
  email: [required, isEmail],
  password: [required, maxLength(128)],
  role: [isIn(["superadmin", "admin"])],
};

export const updateAdminSchema = {
  name: [maxLength(100)],
  email: [isEmail],
  role: [isIn(["superadmin", "admin"])],
};

export const changePasswordSchema = {
  currentPassword: [required],
  newPassword: [required, maxLength(128)],
};
