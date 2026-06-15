import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";

const checks = [
  { title: "Field diagnostics", description: "Pinpoint disease pressure across the operation." },
  { title: "Treatment guidance", description: "Receive clear next-step recommendations." },
  { title: "Healthy crops", description: "Reduce loss and protect yields with early action." },
];

export default function DiseaseDiscoveryPage() {
  return (
    <div className="page-container">
      <SectionContainer title="Disease Discovery" subtitle="Prevent crop loss before it spreads">
        <div className="discover-grid">
          {checks.map((item) => (
            <Card key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
