import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProductDetail from "../../components/products/ProductDetail.jsx";
import { useProductBySlug } from "../../hooks/useProducts.js";
import useSEO from "../../hooks/useSEO.js";

export default function ProductDetailPage() {
  const { t } = useTranslation("products");
  const { slug } = useParams();
  const { product, loading, error } = useProductBySlug(slug);
  useSEO({ title: product ? product.name : "Product Details", description: product?.shortDescription || product?.description, canonical: `/products/${slug}` });

  return (
    <main className="page-container pd-page">
      <Link to="/products" className="pd-back-link">
        <ArrowLeft size={18} />
        {t("backToList")}
      </Link>

      {loading ? (
        <div className="pd-loading">
          <div className="pd-skeleton pd-skel-title" />
          <div className="pd-skeleton pd-skel-line" />
          <div className="pd-skeleton pd-skel-line short" />
          <div className="pd-skeleton pd-skel-tag" />
        </div>
      ) : error ? (
        <div className="pd-error">
          <h2>{t("errors.generic")}</h2>
          <p>{error}</p>
          <Link to="/products" className="button-base button-primary">{t("errors.browseCatalog")}</Link>
        </div>
      ) : product ? (
        <ProductDetail product={product} />
      ) : (
        <div className="pd-notfound">
          <h2>{t("errors.notFound")}</h2>
          <p>{t("errors.notFoundDesc")}</p>
          <Link to="/products" className="button-base button-primary">{t("errors.viewCatalog")}</Link>
        </div>
      )}
    </main>
  );
}
