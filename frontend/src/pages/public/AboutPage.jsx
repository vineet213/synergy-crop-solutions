import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Leaf, ShieldCheck, Users, Award, TreePine, Sprout, Target, HeartHandshake } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import useSEO from "../../hooks/useSEO.js";

const commitmentItems = [
  {
    titleKey: "commitment.items[0].title",
    descriptionKey: "commitment.items[0].description",
    icon: <ShieldCheck size={20} />,
  },
  {
    titleKey: "commitment.items[1].title",
    descriptionKey: "commitment.items[1].description",
    icon: <TreePine size={20} />,
  },
  {
    titleKey: "commitment.items[2].title",
    descriptionKey: "commitment.items[2].description",
    icon: <Users size={20} />,
  },
  {
    titleKey: "commitment.items[3].title",
    descriptionKey: "commitment.items[3].description",
    icon: <HeartHandshake size={20} />,
  },
];

const whyChooseItems = [
  {
    titleKey: "whyChoose.items[0].title",
    descriptionKey: "whyChoose.items[0].description",
    icon: <Leaf size={20} />,
  },
  {
    titleKey: "whyChoose.items[1].title",
    descriptionKey: "whyChoose.items[1].description",
    icon: <Award size={20} />,
  },
  {
    titleKey: "whyChoose.items[2].title",
    descriptionKey: "whyChoose.items[2].description",
    icon: <Sprout size={20} />,
  },
  {
    titleKey: "whyChoose.items[3].title",
    descriptionKey: "whyChoose.items[3].description",
    icon: <Users size={20} />,
  },
  {
    titleKey: "whyChoose.items[4].title",
    descriptionKey: "whyChoose.items[4].description",
    icon: <Target size={20} />,
  },
  {
    titleKey: "whyChoose.items[5].title",
    descriptionKey: "whyChoose.items[5].description",
    icon: <Leaf size={20} />,
  },
];

export default function AboutPage() {
  useSEO({ title: "About Us", canonical: "/about" });
  const { t } = useTranslation("common");

  return (
    <div>
      <section className="hero-panel page-container">
        <div className="hero-copy">
          <Badge variant="brand">{t("aboutPage.hero.subtitle")}</Badge>
          <h1 className="hero-title">{t("aboutPage.hero.title")}</h1>
          <p className="hero-text">{t("aboutPage.hero.description")}</p>
          <div className="hero-actions">
            <Link to="/products" className="no-underline">
              <Button>{t("cta.exploreSolutions")}</Button>
            </Link>
            <Link to="/contact" className="no-underline">
              <Button variant="secondary">{t("cta.contactOurTeam")}</Button>
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <p>{t("aboutPage.hero.subtitle")}</p>
        </div>
      </section>

      <SectionContainer title={t("aboutPage.overview.title")} subtitle={t("aboutPage.overview.subtitle")}>
        <div className="card-shell">
          <p>{t("aboutPage.overview.body")}</p>
        </div>
      </SectionContainer>

      <SectionContainer title={t("aboutPage.vision.title")}>
        <div className="card-shell">
          <div className="card-header">
            <span className="card-icon"><Target size={20} /></span>
            <h3 className="card-title">{t("aboutPage.vision.title")}</h3>
          </div>
          <p className="card-description">{t("aboutPage.vision.body")}</p>
        </div>
      </SectionContainer>

      <SectionContainer title={t("aboutPage.mission.title")}>
        <div className="card-shell">
          <div className="card-header">
            <span className="card-icon"><Target size={20} /></span>
            <h3 className="card-title">{t("aboutPage.mission.title")}</h3>
          </div>
          <p className="card-description">{t("aboutPage.mission.body")}</p>
        </div>
      </SectionContainer>

      <SectionContainer title={t("aboutPage.commitment.title")} subtitle={t("aboutPage.commitment.subtitle")}>
        <div className="card-grid">
          {commitmentItems.map((item) => (
            <Card
              key={item.titleKey}
              title={t(`aboutPage.${item.titleKey}`)}
              description={t(`aboutPage.${item.descriptionKey}`)}
              icon={item.icon}
            />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer title={t("aboutPage.whyChoose.title")} subtitle={t("aboutPage.whyChoose.subtitle")}>
        <div className="card-grid">
          {whyChooseItems.map((item) => (
            <Card
              key={item.titleKey}
              title={t(`aboutPage.${item.titleKey}`)}
              description={t(`aboutPage.${item.descriptionKey}`)}
              icon={item.icon}
            />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer title={t("aboutPage.cta.title")} subtitle={t("aboutPage.cta.subtitle")}>
        <div className="card-shell" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="section-subtitle">{t("aboutPage.cta.description")}</p>
          </div>
          <Link to="/contact" className="no-underline">
            <Button>{t("aboutPage.cta.button")}</Button>
          </Link>
        </div>
      </SectionContainer>
    </div>
  );
}
