import { useTranslation } from "react-i18next";
import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import useSEO from "../../hooks/useSEO.js";
import { usePublicCertifications } from "../../hooks/useCertifications.js";
import { textValue } from "../../utils/productHelpers.js";

const DEFAULT_IMAGE = "/client-assets/default-cert.png";

export default function CertificationsPage() {
  const { t } = useTranslation("certifications");
  useSEO({ title: t("page.title"), description: t("page.description"), canonical: "/certifications" });
  const { certifications, loading, error } = usePublicCertifications();

  return (
    <div className="page-container">
      <SectionContainer title={t("page.title")} subtitle={t("page.subtitle")}>
        {loading ? (
          <div className="card-grid">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="product-skeleton">
                <div className="skeleton-block skeleton-title" />
                <div className="skeleton-block skeleton-line" />
                <div className="skeleton-block skeleton-line short" />
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="empty-state card-shell">
            <h2>{t("page.loadError") || "Failed to load certifications"}</h2>
            <p>{error}</p>
          </div>
        ) : certifications.length === 0 ? (
          <div className="empty-state card-shell">
            <h2>{t("page.empty")}</h2>
          </div>
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
                {item.description && <p>{textValue(item.description)}</p>}
                {item.issuingAuthority && (
                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                    {textValue(item.issuingAuthority)}
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
