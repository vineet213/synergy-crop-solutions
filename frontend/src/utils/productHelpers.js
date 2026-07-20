const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/api\/?$/, "");

/**
 * Extract a plain-text value from a field that may be:
 *   - a plain string
 *   - a localized object { en: "...", hi: "...", ... }
 *   - undefined / null
 */
export function textValue(v) {
  if (v === undefined || v === null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "object" && typeof v.en === "string") return v.en;
  return "";
}

/**
 * Resolve a product image entry to a displayable URL string.
 * Handles:
 *   - string URLs  → resolved
 *   - {url, alt, caption} objects → url resolved
 *   - blob URLs   → returned as-is
 *   - null/undefined → null
 */
export function resolveImageUrl(img) {
  if (!img) return null;
  const raw = typeof img === "string" ? img : img?.url;
  if (!raw) return null;
  if (raw.startsWith("blob:")) return raw;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  if (raw.startsWith("/")) return raw;
  return `${API_BASE}/${raw}`;
}

/**
 * Resolve the correct locale value for a localized product field.
 * Fallback order:
 *   1. value[locale] (selected language)
 *   2. value.en (English)
 *   3. value (if it's a plain string — legacy)
 *   4. first available translation
 *   5. empty string
 */
export function resolveLocale(value, locale = "en") {
  if (value === undefined || value === null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    if (value[locale]) return value[locale];
    if (value.en) return value.en;
    const keys = Object.keys(value);
    for (const k of keys) {
      if (typeof value[k] === "string" && value[k]) return value[k];
    }
  }
  return "";
}

/**
 * Resolve a localized array field.
 * Returns an array of plain strings for the given locale.
 */
export function resolveLocaleArray(arr, locale = "en") {
  if (!Array.isArray(arr)) return [];
  return arr
    .map((item) => resolveLocale(item, locale))
    .filter(Boolean);
}

/**
 * Resolve product brochure to a usable shape.
 * Handles:
 *   - string URL (legacy)
 *   - {url, title} object (new)
 *   - null/undefined
 * Returns { url: string|null, title: string }
 */
export function resolveBrochure(brochure) {
  if (!brochure) return { url: null, title: "" };
  if (typeof brochure === "string") return { url: brochure, title: "" };
  if (typeof brochure === "object") {
    return {
      url: brochure.url || null,
      title: textValue(brochure.title) || "",
    };
  }
  return { url: null, title: "" };
}
