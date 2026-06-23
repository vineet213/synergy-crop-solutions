import { required, isEmail, isPhone, maxLength } from "./common.js";

export const createLeadSchema = {
  name: [required],
  email: [required, isEmail],
  phone: [isPhone],
  message: [maxLength(1000)],
};
