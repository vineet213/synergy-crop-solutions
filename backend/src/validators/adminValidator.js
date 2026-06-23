import { required, isEmail } from "./common.js";

export const loginSchema = {
  email: [required, isEmail],
  password: [required],
};
