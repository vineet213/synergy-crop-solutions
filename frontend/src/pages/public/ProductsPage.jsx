import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Sprout, MapPin, Droplets, FlaskConical, Zap } from "lucide-react";
import { usePublicProducts } from "../../hooks/useProducts.js";
import useSEO from "../../hooks/useSEO.js";
import { formatCategory, resolveMethodIcon } from "../../utils/formatters.js";
import { textValue, resolveImageUrl, resolveLocale, resolveLocaleArray } from "../../utils/productHelpers.js";

const METHOD_ICONS = {
  soil: <Sprout size={12} />,
  foliar: <Droplets size={12} />,
  seed: <FlaskConical size={12} />,
  drip: <Droplets size={12} />,
  multi: <Zap size={12} />,
};

export default function ProductsPage() {
  const { t, i18n } = useTranslation("products");
  const { t: tc } = useTranslation("common");
  const locale = i18n.language || "en";
  useSEO({ title: t("title"), canonical: "/products" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const params = { limit: 100 };
  if (selectedCategory !== "All") params.category = selectedCategory;
  const { products, loading, error, reload } = usePublicProducts(params);

  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    if (selectedCategory === "All" && !loading) {
      const cats = ["All", ...Array.from(new Set((products || []).map((p) => textValue(p.category) || tc("page.uncategorized"))))];
      setCategories(cats);
    }
  }, [selectedCategory, loading, products]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return products;
    return (products || []).filter((p) => {
      const name = resolveLocale(p.name, locale);
      const sciName = resolveLocale(p.scientificName, locale);
      const crops = resolveLocaleArray(p.crops, locale) || resolveLocaleArray(p.targetCrops, locale);
      return (
        name.toLowerCase().includes(q) ||
        sciName.toLowerCase().includes(q) ||
        textValue(p.category).toLowerCase().includes(q) ||
        crops.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, products, locale]);

  const count = filteredProducts?.length || 0;

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
              {/* Product grid */}
              <div className="prem-prod-grid-v2">
                {filteredProducts.map((p) => {
                  const img = resolveImageUrl(p.images?.[0]);
                  const crops = (resolveLocaleArray(p.crops, locale) || resolveLocaleArray(p.targetCrops, locale)).slice(0, 3);
                  const allCrops = resolveLocaleArray(p.crops, locale) || resolveLocaleArray(p.targetCrops, locale);
                  const methodKey = resolveMethodIcon(resolveLocale(p.applicationMethod, locale));
                  const MethodIcon = methodKey ? METHOD_ICONS[methodKey] : null;
                  const isFeatured = p.featured || p.isFeatured;
                  const pName = resolveLocale(p.name, locale);
                  const pShortDesc = resolveLocale(p.shortDescription, locale);
                  return (
                    <Link key={p._id} to={`/products/${p.slug}`} className="prem-prod-card no-underline">
                      <div className="prem-prod-card-img">
                        {img ? (
                          <img src={img} alt={pName} loading="lazy" />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
                            <Sprout size={32} strokeWidth={1} />
                          </div>
                        )}
                        <span className="prem-prod-card-cat">{formatCategory(p.category, t)}</span>
                        {isFeatured && <span className="prem-prod-card-featured" style={{ position: "absolute", top: "0.5rem", right: "0.5rem", background: "var(--brand)", color: "#fff", fontSize: "0.7rem", fontWeight: 600, padding: "0.2rem 0.5rem", borderRadius: "9999px", lineHeight: 1.4 }}>{tc("page.featured")}</span>}
                        {MethodIcon && <span className="prem-prod-card-method">{MethodIcon}</span>}
                        {p.isImported && <span className="prem-prod-card-imported">{tc("imported")}</span>}
                      </div>
                      <div className="prem-prod-card-body">
                        <h3 className="prem-prod-card-name">{pName}</h3>
                        {pShortDesc && <p className="prem-prod-card-summary">{pShortDesc}</p>}
                        {crops.length > 0 && (
                          <div className="prem-prod-card-meta">
                            {crops.map((crop, ci) => (
                              <span key={ci} className="prem-prod-card-tag">
                                <MapPin size={10} />
                                {crop}
                              </span>
                            ))}
                            {allCrops.length > 3 && (
                              <span className="prem-prod-card-tag">+{allCrops.length - 3}</span>
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
