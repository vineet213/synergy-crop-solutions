import { required, isEmail, isPhone } from "./common.js";

export const createDistributorSchema = {
  name: [required],
  company: [required],
  email: [required, isEmail],
  phone: [required, isPhone],
};

export const updateDistributorSchema = {
  email: [isEmail],
  phone: [isPhone],
};
