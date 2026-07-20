const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/api\/?$/, "");

/**
 * Resolve a media path (testimonial thumbnail, image, video, etc.) to a full URL.
 *
 * Accepts:
 *   - a plain string path  ("uploads/..." or "https://...")
 *   - an object with .url  ({ url: "uploads/...", alt: {...} })
 *   - null / undefined / empty → returns null
 *
 * All stored paths should be relative WITHOUT a leading slash.
 */
export default function mediaUrl(entry) {
  if (!entry) return null;
  const raw = typeof entry === "string" ? entry : entry?.url;
  if (!raw || typeof raw !== "string") return null;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  const clean = raw.startsWith("/") ? raw.slice(1) : raw;
  return `${API_BASE}/${clean}`;
}
