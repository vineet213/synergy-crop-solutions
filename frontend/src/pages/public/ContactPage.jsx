import Button from "../../components/ui/Button.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";

export default function ContactPage() {
  return (
    <div className="page-container">
      <SectionContainer title="Contact" subtitle="Start your next agricultural partnership">
        <div className="card-shell" style={{ padding: "2rem" }}>
          <p className="card-description">Our team is ready to help you build a more resilient and profitable crop program. Reach out for an introductory consultation.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
            <p><strong>Email:</strong> hello@synergycrops.com</p>
            <p><strong>Phone:</strong> +1 (555) 010-2024</p>
            <Button>Request a quote</Button>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
