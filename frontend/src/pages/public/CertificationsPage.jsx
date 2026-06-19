import { useEffect, useState } from "react";
import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import certificationService from "../../services/certificationService.js";

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    certificationService.getPublicCertifications()
      .then(setCertifications)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <SectionContainer title="Certifications" subtitle="Trusted standards for every field">
        {loading ? (
          <p>Loading&hellip;</p>
        ) : certifications.length === 0 ? (
          <p>No certifications yet.</p>
        ) : (
          <div className="card-grid">
            {certifications.map((item) => (
              <Card
                key={item._id}
                title={item.title}
                description={`${item.description || ""}${item.issuingAuthority ? ` — ${item.issuingAuthority}` : ""}`}
              />
            ))}
          </div>
        )}
      </SectionContainer>
    </div>
  );
}
