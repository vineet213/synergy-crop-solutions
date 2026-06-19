import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Leaf, ShieldCheck, MapPin, Sparkles, Truck } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import testimonialService from "../../services/testimonialService.js";
import certificationService from "../../services/certificationService.js";
import cropService from "../../services/cropService.js";
import diseaseService from "../../services/diseaseService.js";

const categories = [
  { title: "Seeds & Nutrition", description: "High-yield seed varieties and custom nutrient plans.", icon: <Leaf size={20} /> },
  { title: "Field Protection", description: "Precision disease and pest protection strategies.", icon: <ShieldCheck size={20} /> },
  { title: "Supply Chain", description: "Distribution solutions from farm to market.", icon: <Truck size={20} /> },
];

export default function HomePage() {
  const { t } = useTranslation("home");
  const [testimonials, setTestimonials] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [crops, setCrops] = useState([]);
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    testimonialService.getPublicTestimonials()
      .then(setTestimonials)
      .catch(console.error);
  }, []);

  useEffect(() => {
    certificationService.getPublicCertifications()
      .then(setCertifications)
      .catch(console.error);
  }, []);

  useEffect(() => {
    cropService.getPublicCrops()
      .then(setCrops)
      .catch(console.error);
  }, []);

  useEffect(() => {
    diseaseService.getPublicDiseases()
      .then(setDiseases)
      .catch(console.error);
  }, []);

  return (
    <div>
      <section className="hero-panel page-container">
        <div className="hero-copy">
          <Badge variant="brand">{t("hero.badge")}</Badge>
          <h1 className="hero-title">{t("hero.title")}</h1>
          <p className="hero-text">{t("hero.subtitle")}</p>
          <div className="hero-actions">
            <Button>{t("common:cta.exploreSolutions")}</Button>
            <Button variant="secondary">{t("common:cta.viewOurStory")}</Button>
          </div>
          <div className="hero-quote">
            <p><strong>{t("hero.quote")}</strong></p>
          </div>
        </div>
        <div className="hero-visual">
          <p>{t("hero.visual")}</p>
        </div>
      </section>

      <SectionContainer title="Our focused capabilities" subtitle="Built for modern agriculture">
        <div className="card-grid">
          {categories.map((item) => (
            <Card key={item.title} title={item.title} description={item.description} icon={item.icon} />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer title="Browse by Crop" subtitle="Find the right products for your field">
        {crops.length === 0 ? (
          <p>No crops available yet.</p>
        ) : (
          <div className="discover-grid">
            {crops.map((crop) => (
              <Link key={crop._id} to={`/crops/${crop._id}`} className="no-underline">
                <Card
                  title={crop.name}
                  description={crop.description || "Discover products for this crop."}
                />
              </Link>
            ))}
          </div>
        )}
      </SectionContainer>

      <SectionContainer title="Browse by Disease" subtitle="Protect crops with smarter decisions">
        {diseases.length === 0 ? (
          <p>No diseases available yet.</p>
        ) : (
          <div className="discover-grid">
            {diseases.map((disease) => (
              <Link key={disease._id} to={`/diseases/${disease._id}`} className="no-underline">
                <Card
                  title={disease.name}
                  description={disease.description || "Discover products for this disease."}
                />
              </Link>
            ))}
          </div>
        )}
      </SectionContainer>

      <SectionContainer title="Certifications" subtitle="Trusted standards for every field">
        <div className="card-grid">
          {certifications.length === 0 ? (
            <p>No certifications yet.</p>
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

      <SectionContainer title="Distributor Locator" subtitle="Connect with trusted supply partners">
        <div className="card-shell">
          <div className="card-header">
            <span className="card-icon"><MapPin size={20} /></span>
            <h3 className="card-title">Local distribution coverage</h3>
          </div>
          <p className="card-description">Find certified distributors and supply partners near your farm with a single search.</p>
          <div style={{ marginTop: "1.5rem" }}>
            <Button variant="secondary">{t("common:cta.visitLocator")}</Button>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer title="What growers say" subtitle="Real results from field leaders">
        <div className="testimonials-grid">
          {testimonials.length === 0 ? (
            <p>No testimonials yet.</p>
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

      <SectionContainer title="Ready to grow with confidence?" subtitle="Partner with Synergy Crop Solutions">
        <div className="card-shell" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="section-subtitle">Actionable agriculture</p>
            <h2 className="section-title" style={{ fontSize: "2rem" }}>Build smarter crop strategies today.</h2>
          </div>
          <Button>{t("common:cta.contactOurTeam")}</Button>
        </div>
      </SectionContainer>
    </div>
  );
}
