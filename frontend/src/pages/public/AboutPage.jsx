import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Leaf, ShieldCheck, Users, Award, TreePine, Sprout, Target, HeartHandshake, ChevronRight } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import useSEO from "../../hooks/useSEO.js";

const commitmentIcons = [ShieldCheck, TreePine, Users, HeartHandshake];
const whyIcons = [Leaf, Award, Sprout, Users, Target, Leaf];

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
      {/* ──────── HERO ──────── */}
      <section className="about-hero page-container">
        <div className="about-hero__text">
          <span className="about-hero__label">{t("aboutPage.hero.subtitle")}</span>
          <h1 className="about-hero__title">{t("aboutPage.hero.title")}</h1>
          <p>{t("aboutPage.hero.description")}</p>
          <div className="about-hero__actions">
            <Link to="/products" className="no-underline"><Button>{t("cta.exploreSolutions")}</Button></Link>
            <Link to="/contact" className="no-underline"><Button variant="secondary">{t("cta.contactOurTeam")}</Button></Link>
          </div>
        </div>
        <div className="about-hero__media" style={{ background: "var(--brand-gradient)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Leaf size={80} strokeWidth={1} style={{ color: "rgba(255,255,255,0.12)" }} />
        </div>
      </section>

      {/* ──────── OVERVIEW ──────── */}
      <section className="prem prem-alt">
        <div className="prem-container prem-split">
          <div className="prem-split__text">
            <span className="prem-header__label">{t("aboutPage.overview.subtitle")}</span>
            <h2 className="prem-header__title">{t("aboutPage.overview.title")}</h2>
            {t("aboutPage.overview.body").split("\n\n").map((p, i) => (
              <p key={i} className="prem-split__body">{p}</p>
            ))}
          </div>
          <div className="prem-split__media" style={{ background: "var(--surface-muted)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sprout size={80} strokeWidth={1} style={{ color: "var(--text-muted)", opacity: 0.3 }} />
          </div>
        </div>
      </section>

      {/* ──────── VISION & MISSION SPLIT ──────── */}
      <section className="prem prem-dark">
        <div className="prem-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem" }}>
            <div>
              <Target size={24} style={{ marginBottom: "1rem", opacity: 0.7 }} />
              <h2 style={{ margin: "0 0 1rem", fontSize: "1.5rem", fontWeight: 700 }}>{t("aboutPage.vision.title")}</h2>
              <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.8, opacity: 0.8 }}>{t("aboutPage.vision.body")}</p>
            </div>
            <div>
              <HeartHandshake size={24} style={{ marginBottom: "1rem", opacity: 0.7 }} />
              <h2 style={{ margin: "0 0 1rem", fontSize: "1.5rem", fontWeight: 700 }}>{t("aboutPage.mission.title")}</h2>
              <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.8, opacity: 0.8 }}>{t("aboutPage.mission.body")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── COMMITMENT ──────── */}
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

      {/* ──────── WHY CHOOSE US ──────── */}
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

      {/* ──────── CTA ──────── */}
      <section className="prem-cta">
        <div className="prem-container">
          <header className="prem-header center">
            <span className="prem-header__label">{t("aboutPage.cta.subtitle")}</span>
            <h2 className="prem-header__title">{t("aboutPage.cta.title")}</h2>
            <p className="prem-header__text">{t("aboutPage.cta.description")}</p>
          </header>
          <div className="prem-cta-actions">
            <Link to="/contact" className="no-underline"><Button>{t("aboutPage.cta.button")}</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}