import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Sprout, ShieldCheck, Droplets, FlaskConical, Leaf, ArrowRight, ChevronRight } from "lucide-react";
import useSEO from "../../hooks/useSEO.js";

const categoryIcons = [Sprout, ShieldCheck, FlaskConical, Droplets, Leaf];

export default function CategoriesPage() {
  const { t } = useTranslation("common");
  useSEO({ title: "Categories", canonical: "/categories" });
  const navigate = useNavigate();

  const cats = [
    { title: "Bio Fertilizers", description: "Advanced bio-based nutrient solutions that enrich soil health and boost crop yields naturally.", productCount: "Multiple variants" },
    { title: "Bio Pesticides / Fungicides", description: "Effective residue-free pest and disease control products derived from natural sources.", productCount: "Multiple variants" },
    { title: "Consortia Products", description: "Synergistic microbial consortia for enhanced soil fertility, plant growth, and stress tolerance.", productCount: "Multiple variants" },
    { title: "Liquid Nutrition", description: "Ready-to-use liquid formulations for targeted nutrient delivery and rapid crop response.", productCount: "Multiple variants" },
    { title: "Organic Inputs", description: "Certified organic soil amendments and natural inputs for sustainable farming systems.", productCount: "Multiple variants" },
  ];

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="prem-hero" style={{ padding: "5rem 0 4rem" }}>
        <div className="prem-container prem-hero-content">
          <div className="prem-hero-text">
            <span className="prem-hero-badge">
              <Sprout size={14} />
              {t("page.categories.subtitle")}
            </span>
            <h1 className="prem-hero-title">{t("page.categories.title")}</h1>
            <p className="prem-hero-sub">Explore our complete range of agricultural solutions organized by category. Each category contains specialized products for specific farming needs.</p>
          </div>
          <div className="prem-hero-visual" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Leaf size={64} strokeWidth={1} style={{ color: "rgba(255,255,255,0.1)" }} />
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="prem prem-alt">
        <div className="prem-container">
          <header className="prem-header center">
            <span className="prem-header__label">Product Range</span>
            <h2 className="prem-header__title">Specialised in Residue-Free Agriculture</h2>
          </header>
          <div style={{ display: "grid", gap: "1.5rem", maxWidth: "800px", margin: "0 auto" }}>
            {cats.map((cat, i) => {
              const Icon = categoryIcons[i] || Leaf;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => navigate(`/products?category=${encodeURIComponent(cat.title)}`)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                    padding: "1.75rem",
                    background: "var(--surface)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-md)",
                    cursor: "pointer",
                    textAlign: "left",
                    font: "inherit",
                    color: "inherit",
                    width: "100%",
                    transition: "box-shadow 0.3s ease, transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                >
                  <span style={{ display: "inline-flex", padding: "0.85rem", borderRadius: "999px", background: "var(--brand-gradient)", color: "var(--text-inverse)", flexShrink: 0 }}>
                    <Icon size={24} />
                  </span>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.1rem", fontWeight: 700, color: "var(--brand-strong)" }}>{cat.title}</h3>
                    <p style={{ margin: "0 0 0.35rem", fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{cat.description}</p>
                    <span style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: 600 }}>{cat.productCount}</span>
                  </div>
                  <ChevronRight size={20} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
