import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Leaf, ShieldCheck, Users, Award, TreePine, Sprout,
  Target, HeartHandshake, ChevronRight, Lightbulb, FlaskConical,
  Building2, ArrowRight
} from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import useSEO from "../../hooks/useSEO.js";

const commitmentIcons = [ShieldCheck, TreePine, Users, HeartHandshake];
const whyIcons = [Leaf, Award, Sprout, Users, Target, Leaf];

const values = [
  { icon: Lightbulb, title: "Innovation", desc: "Continuous R&D to develop next-generation bio-based solutions that address real farming challenges." },
  { icon: ShieldCheck, title: "Quality", desc: "Rigorous testing and quality assurance protocols ensure every product meets the highest standards." },
  { icon: HeartHandshake, title: "Partnership", desc: "Building lasting relationships with farmers, distributors, and dealers through trust and transparency." },
  { icon: Leaf, title: "Sustainability", desc: "Committed to residue-free farming and environmental stewardship for future generations." },
];

export default function AboutPage() {
  useSEO({ title: "About Us", canonical: "/about" });
  const { t } = useTranslation("common");

  const commitments = [0, 1, 2, 3].map((i) => ({
    title: t(`aboutPage.commitment.items[${i}].title`),
    description: t(`aboutPage.commitment.items[${i}].description`),
  }));

  const whyChoose = [0, 1, 2, 3, 4, 5].map((i) => ({
    title: t(`aboutPage.whyChoose.items[${i}].title`),
    description: t(`aboutPage.whyChoose.items[${i}].description`),
  }));

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="prem-hero" style={{ padding: "5rem 0 4rem" }}>
        <div className="prem-container prem-hero-content">
          <div className="prem-hero-text">
            <span className="prem-hero-badge">
              <Sprout size={14} />
              {t("aboutPage.hero.subtitle")}
            </span>
            <h1 className="prem-hero-title">{t("aboutPage.hero.title")}</h1>
            <p className="prem-hero-sub">{t("aboutPage.hero.description")}</p>
            <div className="prem-hero-actions">
              <Link to="/products" className="no-underline"><Button>{t("cta.exploreSolutions")}</Button></Link>
              <Link to="/contact" className="no-underline"><Button variant="secondary">{t("cta.contactOurTeam")}</Button></Link>
            </div>
          </div>
          <div className="prem-hero-visual" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sprout size={80} strokeWidth={1} style={{ color: "rgba(255,255,255,0.1)" }} />
          </div>
        </div>
      </section>

      {/* ============ COMPANY OVERVIEW ============ */}
      <section className="prem prem-alt">
        <div className="prem-container prem-intro">
          <div className="prem-intro-text">
            <span className="prem-header__label">{t("aboutPage.overview.subtitle")}</span>
            <h2 className="prem-header__title" style={{ margin: 0 }}>{t("aboutPage.overview.title")}</h2>
            {t("aboutPage.overview.body").split("\n\n").map((p, i) => (
              <p key={i} className="prem-split__body">{p}</p>
            ))}
          </div>
          <div className="prem-intro-visual" style={{ background: "var(--brand-gradient)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Building2 size={80} strokeWidth={1} style={{ color: "rgba(255,255,255,0.12)" }} />
          </div>
        </div>
      </section>

      {/* ============ OUR VALUES ============ */}
      <section className="prem">
        <div className="prem-container">
          <header className="prem-header center">
            <span className="prem-header__label">Our Core Values</span>
            <h2 className="prem-header__title">What Drives Us</h2>
          </header>
          <div className="prem-values-grid">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="prem-value-card">
                  <p className="prem-value-number">{String(i + 1).padStart(2, "0")}</p>
                  <span style={{ display: "inline-flex", padding: "0.6rem", borderRadius: "999px", background: "var(--brand-soft)", color: "var(--brand-strong)", width: "fit-content" }}>
                    <Icon size={22} />
                  </span>
                  <h3 className="prem-value-title">{v.title}</h3>
                  <p className="prem-value-desc">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ VISION & MISSION ============ */}
      <section className="prem prem-dark">
        <div className="prem-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem" }}>
            <div>
              <Target size={28} style={{ marginBottom: "1rem", opacity: 0.7 }} />
              <h2 style={{ margin: "0 0 1rem", fontSize: "1.5rem", fontWeight: 700 }}>{t("aboutPage.vision.title")}</h2>
              <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.8, opacity: 0.8 }}>{t("aboutPage.vision.body")}</p>
            </div>
            <div>
              <HeartHandshake size={28} style={{ marginBottom: "1rem", opacity: 0.7 }} />
              <h2 style={{ margin: "0 0 1rem", fontSize: "1.5rem", fontWeight: 700 }}>{t("aboutPage.mission.title")}</h2>
              <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.8, opacity: 0.8 }}>{t("aboutPage.mission.body")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMMITMENT ============ */}
      <section className="prem">
        <div className="prem-container">
          <header className="prem-header center">
            <span className="prem-header__label">{t("aboutPage.commitment.subtitle")}</span>
            <h2 className="prem-header__title">{t("aboutPage.commitment.title")}</h2>
          </header>
          <div className="prem-feat-grid">
            {commitments.map((item, i) => {
              const Icon = commitmentIcons[i] || ShieldCheck;
              return (
                <div key={i} className="prem-feat">
                  <span className="prem-feat-icon"><Icon size={20} /></span>
                  <div className="prem-feat-body">
                    <h3 className="prem-feat-title">{item.title}</h3>
                    <p className="prem-feat-desc">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="prem prem-alt">
        <div className="prem-container">
          <header className="prem-header center">
            <span className="prem-header__label">{t("aboutPage.whyChoose.subtitle")}</span>
            <h2 className="prem-header__title">{t("aboutPage.whyChoose.title")}</h2>
          </header>
          <div className="prem-feat-grid">
            {whyChoose.map((item, i) => {
              const Icon = whyIcons[i] || Leaf;
              return (
                <div key={i} className="prem-feat">
                  <span className="prem-feat-icon"><Icon size={20} /></span>
                  <div className="prem-feat-body">
                    <h3 className="prem-feat-title">{item.title}</h3>
                    <p className="prem-feat-desc">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="prem">
        <div className="prem-container">
          <div className="prem-cta-card" style={{ padding: "3rem" }}>
            <header className="prem-header center">
              <span className="prem-header__label" style={{ color: "rgba(255,255,255,0.6)" }}>{t("aboutPage.cta.subtitle")}</span>
              <h2 className="prem-header__title">{t("aboutPage.cta.title")}</h2>
              <p className="prem-header__text">{t("aboutPage.cta.description")}</p>
            </header>
            <div className="prem-cta-actions">
              <Link to="/contact" className="no-underline"><Button>{t("aboutPage.cta.button")}</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}