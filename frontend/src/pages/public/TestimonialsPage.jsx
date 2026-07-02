import { useTranslation } from "react-i18next";
import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import useSEO from "../../hooks/useSEO.js";
import { usePublicTestimonials } from "../../hooks/useTestimonials.js";

export default function TestimonialsPage() {
  useSEO({ title: "Testimonials", description: "Read real results from field leaders. See how Synergy Crop Solutions helps growers improve yield, reduce waste, and scale sustainably.", canonical: "/testimonials" });
  const { t } = useTranslation("testimonials");
  const { testimonials, loading, error } = usePublicTestimonials();

  return (
    <div className="page-container">
      <SectionContainer title={t("page.title")} subtitle={t("page.subtitle")}>
        {loading ? (
          <div className="testimonials-grid">
            {[...Array(2)].map((_, i) => (
              <Card key={i} className="product-skeleton">
                <div className="skeleton-block skeleton-title" />
                <div className="skeleton-block skeleton-line" />
                <div className="skeleton-block skeleton-line short" />
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="empty-state card-shell">
            <h2>{t("page.loadError") || "Failed to load testimonials"}</h2>
            <p>{error}</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="empty-state card-shell">
            <h2>{t("page.empty")}</h2>
          </div>
        ) : (
          <div className="testimonials-grid">
            {testimonials.map((item) => (
              <Card
                key={item._id}
                title={item.customerName}
                description={`${item.testimonial}${item.location ? ` — ${item.location}` : ""}${item.rating ? ` ${"★".repeat(item.rating)}${"☆".repeat(5 - item.rating)}` : ""}`}
              />
            ))}
          </div>
        )}
      </SectionContainer>
    </div>
  );
}
