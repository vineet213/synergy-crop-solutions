import { textValue } from "./productHelpers.js";

const CATEGORY_MAP = {
  "biofertilizers": "categories.biofertilizers",
  "biopesticides": "categories.biopesticides",
  "consortia": "categories.consortia",
  "liquid-nutrition": "categories.liquid-nutrition",
  "organic-inputs": "categories.organic-inputs",
  "bio fertilizer": "categories.bio-fertilizer",
  "bio fertilizers": "categories.bio-fertilizers",
  "bio pesticide": "categories.bio-pesticide",
  "bio pesticides": "categories.bio-pesticides",
  "consortium": "categories.consortium",
  "liquid nutrition": "categories.liquid-nutrition",
  "organic inputs": "categories.organic-inputs",
};

export function formatCategory(raw, t) {
  const str = textValue(raw);
  if (!str) return "";
  const key = CATEGORY_MAP[str.toLowerCase()];
  return key ? t(key) : str;
}

export function resolveMethodIcon(method) {
  if (!method) return null;
  const m = method.toLowerCase().replace(/[.\s]+$/g, "").trim();
  const hasSoil = m.includes("soil") || m.includes("broadcast");
  const hasFoliar = m.includes("foliar") || m.includes("spray");
  const hasDrip = m.includes("drip") || m.includes("drench");
  const hasSeed = m.includes("seed");
  if (hasSoil && (hasFoliar || hasDrip)) return "multi";
  if (hasSoil) return "soil";
  if (hasFoliar) return "foliar";
  if (hasSeed) return "seed";
  if (hasDrip) return "drip";
  return null;
}
