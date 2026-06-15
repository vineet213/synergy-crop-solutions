import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";

const products = [
  { title: "Digital Seed Planning", description: "Precision planning tools for every season." },
  { title: "Crop Health Insights", description: "Spot plant stress early and stay ahead of yield risks." },
  { title: "Distribution Network", description: "Fast access to trusted local distributors." },
];

export default function ProductsPage() {
  return (
    <div className="page-container">
      <SectionContainer title="Products" subtitle="Solutions designed for modern farming">
        <div className="highlight-grid">
          {products.map((product) => (
            <Card key={product.title} title={product.title} description={product.description} />
          ))}
        </div>
      </SectionContainer>
      <div className="card-shell" style={{ marginTop: "2rem" }}>
        <h3 className="card-title">Integrated crop services</h3>
        <p className="card-description">Our product suite supports every growth stage, from seed selection to harvest logistics.</p>
        <Button>Learn about our offering</Button>
      </div>
    </div>
  );
}
