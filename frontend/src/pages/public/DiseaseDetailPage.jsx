import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import Badge from "../../components/ui/Badge.jsx";
import diseaseService from "../../services/diseaseService.js";
import { formatCategory } from "../../utils/formatters.js";
import { textValue } from "../../utils/productHelpers.js";

export default function DiseaseDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation(["common", "home", "products"]);
  const [disease, setDisease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    diseaseService.getPublicDisease(id)
      .then(setDisease)
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="page-container" style={{ padding: "2rem 0" }}>
        <p>{t("common:loading")}</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container" style={{ padding: "2rem 0" }}>
        <div className="empty-state card-shell">
          <h2>{t("common:page.diseaseDetail.failed")}</h2>
          <p>{error}</p>
          <Link to="/diseases" className="button-base button-primary">{t("common:page.diseaseDetail.back")}</Link>
        </div>
      </main>
    );
  }

  if (!disease) {
    return (
      <main className="page-container" style={{ padding: "2rem 0" }}>
        <div className="empty-state card-shell">
          <h2>{t("common:page.diseaseDetail.notFound")}</h2>
          <p>{t("common:page.diseaseDetail.notFoundMessage")}</p>
          <Link to="/diseases" className="button-base button-primary">{t("common:page.diseaseDetail.back")}</Link>
        </div>
      </main>
    );
  }

  const activeProducts = (disease.products || []).filter((p) => p.status === "published");

  return (
    <main className="page-container" style={{ padding: "2rem 0" }}>
      <Link
        to="/diseases"
        className="button-base button-secondary"
        style={{ marginBottom: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
      >
        <ArrowLeft size={18} />
        {t("common:page.diseaseDetail.back")}
      </Link>

      <SectionContainer title={disease.name} subtitle={t("common:page.diseaseDetail.info")}>
        {disease.description && <p>{textValue(disease.description)}</p>}
        {disease.symptoms && (
          <div style={{ marginTop: "1rem" }}>
            <h3 className="font-semibold">{t("common:page.diseaseDetail.symptoms")}</h3>
            <p>{textValue(disease.symptoms)}</p>
          </div>
        )}
      </SectionContainer>

      <SectionContainer title={t("common:page.diseaseDetail.relatedProducts")} subtitle={`${activeProducts.length} ${t("common:page.diseaseDetail.productsAvailable")}`}>
        {activeProducts.length === 0 ? (
          <p>{t("common:page.diseaseDetail.noProducts")}</p>
        ) : (
          <div className="product-grid">
            {activeProducts.map((product) => (
              <Card key={product._id} className="product-card">
                <div className="product-card-head">
                  <Badge variant="soft">{formatCategory(product.category, t)}</Badge>
                  <h3 className="product-card-title">{textValue(product.name)}</h3>
                </div>
                <div className="product-card-body">
                  <p className="product-card-lead">{textValue(product.description)}</p>
                </div>
                <div className="product-card-footer">
                  <div>
                    <p className="product-price">
                      {product.price ? `₹${product.price}` : t("common:page.diseaseDetail.contactForPrice")}
                    </p>
                  </div>
                  <Link to={`/products/${product.slug}`} className="button-base button-primary button-small">
                    {t("common:page.diseaseDetail.viewDetails")}
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </SectionContainer>
    </main>
  );
}
