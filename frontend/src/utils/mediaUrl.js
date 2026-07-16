const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/api\/?$/, "");

/**
 * Resolves a testimonial (or any) media path to a full URL.
 *
 * Accepts:
 *   - absolute URLs  ("https://..." or "http://...")  → returned as-is
 *   - relative paths ("uploads/testimonials/...")     → prepended with API_BASE
 *   - null / undefined / empty                         → returns null
 *
 * All stored paths should be relative WITHOUT a leading slash.
 * Example: "client-assets/testimonials/Videos/testimonial-1.mp4"
 */
export default function mediaUrl(path) {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${API_BASE}/${clean}`;
}
