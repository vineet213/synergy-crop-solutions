import Button from "../../components/ui/Button.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";

export default function DistributorLocatorPage() {
  return (
    <div className="page-container">
      <SectionContainer title="Distributor Locator" subtitle="Find trusted partners near you">
        <p className="card-description">Locate certified distributors and manage your supply chain with confidence. Our network is built for timely support, reliable inventory, and field-ready delivery.</p>
        <div className="card-shell" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card-title">Search by region</div>
          <p className="card-description">Select your region and connect with a regional distributor partner.</p>
          <Button>View distribution map</Button>
        </div>
      </SectionContainer>
    </div>
  );
}
