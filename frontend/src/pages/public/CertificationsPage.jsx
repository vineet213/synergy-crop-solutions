import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";

const certs = [
  { title: "Quality Assurance", description: "Certified processes for reliable crop performance." },
  { title: "Sustainable Practices", description: "Proven methods that prioritize environmental care." },
  { title: "Traceability", description: "Transparent tracking from field to delivery." },
];

export default function CertificationsPage() {
  return (
    <div className="page-container">
      <SectionContainer title="Certifications" subtitle="Trusted standards for every field">
        <div className="card-grid">
          {certs.map((item) => (
            <Card key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
