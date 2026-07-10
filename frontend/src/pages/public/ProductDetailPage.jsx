import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProductDetail from "../../components/products/ProductDetail.jsx";
import { useProductBySlug } from "../../hooks/useProducts.js";
import useSEO from "../../hooks/useSEO.js";

function Skeleton() {
  return (
    <div>
      <div className="pd-skeleton pd-skel-title" style={{ marginBottom: "1rem" }} />
      <div className="pd-skeleton" style={{ height: "340px", borderRadius: "var(--radius-lg)", marginBottom: "1rem" }} />
      <div className="pd-skeleton pd-skel-line" />
      <div className="pd-skeleton pd-skel-line short" />
    </div>
  );
}

export default function ProductDetailPage() {
  const { t } = useTranslation("products");
  const { slug } = useParams();
  const { product, loading, error } = useProductBySlug(slug);
  useSEO({ title: product ? product.name : "Product Details", description: product?.shortDescription || product?.description, canonical: `/products/${slug}` });

  return (
    <main className="page-container pd-page" style={{ paddingBottom: "4rem" }}>
      <Link to="/products" className="pd-back-link">
        <ArrowLeft size={18} />
        {t("backToList")}
      </Link>

      {loading ? (
        <Skeleton />
      ) : error ? (
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <h2 style={{ margin: "0 0 0.5rem", color: "var(--text)" }}>{t("errors.generic")}</h2>
          <p style={{ margin: "0 0 1.5rem", color: "var(--text-muted)" }}>{error}</p>
          <Link to="/products" className="button-base button-primary">{t("errors.browseCatalog")}</Link>
        </div>
      ) : product ? (
        <ProductDetail product={product} />
      ) : (
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <h2 style={{ margin: "0 0 0.5rem", color: "var(--text)" }}>{t("errors.notFound")}</h2>
          <p style={{ margin: "0 0 1.5rem", color: "var(--text-muted)" }}>{t("errors.notFoundDesc")}</p>
          <Link to="/products" className="button-base button-primary">{t("errors.viewCatalog")}</Link>
        </div>
      )}
    </main>
  );
}
