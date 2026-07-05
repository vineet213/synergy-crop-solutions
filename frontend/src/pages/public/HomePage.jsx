import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sprout, ShieldCheck, Users, Award, TreePine, Droplets, Leaf, Star, ChevronRight, ArrowRight } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import Badge from "../../components/ui/Badge.jsx";
import HeroCarousel from "../../components/home/HeroCarousel.jsx";
import CoreStrengthCards from "../../components/home/CoreStrengthCards.jsx";
import { usePublicTestimonials } from "../../hooks/useTestimonials.js";
import { usePublicCertifications } from "../../hooks/useCertifications.js";
import { usePublicProducts } from "../../hooks/useProducts.js";
import useSEO from "../../hooks/useSEO.js";

const categoryIcons = [Sprout, Leaf, TreePine, Droplets, Award];

export default function HomePage() {
  useSEO({ canonical: "/" });
  const { t } = useTranslation("home");
  const { t: tc } = useTranslation("common");
  const navigate = useNavigate();
  const { testimonials, loading: loadingTestimonials } = usePublicTestimonials();
  const { certifications, loading: loadingCertifications } = usePublicCertifications();
  const { products } = usePublicProducts({ limit: 3 });
  const visibleProducts = products || [];

  const cats = t("categories.cards", { returnObjects: true });

  return (
    <div>
      {/* ──────── HERO ──────── */}
      <section className="hero-panel page-container">
        <div className="hero-copy">
          <Badge variant="brand">{t("hero.badge")}</Badge>
          <h1 className="hero-title">{t("hero.title")}</h1>
          <p className="hero-text">{t("hero.subtitle")}</p>
          <div className="hero-actions">
            <Button onClick={() => navigate("/products")}>{tc("cta.exploreSolutions")}</Button>
            <Button variant="secondary" onClick={() => navigate("/about")}>{tc("cta.viewOurStory")}</Button>
          </div>
        </div>
        <div className="hero-visual">
          <HeroCarousel />
        </div>
      </section>

      {/* ──────── ABOUT SYNERGY ──────── */}
      <section className="prem prem-alt">
        <div className="prem-container prem-split">
          <div className="prem-split__text">
            <span className="prem-header__label">{t("about.label")}</span>
            <h2 className="prem-header__title">{t("about.title")}</h2>
            <p className="prem-split__body">{t("about.body")}</p>
            <Link to="/about" className="button-base button-primary" style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}>
              {t("about.cta")}
            </Link>
          </div>
          <div className="prem-split__media" style={{ background: "var(--brand-gradient)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.15)", textAlign: "center", padding: "2rem" }}>
              <Leaf size={80} strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* ──────── WHY FARMERS TRUST US ──────── */}
      <section className="prem">
        <div className="prem-container">
          <header className="prem-header center">
            <span className="prem-header__label">{t("trust.label")}</span>
            <h2 className="prem-header__title">{t("trust.title")}</h2>
          </header>
          <div className="prem-stat-grid">
            {t("trust.stats", { returnObjects: true }).map((stat, i) => {
              const StatIcons = [ShieldCheck, Users, Award, Star];
              const StatIcon = StatIcons[i] || ShieldCheck;
              return (
                <div key={i} className="prem-stat">
                  <span className="prem-stat-icon"><StatIcon size={20} /></span>
                  <p className="prem-stat-value">{stat.value}</p>
                  <p className="prem-stat-label">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────── PRODUCT CATEGORIES ──────── */}
      <section className="prem prem-alt">
        <div className="prem-container">
          <header className="prem-header">
            <span className="prem-header__label">{t("categories.label")}</span>
            <h2 className="prem-header__title">{t("categories.title")}</h2>
          </header>
          <div className="prem-cat-grid">
            {Array.isArray(cats) && cats.map((cat, i) => {
              const Icon = categoryIcons[i] || Leaf;
              return (
                <button key={i} type="button" className="prem-cat-btn" onClick={() => navigate(`/products?category=${encodeURIComponent(cat.title)}`)}>
                  <span className="prem-cat-icon"><Icon size={20} /></span>
                  <h3 className="prem-cat-title">{cat.title}</h3>
                  <p className="prem-cat-desc">{cat.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────── FEATURED PRODUCTS ──────── */}
      {visibleProducts.length > 0 && (
        <section className="prem">
          <div className="prem-container">
            <div className="prem-featured-header">
              <header className="prem-header">
                <span className="prem-header__label">{t("featured.label")}</span>
                <h2 className="prem-header__title">{t("featured.title")}</h2>
              </header>
              <Link to="/products" className="prem-prod-link">
                {tc("cta.viewProducts")} <ChevronRight size={16} />
              </Link>
            </div>
            <div className="prem-prod-grid">
              {visibleProducts.slice(0, 3).map((p) => {
                const img = p.images?.[0]
                  ? (p.images[0].startsWith("http") || p.images[0].startsWith("/") ? p.images[0] : `/${p.images[0]}`)
                  : null;
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
                      <p className="prem-prod-price">{p.price ? `₹${p.price}` : tc("cta.getInTouch")}</p>
                      <span className="prem-prod-link">{tc("cta.viewProducts")} <ArrowRight size={14} /></span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ──────── TECHNOLOGY & INNOVATION ──────── */}
      <section className="prem prem-alt">
        <div className="prem-container prem-split flip">
          <div className="prem-split__text">
            <span className="prem-header__label">{t("innovation.label")}</span>
            <h2 className="prem-header__title">{t("innovation.title")}</h2>
            <p className="prem-split__body">{t("innovation.body")}</p>
            <Link to="/about" className="prem-prod-link" style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}>
              {tc("cta.viewOurStory")} <ChevronRight size={16} />
            </Link>
          </div>
          <div className="prem-split__media" style={{ background: "linear-gradient(135deg, var(--secondary) 0%, var(--brand) 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.12)", textAlign: "center", padding: "2rem" }}>
              <Sprout size={80} strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* ──────── LICENCES / CERTIFICATIONS ──────── */}
      <section className="prem">
        <div className="prem-container">
          <header className="prem-header center">
            <span className="prem-header__label">{t("certifications.label")}</span>
            <h2 className="prem-header__title">{t("certifications.title")}</h2>
          </header>
          {loadingCertifications ? (
            <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--text-muted)" }}>Loading...</div>
          ) : certifications.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--text-muted)" }}>{t("certifications.empty")}</p>
          ) : (
            <div className="prem-logos">
              {certifications.map((c) => (
                <div key={c._id} className="prem-logo-item">
                  <Award size={20} />
                  <span>{c.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ──────── TESTIMONIALS ──────── */}
      <section className="prem prem-alt">
        <div className="prem-container">
          <header className="prem-header center">
            <span className="prem-header__label">{t("testimonials.label")}</span>
            <h2 className="prem-header__title">{t("testimonials.title")}</h2>
          </header>
          {loadingTestimonials ? (
            <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--text-muted)" }}>Loading...</div>
          ) : testimonials.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--text-muted)" }}>{t("testimonials.empty")}</p>
          ) : (
            <div className="prem-testi-grid">
              {testimonials.slice(0, 3).map((item) => (
                <div key={item._id} className="prem-testi">
                  <p className="prem-testi-text">"{item.testimonial}"</p>
                  <div className="prem-testi-author">
                    <div>
                      <p className="prem-testi-name">{item.customerName}</p>
                      {item.location && <p className="prem-testi-role">{item.location}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ──────── CTA ──────── */}
      <section className="prem-cta">
        <div className="prem-container">
          <header className="prem-header center">
            <span className="prem-header__label">{t("cta.label")}</span>
            <h2 className="prem-header__title">{t("cta.title")}</h2>
            <p className="prem-header__text">{t("cta.text")}</p>
          </header>
          <div className="prem-cta-actions">
            <Button onClick={() => navigate("/contact")}>{t("cta.contact")}</Button>
            <Button variant="secondary" onClick={() => navigate("/products")}>{t("cta.explore")}</Button>
          </div>
        </div>
      </section>
    </div>
  );
}