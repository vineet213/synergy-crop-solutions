import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";

const reviews = [
  { title: "Ava Green", description: "The team helped us scale with confidence. Our fields have never looked better." },
  { title: "Noah Rivera", description: "Reliable distributor connections and insightful crop guidance made all the difference." },
  { title: "Elena Chen", description: "We finally have a clean, professional way to manage crop protection across our acreage." },
];

export default function TestimonialsPage() {
  return (
    <div className="page-container">
      <SectionContainer title="Testimonials" subtitle="Grower stories and results">
        <div className="testimonials-grid">
          {reviews.map((item) => (
            <Card key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
