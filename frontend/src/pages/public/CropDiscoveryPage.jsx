import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import cropService from "../../services/cropService.js";
import useSEO from "../../hooks/useSEO.js";

export default function CropDiscoveryPage() {
  const { t } = useTranslation("common");
  useSEO({ title: t("page.cropDiscovery.title"), description: t("page.cropDiscovery.description"), canonical: "/crops" });
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cropService.getPublicCrops()
      .then(setCrops)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <SectionContainer title={t("page.cropDiscovery.title")} subtitle={t("page.cropDiscovery.subtitle")}>
        <p className="card-description">
          {t("page.cropDiscovery.description")}
        </p>
        {loading ? (
          <p>{t("page.cropDiscovery.loading")}</p>
        ) : crops.length === 0 ? (
          <p>{t("page.cropDiscovery.empty")}</p>
        ) : (
          <div className="discover-grid" style={{ marginTop: "1.5rem" }}>
            {crops.map((crop) => (
              <Link key={crop._id} to={`/crops/${crop._id}`} className="no-underline">
                <Card
                  title={crop.name}
                  description={crop.description || t("page.cropDiscovery.fallback")}
                />
              </Link>
            ))}
          </div>
        )}
      </SectionContainer>
    </div>
  );
}
