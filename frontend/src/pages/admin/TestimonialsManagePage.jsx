import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Search, Play, Eye, Star, ChevronUp, ChevronDown, X } from "lucide-react";
import useConfirm from "../../hooks/useConfirm.jsx";
import testimonialService from "../../services/testimonialService.js";
import mediaUrl from "../../utils/mediaUrl.js";
import { useTranslation } from "react-i18next";

const PAGE_SIZE = 10;

function fmtDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function Stars({ rating }) {
  if (!rating) return <span style={{ color: "var(--text-muted)" }}>—</span>;
  return (
    <span style={{ display: "inline-flex", gap: "1px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          fill={i <= rating ? "var(--brand)" : "none"}
          stroke={i <= rating ? "var(--brand)" : "var(--text-muted)"}
          strokeWidth={2}
        />
      ))}
    </span>
  );
}

export default function TestimonialsManagePage() {
  const { t } = useTranslation("admin");
  const { confirm, ConfirmDialog } = useConfirm();

  const SORT_OPTIONS = [
    { value: "displayOrder", label: t("testimonials.sortDisplayOrder") },
    { value: "createdAt", label: t("testimonials.sortCreatedAt") },
    { value: "rating", label: t("testimonials.sortRating") },
  ];

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("displayOrder");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);

  const [previewItem, setPreviewItem] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await testimonialService.adminListTestimonials();
      setTestimonials(data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    let list = testimonials;
    if (q) {
      list = list.filter((t) => {
        const name = (t.customerName || "").toLowerCase();
        const crop = (t.crop || "").toLowerCase();
        const loc = (t.location || "").toLowerCase();
        return name.includes(q) || crop.includes(q) || loc.includes(q);
      });
    }
    list = [...list].sort((a, b) => {
      let va = a[sortBy];
      let vb = b[sortBy];
      if (sortBy === "createdAt") {
        va = va ? new Date(va).getTime() : 0;
        vb = vb ? new Date(vb).getTime() : 0;
      }
      if (sortBy === "rating") {
        va = va || 0;
        vb = vb || 0;
      }
      if (sortBy === "displayOrder") {
        va = va || 0;
        vb = vb || 0;
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [testimonials, searchQuery, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, sortBy, sortDir]);

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDir(field === "rating" ? "desc" : "asc");
    }
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field) return null;
    return sortDir === "asc"
      ? <ChevronUp size={14} style={{ marginLeft: 2 }} />
      : <ChevronDown size={14} style={{ marginLeft: 2 }} />;
  };

  const handleDelete = async (id) => {
    const confirmed = await confirm(
      t("testimonials.deleteConfirmMessage"),
      t("testimonials.deleteConfirmTitle")
    );
    if (!confirmed) return;
    try {
      await testimonialService.adminDeleteTestimonial(id);
      setTestimonials((p) => p.filter((x) => x._id !== id));
      toast.success(t("testimonials.deleteSuccess"));
      if (previewItem?._id === id) setPreviewItem(null);
    } catch (err) {
      console.error(err);
      toast.error(t("testimonials.deleteFailed"));
    }
  };

  return (
    <main className="page-container">
      <div className="flex items-center justify-between mb-6" style={{ flexWrap: "wrap", gap: "0.75rem" }}>
        <h1 className="page-title">{t("testimonials.title")}</h1>
        <Link to="/admin/testimonials/new" className="button-base button-primary">
          {t("testimonials.createButton")}
        </Link>
      </div>

      {/* Search & Sort Bar */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 260px", maxWidth: 400 }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "0.85rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            className="input-field"
            placeholder={t("testimonials.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: "2.5rem" }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: "0.6rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                display: "flex",
                padding: "2px",
              }}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => toggleSort(opt.value)}
              className={`button-base ${sortBy === opt.value ? "button-primary" : ""}`}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.8rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.15rem",
              }}
            >
              {opt.label}
              <SortIcon field={opt.value} />
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p style={{ marginBottom: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        {filtered.length === 0
          ? t("testimonials.noTestimonialsFound")
          : t("testimonials.showingRange", { from: Math.min((safePage - 1) * PAGE_SIZE + 1, filtered.length), to: Math.min(safePage * PAGE_SIZE, filtered.length), total: filtered.length })}
      </p>

      {loading ? (
        <p>{t("common.loading")}</p>
      ) : error ? (
        <div className="empty-state card-shell">
          <h2>{t("testimonials.failedToLoad")}</h2>
          <p>{error}</p>
          <button onClick={load} className="button-base button-primary">{t("common.retry")}</button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state card-shell">
          <h2>{testimonials.length === 0 ? t("testimonials.noTestimonialsTitle") : t("testimonials.noResults")}</h2>
          <p>
            {testimonials.length === 0
              ? t("testimonials.noTestimonialsDescription")
              : t("testimonials.noResultsDescription")}
          </p>
          {testimonials.length === 0 && (
            <Link to="/admin/testimonials/new" className="button-base button-primary">{t("testimonials.createButton")}</Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {paged.map((item) => (
            <div key={item._id} className="card-shell" style={{ padding: "1rem 1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                {/* Thumbnail */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "var(--radius-sm)",
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "var(--surface-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  {item.thumbnail || item.image ? (
                    <img
                      src={mediaUrl(item.thumbnail || item.image)}
                      alt={item.customerName}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <span style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-muted)" }}>
                      {(item.customerName || "?").charAt(0).toUpperCase()}
                    </span>
                  )}
                  {item.video && (
                    <span
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.45)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Play size={16} fill="#fff" stroke="#fff" />
                    </span>
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: "1 1 200px", minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    <strong style={{ fontSize: "0.95rem" }}>{item.customerName || t("testimonials.unnamed")}</strong>
                    <span className={`badge badge-${item.status === "active" ? "brand" : "soft"}`} style={{ fontSize: "0.7rem", padding: "0.25rem 0.6rem" }}>
                      {item.status}
                    </span>
                    {item.isFeatured && (
                      <span className="badge badge-brand" style={{ fontSize: "0.7rem", padding: "0.25rem 0.6rem" }}>
                        {t("testimonials.badgeFeatured")}
                      </span>
                    )}
                  </div>
                  <p style={{ margin: "0.2rem 0 0", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    {[item.location, item.crop].filter(Boolean).join(" \u00B7 ")}
                    {item.displayOrder > 0 && <span> &middot; {t("testimonials.labelOrderPrefix")}{item.displayOrder}</span>}
                    <span> &middot; {fmtDate(item.createdAt)}</span>
                  </p>
                </div>

                {/* Rating */}
                <div style={{ flexShrink: 0 }}>
                  <Stars rating={item.rating} />
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                  <button
                    onClick={() => setPreviewItem(item)}
                    className="button-base"
                    style={{ padding: "0.5rem 0.85rem", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                    title={t("testimonials.previewTitle")}
                  >
                    <Eye size={14} />
                  </button>
                  <Link
                    to={`/admin/testimonials/${item._id}/edit`}
                    className="button-base"
                    style={{ padding: "0.5rem 0.85rem", fontSize: "0.8rem" }}
                  >
                    {t("common.edit")}
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="button-base button-danger"
                    style={{ padding: "0.5rem 0.85rem", fontSize: "0.8rem" }}
                  >
                    {t("common.delete")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
          <button
            className="button-base"
            style={{ padding: "0.45rem 1rem", fontSize: "0.8rem" }}
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            &larr; {t("testimonials.prevPage")}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((n) => n === 1 || n === totalPages || Math.abs(n - safePage) <= 2)
            .reduce((acc, n, i, arr) => {
              if (i > 0 && n - arr[i - 1] > 1) acc.push("...");
              acc.push(n);
              return acc;
            }, [])
            .map((n, i) =>
              n === "..." ? (
                <span key={`e${i}`} style={{ padding: "0 0.25rem", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                  &hellip;
                </span>
              ) : (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`button-base ${n === safePage ? "button-primary" : ""}`}
                  style={{ padding: "0.45rem 0.75rem", fontSize: "0.8rem", minWidth: "2.25rem" }}
                >
                  {n}
                </button>
              )
            )}
          <button
            className="button-base"
            style={{ padding: "0.45rem 1rem", fontSize: "0.8rem" }}
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            {t("testimonials.nextPage")} &rarr;
          </button>
        </div>
      )}

      {/* Preview Modal */}
      {previewItem && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            onClick={() => setPreviewItem(null)}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }}
          />
          <div
            className="card-shell"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 560,
              maxHeight: "90vh",
              overflow: "auto",
              padding: 0,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.25rem 1.5rem",
                borderBottom: "1px solid var(--border-light)",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>{t("testimonials.previewTitle")}</h2>
              <button
                onClick={() => setPreviewItem(null)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  display: "flex",
                  padding: "4px",
                }}
                aria-label={t("testimonials.closePreview")}
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: "1.5rem" }}>
              {/* Image / Video */}
              {(previewItem.thumbnail || previewItem.image) && (
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "16/9",
                    borderRadius: "var(--radius-sm)",
                    overflow: "hidden",
                    marginBottom: "1.25rem",
                    background: "var(--surface-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <img
                    src={mediaUrl(previewItem.thumbnail || previewItem.image)}
                    alt={previewItem.customerName}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {previewItem.video && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.9)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Play size={24} fill="var(--brand)" stroke="var(--brand)" style={{ marginLeft: 2 }} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Name & meta */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                <h3 style={{ margin: 0, fontSize: "1.05rem" }}>{previewItem.customerName}</h3>
                <span className={`badge badge-${previewItem.status === "active" ? "brand" : "soft"}`} style={{ fontSize: "0.7rem", padding: "0.2rem 0.55rem" }}>
                  {previewItem.status}
                </span>
                {previewItem.isFeatured && (
                  <span className="badge badge-brand" style={{ fontSize: "0.7rem", padding: "0.2rem 0.55rem" }}>{t("testimonials.badgeFeatured")}</span>
                )}
              </div>

              {previewItem.location && (
                <p style={{ margin: "0 0 0.25rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  {previewItem.location}
                </p>
              )}
              {previewItem.crop && (
                <p style={{ margin: "0 0 0.25rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  {t("testimonials.labelCropPrefix")}{previewItem.crop}
                </p>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "0.75rem 0", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                  <Stars rating={previewItem.rating} />
                </span>
                {previewItem.displayOrder > 0 && <span>{t("testimonials.labelOrderPrefix")}{previewItem.displayOrder}</span>}
                <span>{fmtDate(previewItem.createdAt)}</span>
              </div>

              {/* Testimonial text */}
              <div
                style={{
                  marginTop: "1rem",
                  padding: "1rem 1.25rem",
                  background: "var(--surface-muted)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.95rem",
                  lineHeight: 1.65,
                  color: "var(--text)",
                  fontStyle: "italic",
                }}
              >
                &ldquo;{previewItem.testimonial}&rdquo;
              </div>

              {/* Video info */}
              {previewItem.video && (
                <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  {t("testimonials.labelVideo")}<span style={{ wordBreak: "break-all" }}>{previewItem.video}</span>
                  {previewItem.videoType && <span> ({previewItem.videoType})</span>}
                </p>
              )}

              {/* Actions */}
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem", borderTop: "1px solid var(--border-light)", paddingTop: "1rem" }}>
                <Link
                  to={`/admin/testimonials/${previewItem._id}/edit`}
                  className="button-base button-primary"
                  style={{ fontSize: "0.85rem" }}
                >
                  {t("common.edit")}
                </Link>
                <button
                  onClick={() => { handleDelete(previewItem._id); }}
                  className="button-base button-danger"
                  style={{ fontSize: "0.85rem" }}
                >
                  {t("common.delete")}
                </button>
                <button
                  onClick={() => setPreviewItem(null)}
                  className="button-base"
                  style={{ fontSize: "0.85rem" }}
                >
                  {t("common.close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {ConfirmDialog}
    </main>
  );
}
