import { useTranslation } from "react-i18next";
import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import useSEO from "../../hooks/useSEO.js";
import { usePublicCertifications } from "../../hooks/useCertifications.js";

const DEFAULT_IMAGE = "/client-assets/default-cert.png";

export default function CertificationsPage() {
  useSEO({ title: "Certifications", description: "Trusted standards for every field. View our certifications including quality assurance, sustainable practices, and traceability credentials.", canonical: "/certifications" });
  const { t } = useTranslation("certifications");
  const { certifications, loading, error } = usePublicCertifications();

  return (
    <div className="page-container">
      <SectionContainer title={t("page.title")} subtitle={t("page.subtitle")}>
        {loading ? (
          <p>{t("page.loading")}</p>
        ) : error ? (
          <p>{error}</p>
        ) : certifications.length === 0 ? (
          <p>{t("page.empty")}</p>
        ) : (
          <div className="card-grid">
            {certifications.map((item) => (
              <Card key={item._id} title={item.title}>
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{ width: "100%", maxHeight: 200, objectFit: "contain", marginBottom: "0.75rem" }}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                )}
                {item.description && <p>{item.description}</p>}
                {item.issuingAuthority && (
                  <p style={{ fontSize: "0.875rem", color: "var(--c-text-secondary)", marginTop: "0.5rem" }}>
                    {item.issuingAuthority}
                  </p>
                )}
              </Card>
            ))}
          </div>
        )}
      </SectionContainer>
    </div>
  );
}
