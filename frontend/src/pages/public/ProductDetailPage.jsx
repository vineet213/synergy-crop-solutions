import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProductDetail from "../../components/products/ProductDetail.jsx";
import { useProductBySlug } from "../../hooks/useProducts.js";
import useSEO from "../../hooks/useSEO.js";
import { resolveLocale, textValue } from "../../utils/productHelpers.js";
import { useWebsiteSettings } from "../../context/WebsiteSettingsContext.jsx";

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
  const { t, i18n } = useTranslation("products");
  const { slug } = useParams();
  const { product, loading, error } = useProductBySlug(slug);
  const locale = i18n.language || "en";
  const { settings } = useWebsiteSettings();
  const companyName = settings?.company?.name || "";
  useSEO({
    title: resolveLocale(product?.metadata?.seo?.title, locale)?.replace(` | ${companyName}`, "") || resolveLocale(product?.name, locale) || t("title"),
    description: resolveLocale(product?.metadata?.seo?.description, locale) || resolveLocale(product?.shortDescription, locale) || textValue(product?.description),
    keywords: Array.isArray(product?.metadata?.seo?.keywords) ? product.metadata.seo.keywords.join(", ") : undefined,
    canonical: `/products/${slug}`
  });

  return (
    <main className="page-container pd-page">
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
