import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Leaf, ShieldCheck, Users, Award, TreePine, Sprout,
  Target, HeartHandshake, ChevronRight, Lightbulb, FlaskConical,
  ArrowRight, Microscope, Sun, Dna, Tractor
} from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import useSEO from "../../hooks/useSEO.js";

const valueIcons = [Lightbulb, Leaf, Users, ShieldCheck, FlaskConical];
const whyIcons = [Leaf, Award, Sprout, Users, Target, TreePine];
const commitmentIcons = [ShieldCheck, TreePine, Users, HeartHandshake];
const techIcons = [Dna, Sun, Microscope, Sprout];

export default function AboutPage() {
  const { t } = useTranslation("common");
  useSEO({ title: t("aboutPage.hero.title"), canonical: "/about" });

  const commitments = t("aboutPage.commitment.items", { returnObjects: true });
  const whyChoose = t("aboutPage.whyChoose.items", { returnObjects: true });
  const values = t("aboutPage.values.items", { returnObjects: true });

  const techKeys = ["lyophilization", "nutrition", "bioSolutions", "sustainable"];
  const techItems = t("aboutPage.technology", { returnObjects: true });
  const tech = techKeys.map((key, i) => ({
    title: techItems[key]?.title || "",
    description: techItems[key]?.description || "",
    icon: techIcons[i],
  }));

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="about-hero">
        <div className="about-hero__text">
          <span className="about-hero__label">
            <Sprout size={14} style={{ marginRight: "0.4rem", verticalAlign: "middle" }} />
            {t("aboutPage.hero.subtitle")}
          </span>
          <h1 className="about-hero__title">{t("aboutPage.hero.title")}</h1>
          <p>{t("aboutPage.hero.description")}</p>
          <div className="about-hero__actions">
            <Link to="/products" className="no-underline"><Button>{t("cta.exploreSolutions")}</Button></Link>
            <Link to="/contact" className="no-underline"><Button variant="secondary">{t("cta.contactOurTeam")}</Button></Link>
          </div>
        </div>
      </section>

      {/* ============ COMPANY STORY ============ */}
      <section className="prem prem-alt">
        <div className="prem-container prem-intro">
          <div className="prem-intro-text">
            <span className="prem-header__label">{t("aboutPage.overview.subtitle")}</span>
            <h2 className="prem-header__title" style={{ margin: 0 }}>{t("aboutPage.overview.title")}</h2>
            {t("aboutPage.overview.body").split("\n\n").map((p, i) => (
              <p key={i} className="prem-split__body">{p}</p>
            ))}
          </div>
          <div className="prem-intro-visual" style={{ overflow: "hidden" }}>
            <img
              src="/client-assets/about/about-hero.jpeg"
              alt={t("aboutPage.overview.title")}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ============ VISION & MISSION ============ */}
      <section className="prem prem-dark">
        <div className="prem-container">
          <header className="prem-header center" style={{ marginBottom: "3rem" }}>
            <span className="prem-header__label" style={{ color: "rgba(255,255,255,0.5)" }}>{t("aboutPage.vision.title")} & {t("aboutPage.mission.title")}</span>
            <h2 className="prem-header__title">{t("aboutPage.vision.title")} & {t("aboutPage.mission.title")}</h2>
          </header>
          <div className="prem-vision-grid">
            <div className="prem-vision-card">
              <Target size={28} />
              <h2>{t("aboutPage.vision.title")}</h2>
              <p>{t("aboutPage.vision.body")}</p>
            </div>
            <div className="prem-vision-card">
              <HeartHandshake size={28} />
              <h2>{t("aboutPage.mission.title")}</h2>
              <p>{t("aboutPage.mission.body")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CORE VALUES ============ */}
      <section className="prem">
        <div className="prem-container">
          <header className="prem-header center">
            <span className="prem-header__label">{t("aboutPage.values.subtitle")}</span>
            <h2 className="prem-header__title">{t("aboutPage.values.title")}</h2>
          </header>
          <div className="prem-values-grid">
            {values.map((v, i) => {
              const Icon = valueIcons[i] || Leaf;
              return (
                <div key={i} className="prem-value-card">
                  <p className="prem-value-number">{String(i + 1).padStart(2, "0")}</p>
                  <span style={{ display: "inline-flex", padding: "0.6rem", borderRadius: "999px", background: "var(--brand-soft)", color: "var(--brand-strong)", width: "fit-content" }}>
                    <Icon size={22} />
                  </span>
                  <h3 className="prem-value-title">{v.title}</h3>
                  <p className="prem-value-desc">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ TECHNOLOGY ============ */}
      <section className="prem prem-alt">
        <div className="prem-container">
          <header className="prem-header center">
            <span className="prem-header__label">{t("aboutPage.technology.subtitle")}</span>
            <h2 className="prem-header__title">{t("aboutPage.technology.title")}</h2>
          </header>
          <div className="prem-feat-grid">
            {tech.map((item, i) => {
              const Icon = item.icon;
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
