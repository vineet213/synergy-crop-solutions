import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Sprout, ShieldCheck, Users, Award, TreePine, Droplets, Leaf,
  Star, ChevronRight, ArrowRight, FlaskConical, Microscope,
  Globe, Recycle, CheckCircle, MapPin, Quote, TrendingUp
} from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import Badge from "../../components/ui/Badge.jsx";
import HeroCarousel from "../../components/home/HeroCarousel.jsx";
import { usePublicTestimonials } from "../../hooks/useTestimonials.js";
import { usePublicCertifications } from "../../hooks/useCertifications.js";
import { usePublicProducts } from "../../hooks/useProducts.js";
import useSEO from "../../hooks/useSEO.js";
import { formatCategory } from "../../utils/formatters.js";

const categoryIcons = [Sprout, ShieldCheck, Droplets, FlaskConical, Leaf];

const techIcons = [Microscope, FlaskConical, Recycle, TrendingUp];

export default function HomePage() {
  useSEO({ canonical: "/" });
  const { t } = useTranslation("home");
  const { t: tc } = useTranslation("common");
  const { t: tp } = useTranslation("products");
  const navigate = useNavigate();
  const { testimonials, loading: loadingTestimonials } = usePublicTestimonials();
  const { certifications, loading: loadingCertifications } = usePublicCertifications();
  const { products } = usePublicProducts({ limit: 3 });
  const visibleProducts = products || [];

  const cats = t("categories.cards", { returnObjects: true });

  function imageUrl(raw) {
    if (!raw) return null;
    return raw.startsWith("http") || raw.startsWith("/") ? raw : `/${raw}`;
  }

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="prem-hero">
        <div className="prem-container prem-hero-content">
          <div className="prem-hero-text">
            <span className="prem-hero-badge">
              <Sprout size={14} />
              {t("hero.badge")}
            </span>
            <h1 className="prem-hero-title">{t("hero.title")}</h1>
            <p className="prem-hero-sub">{t("hero.subtitle")}</p>
            <div className="prem-hero-actions">
              <Button onClick={() => navigate("/products")}>{tc("cta.exploreSolutions")}</Button>
              <Button variant="secondary" onClick={() => navigate("/about")}>{tc("cta.viewOurStory")}</Button>
            </div>
          </div>
          <div className="prem-hero-visual">
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* ============ CAPABILITIES ============ */}
      <section className="prem">
        <div className="prem-container">
          <div className="prem-cap-grid">
            {t("capabilities.items", { returnObjects: true }).map((cap, i) => {
              const icons = [Sprout, Globe, Award, Users];
              const Icon = icons[i] || Sprout;
              return (
                <div key={i} className="prem-cap-item">
                  <span className="prem-cap-icon"><Icon size={22} /></span>
                  <p className="prem-cap-value">{cap.value}</p>
                  <p className="prem-cap-label">{cap.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ COMPANY INTRODUCTION ============ */}
      <section className="prem prem-alt">
        <div className="prem-container prem-intro">
          <div className="prem-intro-text">
            <span className="prem-header__label">{t("about.label")}</span>
            <h2 className="prem-header__title" style={{ margin: 0 }}>{t("about.title")}</h2>
            <p className="prem-split__body">{t("about.body")}</p>
            <div className="prem-intro-stats">
              {t("aboutStats", { returnObjects: true }).map((stat, i) => (
                <div key={i} className="prem-intro-stat">
                  <p className="prem-intro-stat-value">{stat.value}</p>
                  <p className="prem-intro-stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
            <Link to="/about" className="button-base button-primary" style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}>
              {t("about.cta")}
            </Link>
          </div>
          <div className="prem-intro-visual" style={{ background: "var(--brand-gradient)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.12)", textAlign: "center", padding: "2rem" }}>
              <Sprout size={80} strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="prem">
        <div className="prem-container">
          <header className="prem-header center">
            <span className="prem-header__label">{t("trust.label")}</span>
            <h2 className="prem-header__title">{t("trust.title")}</h2>
          </header>
          <div className="prem-why-grid">
            {t("trust.stats", { returnObjects: true }).map((stat, i) => {
              const icons = [ShieldCheck, Globe, Award, Star, Users, Leaf];
              const Icon = icons[i] || ShieldCheck;
              return (
                <div key={i} className="prem-why-card">
                  <span className="prem-why-icon"><Icon size={22} /></span>
                  <h3 className="prem-why-title">{stat.value}</h3>
                  <p className="prem-why-desc">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PRODUCT CATEGORIES ============ */}
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
                  <span className="prem-cat-icon"><Icon size={22} /></span>
                  <h3 className="prem-cat-title">{cat.title}</h3>
                  <p className="prem-cat-desc">{cat.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
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
            <div className="prem-feat-prod-row">
              {visibleProducts.slice(0, 3).map((p) => {
                const img = imageUrl(p.images?.[0]);
                return (
                  <Link key={p._id} to={`/products/${p.slug}`} className="prem-feat-prod-card no-underline">
                    {img && (
                      <div className="prem-feat-prod-img">
                        <img src={img} alt={p.name} loading="lazy" />
                      </div>
                    )}
                    <div className="prem-feat-prod-body">
                      <span className="prem-feat-prod-badge">{formatCategory(p.category, tp)}</span>
                      <h3 className="prem-feat-prod-name">{p.name}</h3>
                      {p.shortDescription && <p className="prem-feat-prod-desc">{p.shortDescription}</p>}
                    </div>
                    <div className="prem-feat-prod-foot">
                      <span className="prem-prod-link">{t("detail.viewDetails", "View Details")} <ArrowRight size={14} /></span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============ TECHNOLOGY & RESEARCH ============ */}
      <section className="prem prem-alt">
        <div className="prem-container">
          <header className="prem-header">
            <span className="prem-header__label">{t("innovation.label")}</span>
            <h2 className="prem-header__title">{t("innovation.title")}</h2>
            <p className="prem-header__text">{t("innovation.body")}</p>
          </header>
          <div className="prem-tech-grid">
            {t("tech.items", { returnObjects: true }).map((item, i) => {
              const Icon = techIcons[i] || Microscope;
              return (
                <div key={i} className="prem-tech-card">
                  <span className="prem-tech-icon"><Icon size={22} /></span>
                  <div className="prem-tech-body">
                    <h3 className="prem-tech-title">{item.title}</h3>
                    <p className="prem-tech-desc">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CERTIFICATIONS ============ */}
      <section className="prem">
        <div className="prem-container">
          <header className="prem-header center">
            <span className="prem-header__label">{t("certifications.label")}</span>
            <h2 className="prem-header__title">{t("certifications.title")}</h2>
          </header>
          {loadingCertifications ? (
            <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--text-muted)" }}>{tc("loading")}</div>
          ) : certifications.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--text-muted)" }}>{t("certifications.empty")}</p>
          ) : (
            <div className="prem-cert-grid">
              {certifications.map((c) => (
                <div key={c._id} className="prem-cert-card">
                  <span className="prem-cert-icon"><Award size={22} /></span>
                  <div className="prem-cert-body">
                    <h3 className="prem-cert-title">{c.title}</h3>
                    {c.description && <p className="prem-cert-desc">{c.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="prem prem-alt">
        <div className="prem-container">
          <header className="prem-header center">
            <span className="prem-header__label">{t("testimonials.label")}</span>
            <h2 className="prem-header__title">{t("testimonials.title")}</h2>
          </header>
          {loadingTestimonials ? (
            <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--text-muted)" }}>{tc("loading")}</div>
          ) : testimonials.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--text-muted)" }}>{t("testimonials.empty")}</p>
          ) : (
            <div className="prem-testi-grid">
              {testimonials.slice(0, 3).map((item) => (
                <div key={item._id} className="prem-testi">
                  <span style={{ color: "var(--brand)", opacity: 0.3 }}><Quote size={32} /></span>
                  <p className="prem-testi-text">"{item.testimonial}"</p>
                  <div className="prem-testi-author">
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", width: "100%" }}>
                      <div style={{ width: "44px", height: "44px", borderRadius: "999px", background: "var(--brand-soft)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Users size={20} style={{ color: "var(--brand-strong)" }} />
                      </div>
                      <div>
                        <p className="prem-testi-name">{item.customerName}</p>
                        {item.location && <p className="prem-testi-role">{item.location}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ COVERAGE ============ */}
      <section className="prem">
        <div className="prem-container prem-coverage">
          <div className="prem-coverage-text">
            <span className="prem-header__label">{t("coverage.label")}</span>
            <h2 className="prem-header__title" style={{ margin: 0 }}>{t("coverage.title")}</h2>
            <p className="prem-header__text">
              {t("coverage.description")}
            </p>
            <ul className="prem-coverage-list">
              {t("coverage.states", { returnObjects: true }).map((state) => (
                <li key={state} className="prem-coverage-item">
                  <MapPin size={14} />
                  {state}
                </li>
              ))}
            </ul>
          </div>
          <div className="prem-coverage-visual">
            <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "2rem" }}>
              <Globe size={64} strokeWidth={1} style={{ opacity: 0.3, marginBottom: "1rem" }} />
              <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>{t("coverage.label")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="prem">
        <div className="prem-container">
          <div className="prem-cta-card">
            <header className="prem-header center">
              <span className="prem-header__label" style={{ color: "rgba(255,255,255,0.6)" }}>{t("cta.label")}</span>
              <h2 className="prem-header__title">{t("cta.title")}</h2>
              <p className="prem-header__text">{t("cta.text")}</p>
            </header>
            <div className="prem-cta-actions">
              <Button onClick={() => navigate("/contact")}>{t("cta.contact")}</Button>
              <Button variant="secondary" onClick={() => navigate("/products")}>{t("cta.explore")}</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}