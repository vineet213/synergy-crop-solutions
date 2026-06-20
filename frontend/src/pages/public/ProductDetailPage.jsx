import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import ProductDetail from "../../components/products/ProductDetail.jsx";
import { useProductBySlug } from "../../hooks/useProducts.js";
import useSEO from "../../hooks/useSEO.js";

export default function ProductDetailPage() {
  const { t } = useTranslation("products");
  const { slug } = useParams();
  const { product, loading, error } = useProductBySlug(slug);
  useSEO({ title: product ? product.name : "Product Details", description: product?.shortDescription || product?.description, canonical: `/products/${slug}` });

  return (
    <main className="page-container" style={{ padding: "2rem 0" }}>
      <Link
        to="/products"
        className="button-base button-secondary"
        style={{ marginBottom: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
      >
        <ArrowLeft size={18} />
        {t("backToList")}
      </Link>

      <SectionContainer title={t("sectionTitle")} subtitle={t("sectionSubtitle")}>
        {loading ? (
          <div className="loading-placeholder">
            <div className="skeleton-block skeleton-title" />
            <div className="skeleton-block skeleton-line" />
            <div className="skeleton-block skeleton-line short" />
            <div className="skeleton-block skeleton-tag" style={{ marginTop: "1rem" }} />
          </div>
        ) : error ? (
          <div className="empty-state card-shell">
            <h2>{t("errors.generic")}</h2>
            <p>{error}</p>
            <Link to="/products" className="button-base button-primary back-link">
              {t("errors.browseCatalog")}
            </Link>
          </div>
        ) : product ? (
          <>
            <ProductDetail product={product} />
            <Link to="/products" className="back-link button-base button-secondary">
              {t("backToList")}
            </Link>
          </>
        ) : (
          <div className="empty-state card-shell">
            <h2>{t("errors.notFound")}</h2>
            <p>{t("errors.notFoundDesc")}</p>
            <Link to="/products" className="button-base button-primary back-link">
              {t("errors.viewCatalog")}
            </Link>
          </div>
        )}
      </SectionContainer>
    </main>
  );
}
