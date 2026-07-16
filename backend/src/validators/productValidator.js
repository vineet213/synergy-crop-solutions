import { required, isIn, isNumeric, matches } from "./common.js";

const VALID_CATEGORIES = [
  "Bio Fertilizer",
  "Bio Pesticide",
  "Consortium",
  "Liquid Nutrition",
  "Organic Inputs",
  "biofertilizers",
  "biopesticides",
  "consortia",
  "liquid-nutrition",
  "organic-inputs",
];

export const createProductSchema = {
  name: [required],
  category: [required, isIn(VALID_CATEGORIES)],
  slug: [matches(/^[a-z0-9]+(-[a-z0-9]+)*$/, "slug must be lowercase alphanumeric with hyphens")],
  price: [isNumeric],
};

export const updateProductSchema = {
  category: [isIn(VALID_CATEGORIES)],
  slug: [matches(/^[a-z0-9]+(-[a-z0-9]+)*$/, "slug must be lowercase alphanumeric with hyphens")],
  price: [isNumeric],
};
