import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";

const steps = [
  { title: "Assess soil profile", description: "Understand nutrient needs across every acre." },
  { title: "Recommend varieties", description: "Select crop varieties suited to your field." },
  { title: "Monitor progress", description: "Track development with a modern dashboard." },
];

export default function CropDiscoveryPage() {
  return (
    <div className="page-container">
      <SectionContainer title="Crop Discovery" subtitle="Responsive crop planning for growers">
        <p className="card-description">Our crop discovery workflow helps farmers choose the best crop plan with confidence and clarity.</p>
        <div className="discover-grid" style={{ marginTop: "1.5rem" }}>
          {steps.map((item) => (
            <Card key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
