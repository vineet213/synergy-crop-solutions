import SectionContainer from "../../components/ui/SectionContainer.jsx";
import ContactForm from "../../components/leads/ContactForm.jsx";

export default function ContactPage() {
  return (
    <main className="page-container" style={{ padding: "2rem 0" }}>
      <SectionContainer title="Contact Us" subtitle="Start your next agricultural partnership">
        <p className="product-intro-copy">
          Our team is ready to help you build a more resilient and profitable crop program.
          Reach out for an introductory consultation.
        </p>
        <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          <ContactForm />
          <div className="card-shell" style={{ padding: "2rem", alignSelf: "start" }}>
            <h3 style={{ margin: "0 0 1rem" }}>Other ways to reach us</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <p style={{ margin: 0 }}><strong>Email:</strong> hello@synergycrops.com</p>
              <p style={{ margin: 0 }}><strong>Phone:</strong> +1 (555) 010-2024</p>
              <p style={{ margin: 0 }}><strong>Office:</strong> Nagpur, Maharashtra, India</p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
