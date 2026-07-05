import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Search, ArrowRight, ChevronRight } from "lucide-react";
import { usePublicProducts } from "../../hooks/useProducts.js";
import useSEO from "../../hooks/useSEO.js";

export default function ProductsPage() {
  useSEO({ title: "Products", description: "Browse our curated catalog of agricultural products including bio fertilizers, bio pesticides, fungicides, and micronutrients for modern farming operations.", canonical: "/products" });
  const { t } = useTranslation("products");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const params = { limit: 100 };
  if (selectedCategory !== "All") params.category = selectedCategory;
  const { products, loading, error, reload } = usePublicProducts(params);

  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    if (selectedCategory === "All" && !loading) {
      const cats = ["All", ...Array.from(new Set((products || []).map((p) => p.category || "Uncategorized")))];
      setCategories(cats);
    }
  }, [selectedCategory, loading, products]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return products;
    return (products || []).filter((p) =>
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.scientificName && p.scientificName.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q))
    );
  }, [searchQuery, products]);

  function imageUrl(raw) {
    if (!raw) return null;
    return raw.startsWith("http") || raw.startsWith("/") ? raw : `/${raw}`;
  }

  return (
    <div>
      {/* ──────── CATALOGUE HEADER ──────── */}
      <section className="prem">
        <div className="prem-container catalogue-head">
          <header className="prem-header">
            <span className="prem-header__label">{t("subtitle")}</span>
            <h1 className="prem-header__title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>{t("title")}</h1>
            <p className="prem-header__text">{t("intro")}</p>
          </header>

          {/* Search + Filter */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
            <div style={{ position: "relative", maxWidth: "480px" }}>
              <Search size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
              <input
                type="search"
                className="input-field"
                placeholder={t("searchPlaceholder")}
                aria-label={t("searchAria")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: "2.75rem" }}
              />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`filter-pill ${cat === selectedCategory ? "active" : ""}`}
                >
                  {cat}
                </button>
              ))}
              {selectedCategory !== "All" && (
                <button type="button" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }} className="filter-pill" style={{ color: "var(--text-muted)" }}>
                  {t("clear")}
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="prem-prod-grid">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="prem-prod" style={{ padding: "1.5rem" }}>
                  <div className="pd-skeleton pd-skel-title" style={{ marginBottom: "1rem" }} />
                  <div className="pd-skeleton pd-skel-line" />
                  <div className="pd-skeleton pd-skel-line short" style={{ marginTop: "0.5rem" }} />
                </div>
              ))}
            </div>
          ) : error ? (
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <h2 style={{ margin: "0 0 0.5rem", color: "var(--text)" }}>{t("errors.load")}</h2>
              <p style={{ margin: "0 0 1.5rem", color: "var(--text-muted)" }}>{error}</p>
              <button type="button" className="button-base button-primary" onClick={reload}>Retry</button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <h2 style={{ margin: "0 0 0.5rem", color: "var(--text)" }}>{t("empty.title")}</h2>
              <p style={{ margin: 0, color: "var(--text-muted)" }}>{t("empty.description")}</p>
            </div>
          ) : (
            <div className="prem-prod-grid">
              {filteredProducts.map((p) => {
                const img = imageUrl(p.images?.[0]);
                return (
                  <Link key={p._id} to={`/products/${p.slug}`} className="prem-prod no-underline">
                    {img && (
                      <div className="prem-prod-img">
                        <img src={img} alt={p.name} />
                      </div>
                    )}
                    <div className="prem-prod-body">
                      <span className="prem-prod-cat">{p.category}</span>
                      <h3 className="prem-prod-name">{p.name}</h3>
                      {p.shortDescription && <p className="prem-prod-desc">{p.shortDescription}</p>}
                    </div>
                    <div className="prem-prod-foot">
                      <p className="prem-prod-price">{p.price ? `₹${p.price}` : t("contactForPrice")}</p>
                      <span className="prem-prod-link">{t("viewDetails")} <ArrowRight size={14} /></span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}