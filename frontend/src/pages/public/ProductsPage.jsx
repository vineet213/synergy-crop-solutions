import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Sprout, MapPin, Droplets, FlaskConical, Zap } from "lucide-react";
import { usePublicProducts } from "../../hooks/useProducts.js";
import useSEO from "../../hooks/useSEO.js";
import { formatCategory, resolveMethodIcon } from "../../utils/formatters.js";

const METHOD_ICONS = {
  soil: <Sprout size={12} />,
  foliar: <Droplets size={12} />,
  seed: <FlaskConical size={12} />,
  drip: <Droplets size={12} />,
  multi: <Zap size={12} />,
};

export default function ProductsPage() {
  const { t } = useTranslation("products");
  const { t: tc } = useTranslation("common");
  useSEO({ title: t("title"), canonical: "/products" });
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
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.targetCrops && p.targetCrops.some((c) => c.toLowerCase().includes(q)))
    );
  }, [searchQuery, products]);

  const count = filteredProducts?.length || 0;

  function imageUrl(raw) {
    if (!raw) return null;
    return raw.startsWith("http") || raw.startsWith("/") ? raw : `/${raw}`;
  }

  const featuredProducts = useMemo(() => {
    return (filteredProducts || []).filter((p) => p.isFeatured).slice(0, 3);
  }, [filteredProducts]);

  const regularProducts = useMemo(() => {
    return (filteredProducts || []).filter((p) => !p.isFeatured);
  }, [filteredProducts]);

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="prem" style={{ paddingBottom: "1rem" }}>
        <div className="prem-container">
          <header className="prem-header">
            <span className="prem-header__label">{t("subtitle")}</span>
            <h1 className="prem-header__title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>{t("title")}</h1>
            <p className="prem-header__text">{t("intro")}</p>
          </header>

          {/* ============ FILTER BAR ============ */}
          <div className="prem-filter-bar">
            <div className="prem-filter-search">
              <Search size={18} />
              <input
                type="search"
                placeholder={t("searchPlaceholder")}
                aria-label={t("searchAria")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="prem-filter-cats">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`prem-filter-pill ${cat === selectedCategory ? "active" : ""}`}
                >
                  {cat === "All" ? tc("all") : formatCategory(cat, t)}
                </button>
              ))}
              {selectedCategory !== "All" && (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                  className="prem-filter-pill"
                  style={{ color: "var(--text-muted)" }}
                >
                  {t("clear")}
                </button>
              )}
            </div>
          </div>

          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: "0 0 0.5rem" }}>
            {count} {count === 1 ? tc("count.product") : tc("count.products")} {tc("count.found")}
          </p>
        </div>
      </section>

      {/* ============ RESULTS ============ */}
      <section className="prem" style={{ paddingTop: "1rem" }}>
        <div className="prem-container">
          {loading ? (
            <div className="prem-prod-grid-v2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="prem-skeleton prem-skel-card" />
              ))}
            </div>
          ) : error ? (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <h2 style={{ margin: "0 0 0.5rem", color: "var(--text)" }}>{t("errors.load")}</h2>
              <p style={{ margin: "0 0 1.5rem", color: "var(--text-muted)" }}>{error}</p>
              <button type="button" className="button-base button-primary" onClick={reload}>{tc("retry")}</button>
            </div>
          ) : count === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <Sprout size={48} style={{ opacity: 0.2, marginBottom: "1rem", color: "var(--brand)" }} />
              <h2 style={{ margin: "0 0 0.5rem", color: "var(--text)" }}>{t("empty.title")}</h2>
              <p style={{ margin: 0, color: "var(--text-muted)" }}>{t("empty.description")}</p>
            </div>
          ) : (
            <>
              {/* Featured products row */}
              {featuredProducts.length > 0 && (
                <div style={{ marginBottom: "3rem" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--brand-strong)", margin: "0 0 1rem" }}>{tc("featured")}</h3>
                  <div className="prem-feat-prod-row">
                    {featuredProducts.map((p) => {
                      const img = imageUrl(p.images?.[0]);
                      return (
                        <Link key={p._id} to={`/products/${p.slug}`} className="prem-feat-prod-card no-underline">
                          {img && (
                            <div className="prem-feat-prod-img">
                              <img src={img} alt={p.name} loading="lazy" />
                            </div>
                          )}
                          <div className="prem-feat-prod-body">
                            <span className="prem-feat-prod-badge">{formatCategory(p.category, t)}</span>
                            <h3 className="prem-feat-prod-name">{p.name}</h3>
                            {p.shortDescription && <p className="prem-feat-prod-desc">{p.shortDescription}</p>}
                          </div>
                          <div className="prem-feat-prod-foot">
                            <span className="prem-prod-link">{t("viewDetails")} <ArrowRight size={14} /></span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Product grid */}
              <div className="prem-prod-grid-v2">
                {(regularProducts.length > 0 ? regularProducts : filteredProducts).map((p) => {
                  const img = imageUrl(p.images?.[0]);
                  const crops = p.targetCrops?.slice(0, 3) || [];
                  const methodKey = resolveMethodIcon(p.applicationMethod);
                  const MethodIcon = methodKey ? METHOD_ICONS[methodKey] : null;
                  return (
                    <Link key={p._id} to={`/products/${p.slug}`} className="prem-prod-card no-underline">
                      <div className="prem-prod-card-img">
                        {img ? (
                          <img src={img} alt={p.name} loading="lazy" />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
                            <Sprout size={32} strokeWidth={1} />
                          </div>
                        )}
                        <span className="prem-prod-card-cat">{formatCategory(p.category, t)}</span>
                        {MethodIcon && <span className="prem-prod-card-method">{MethodIcon}</span>}
                        {p.isImported && <span className="prem-prod-card-imported">{tc("imported")}</span>}
                      </div>
                      <div className="prem-prod-card-body">
                        <h3 className="prem-prod-card-name">{p.name}</h3>
                        {p.shortDescription && <p className="prem-prod-card-summary">{p.shortDescription}</p>}
                        {crops.length > 0 && (
                          <div className="prem-prod-card-meta">
                            {crops.map((crop, ci) => (
                              <span key={ci} className="prem-prod-card-tag">
                                <MapPin size={10} />
                                {crop}
                              </span>
                            ))}
                            {p.targetCrops.length > 3 && (
                              <span className="prem-prod-card-tag">+{p.targetCrops.length - 3}</span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="prem-prod-card-foot">
                        <span className="prem-prod-card-link">{t("viewDetails")} <ArrowRight size={14} /></span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}