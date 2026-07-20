import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import Badge from "../../components/ui/Badge.jsx";
import cropService from "../../services/cropService.js";
import { formatCategory } from "../../utils/formatters.js";
import { textValue } from "../../utils/productHelpers.js";

export default function CropDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation(["common", "home", "products"]);
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    cropService.getPublicCrop(id)
      .then(setCrop)
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
          <h2>{t("common:page.cropDetail.failed")}</h2>
          <p>{error}</p>
          <Link to="/crops" className="button-base button-primary">{t("common:page.cropDetail.back")}</Link>
        </div>
      </main>
    );
  }

  if (!crop) {
    return (
      <main className="page-container" style={{ padding: "2rem 0" }}>
        <div className="empty-state card-shell">
          <h2>{t("common:page.cropDetail.notFound")}</h2>
          <p>{t("common:page.cropDetail.notFoundMessage")}</p>
          <Link to="/crops" className="button-base button-primary">{t("common:page.cropDetail.back")}</Link>
        </div>
      </main>
    );
  }

  const activeProducts = (crop.products || []).filter((p) => p.status === "published");

  return (
    <main className="page-container" style={{ padding: "2rem 0" }}>
      <Link
        to="/crops"
        className="button-base button-secondary"
        style={{ marginBottom: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
      >
        <ArrowLeft size={18} />
        {t("common:page.cropDetail.back")}
      </Link>

      <SectionContainer title={crop.name} subtitle={t("common:page.cropDetail.info")}>
        {crop.imageUrl && (
          <img src={crop.imageUrl} alt={crop.name} style={{ maxWidth: "100%", borderRadius: "0.5rem", marginBottom: "1rem" }} />
        )}
        <p>{textValue(crop.description) || t("common:page.cropDetail.noDescription")}</p>
      </SectionContainer>

      <SectionContainer title={t("common:page.cropDetail.relatedProducts")} subtitle={`${activeProducts.length} ${t("common:page.cropDetail.productsAvailable")}`}>
        {activeProducts.length === 0 ? (
          <p>{t("common:page.cropDetail.noProducts")}</p>
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
                      {product.price ? `₹${product.price}` : t("common:page.cropDetail.contactForPrice")}
                    </p>
                  </div>
                  <Link to={`/products/${product.slug}`} className="button-base button-primary button-small">
                    {t("common:page.cropDetail.viewDetails")}
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
