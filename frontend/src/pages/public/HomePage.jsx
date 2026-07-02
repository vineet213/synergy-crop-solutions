import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Leaf, ShieldCheck, MapPin, Sparkles, Sprout, Droplets } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import testimonialService from "../../services/testimonialService.js";
import certificationService from "../../services/certificationService.js";
import cropService from "../../services/cropService.js";
import diseaseService from "../../services/diseaseService.js";
import useSEO from "../../hooks/useSEO.js";

const categories = [
  { title: "Bio Fertilizers", description: "Advanced bio-based nutrient solutions that enrich soil health and boost crop yields naturally.", icon: <Sprout size={20} /> },
  { title: "Bio Pesticides", description: "Effective residue-free pest and disease control products derived from natural sources.", icon: <ShieldCheck size={20} /> },
  { title: "Consortia Products", description: "Synergistic microbial consortia for enhanced soil fertility, plant growth, and stress tolerance.", icon: <Sparkles size={20} /> },
  { title: "Liquid Nutrition", description: "Ready-to-use liquid formulations for targeted nutrient delivery and rapid crop response.", icon: <Droplets size={20} /> },
  { title: "Organic Inputs", description: "Certified organic soil amendments and natural inputs for sustainable farming systems.", icon: <Leaf size={20} /> },
];

