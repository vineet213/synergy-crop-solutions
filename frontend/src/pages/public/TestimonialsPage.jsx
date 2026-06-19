import { useEffect, useState } from "react";
import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import testimonialService from "../../services/testimonialService.js";
import useSEO from "../../hooks/useSEO.js";

export default function TestimonialsPage() {
  useSEO({ title: "Testimonials", description: "Read real results from field leaders. See how Synergy Crop Solutions helps growers improve yield, reduce waste, and scale sustainably.", canonical: "/testimonials" });
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testimonialService.getPublicTestimonials()
      .then(setTestimonials)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <SectionContainer title="Testimonials" subtitle="Grower stories and results">
        {loading ? (
          <p>Loading&hellip;</p>
        ) : testimonials.length === 0 ? (
          <p>No testimonials yet.</p>
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
