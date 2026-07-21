import { required, isEmail, maxLength, isIn, minLength } from "./common.js";

export const loginSchema = {
  email: [required, isEmail],
  password: [required],
};

export const createAdminSchema = {
  name: [required, maxLength(100)],
  email: [required, isEmail],
  password: [required, minLength(8), maxLength(128)],
  role: [isIn(["superadmin", "admin"])],
};

export const updateAdminSchema = {
  name: [maxLength(100)],
  email: [isEmail],
  role: [isIn(["superadmin", "admin"])],
};

export const changePasswordSchema = {
  currentPassword: [required],
  newPassword: [required, minLength(8), maxLength(128)],
};