export default function HomePage() {
  useSEO({ canonical: "/" });
  const { t } = useTranslation("home");
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [crops, setCrops] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState({ testimonials: true, certifications: true, crops: true, diseases: true });

  useEffect(() => {
    testimonialService.getPublicTestimonials()
      .then(setTestimonials)
      .catch(console.error)
      .finally(() => setLoading((prev) => ({ ...prev, testimonials: false })));
  }, []);

  useEffect(() => {
    certificationService.getPublicCertifications()
      .then(setCertifications)
      .catch(console.error)
      .finally(() => setLoading((prev) => ({ ...prev, certifications: false })));
  }, []);

  useEffect(() => {
    cropService.getPublicCrops()
      .then(setCrops)
      .catch(console.error)
      .finally(() => setLoading((prev) => ({ ...prev, crops: false })));
  }, []);

  useEffect(() => {
    diseaseService.getPublicDiseases()
      .then(setDiseases)
      .catch(console.error)
      .finally(() => setLoading((prev) => ({ ...prev, diseases: false })));
  }, []);

  return (
    <div>
      <section className="hero-panel page-container">
        <div className="hero-copy">
          <Badge variant="brand">{t("hero.badge")}</Badge>
          <h1 className="hero-title">{t("hero.title")}</h1>
          <p className="hero-text">{t("hero.subtitle")}</p>
          <div className="hero-actions">
            <Button onClick={() => navigate("/products")}>{t("common:cta.exploreSolutions")}</Button>
            <Button variant="secondary" onClick={() => navigate("/about")}>{t("common:cta.viewOurStory")}</Button>
          </div>
          <div className="hero-quote">
            <p><strong>{t("hero.quote")}</strong></p>
          </div>
        </div>
        <div className="hero-visual">
          <p>{t("hero.visual")}</p>
        </div>
      </section>

      <SectionContainer title={t("sections.capabilities.title")} subtitle={t("sections.capabilities.subtitle")}>
        <div className="card-grid">
          {categories.map((item) => (
            <Card key={item.title} title={item.title} description={item.description} icon={item.icon} />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer title={t("vision.title")} subtitle={t("mission.title")}>
        <div className="card-shell">
          <p>{t("vision.statement")}</p>
          <p>{t("mission.statement")}</p>
        </div>
      </SectionContainer>

      <SectionContainer title={t("sections.crops.title")} subtitle={t("sections.crops.subtitle")}>
        {loading.crops ? (
          <div className="discover-grid">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="product-skeleton">
                <div className="skeleton-block skeleton-title" />
                <div className="skeleton-block skeleton-line" />
                <div className="skeleton-block skeleton-line short" />
              </Card>
            ))}
          </div>
        ) : crops.length === 0 ? (
          <p>{t("sections.crops.empty")}</p>
        ) : (
          <div className="discover-grid">
            {crops.map((crop) => (
              <Link key={crop._id} to={`/crops/${crop._id}`} className="no-underline">
                <Card
                  title={crop.name}
                  description={crop.description || t("sections.crops.fallback")}
                />
              </Link>
            ))}
          </div>
        )}
      </SectionContainer>

      <SectionContainer title={t("sections.diseases.title")} subtitle={t("sections.diseases.subtitle")}>
        {loading.diseases ? (
          <div className="discover-grid">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="product-skeleton">
                <div className="skeleton-block skeleton-title" />
                <div className="skeleton-block skeleton-line" />
                <div className="skeleton-block skeleton-line short" />
              </Card>
            ))}
          </div>
        ) : diseases.length === 0 ? (
          <p>{t("sections.diseases.empty")}</p>
        ) : (
          <div className="discover-grid">
            {diseases.map((disease) => (
              <Link key={disease._id} to={`/diseases/${disease._id}`} className="no-underline">
                <Card
                  title={disease.name}
                  description={disease.description || t("sections.diseases.fallback")}
                />
              </Link>
            ))}
          </div>
        )}
      </SectionContainer>

      <SectionContainer title={t("sections.certifications.title")} subtitle={t("sections.certifications.subtitle")}>
        <div className="card-grid">
          {loading.certifications ? (
            <div className="card-grid">
              {[...Array(2)].map((_, i) => (
                <Card key={i} className="product-skeleton">
                  <div className="skeleton-block skeleton-title" />
                  <div className="skeleton-block skeleton-line" />
                  <div className="skeleton-block skeleton-line short" />
                </Card>
              ))}
            </div>
          ) : certifications.length === 0 ? (
            <p>{t("sections.certifications.empty")}</p>
          ) : (
            certifications.map((item) => (
              <Card
                key={item._id}
                title={item.title}
                description={`${item.description || ""}${item.issuingAuthority ? ` — ${item.issuingAuthority}` : ""}`}
              />
            ))
          )}
        </div>
      </SectionContainer>

      <SectionContainer title={t("sections.distributors.title")} subtitle={t("sections.distributors.subtitle")}>
        <div className="card-shell">
          <div className="card-header">
            <span className="card-icon"><MapPin size={20} /></span>
            <h3 className="card-title">{t("sections.distributors.cardTitle")}</h3>
          </div>
          <p className="card-description">{t("sections.distributors.cardDesc")}</p>
          <div style={{ marginTop: "1.5rem" }}>
            <Button variant="secondary" onClick={() => navigate("/distributors")}>{t("common:cta.visitLocator")}</Button>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer title={t("sections.testimonials.title")} subtitle={t("sections.testimonials.subtitle")}>
        <div className="testimonials-grid">
          {loading.testimonials ? (
            <div className="testimonials-grid">
              {[...Array(2)].map((_, i) => (
                <Card key={i} className="product-skeleton">
                  <div className="skeleton-block skeleton-title" />
                  <div className="skeleton-block skeleton-line" />
                  <div className="skeleton-block skeleton-line short" />
                </Card>
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <p>{t("sections.testimonials.empty")}</p>
          ) : (
            testimonials.map((item) => (
              <Card
                key={item._id}
                title={item.customerName}
                description={`${item.testimonial}${item.location ? ` — ${item.location}` : ""}${item.rating ? ` ${"★".repeat(item.rating)}${"☆".repeat(5 - item.rating)}` : ""}`}
              />
            ))
          )}
        </div>
      </SectionContainer>

      <SectionContainer title={t("sections.cta.title")} subtitle={t("sections.cta.subtitle")}>
        <div className="card-shell" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="section-subtitle">{t("sections.cta.tagline")}</p>
            <h2 className="section-title" style={{ fontSize: "2rem" }}>{t("sections.cta.headline")}</h2>
          </div>
          <Button onClick={() => navigate("/contact")}>{t("common:cta.contactOurTeam")}</Button>
        </div>
      </SectionContainer>
    </div>
  );
}
