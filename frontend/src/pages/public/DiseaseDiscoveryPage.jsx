import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import diseaseService from "../../services/diseaseService.js";
import useSEO from "../../hooks/useSEO.js";

export default function DiseaseDiscoveryPage() {
  const { t } = useTranslation("common");
  useSEO({ title: t("page.diseaseDiscovery.title"), description: t("page.diseaseDiscovery.description"), canonical: "/diseases" });
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    diseaseService.getPublicDiseases()
      .then(setDiseases)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <SectionContainer title={t("page.diseaseDiscovery.title")} subtitle={t("page.diseaseDiscovery.subtitle")}>
        <p className="card-description">
          {t("page.diseaseDiscovery.description")}
        </p>
        {loading ? (
          <p>{t("page.diseaseDiscovery.loading")}</p>
        ) : diseases.length === 0 ? (
          <p>{t("page.diseaseDiscovery.empty")}</p>
        ) : (
          <div className="discover-grid" style={{ marginTop: "1.5rem" }}>
            {diseases.map((disease) => (
              <Link key={disease._id} to={`/diseases/${disease._id}`} className="no-underline">
                <Card
                  title={disease.name}
                  description={disease.description || t("page.diseaseDiscovery.fallback")}
                />
              </Link>
            ))}
          </div>
        )}
      </SectionContainer>
    </div>
  );
}
