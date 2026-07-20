import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useSEO from "../../hooks/useSEO.js";

export default function NotFoundPage() {
  const { t } = useTranslation("common");
  useSEO({
    title: `404 - ${t("page.notFound.title")}`,
    description: t("page.notFound.message"),
    canonical: "/404",
  });

  return (
    <main className="page-container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
      <h1
        style={{
          fontSize: "clamp(3rem, 12vw, 6rem)",
          fontWeight: 800,
          color: "var(--brand-dark)",
          lineHeight: 1,
          margin: "0 0 0.5rem",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "clamp(1.1rem, 4vw, 1.5rem)",
          fontWeight: 600,
          color: "var(--text)",
          margin: "0 0 0.75rem",
        }}
      >
        {t("page.notFound.title")}
      </h2>
      <p
        style={{
          fontSize: "1rem",
          color: "var(--text-muted)",
          maxWidth: "420px",
          margin: "0 auto 2rem",
          lineHeight: 1.6,
        }}
      >
        {t("page.notFound.message")}
      </p>
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
        <Link to="/" className="button-base button-primary">
          {t("page.notFound.goHome")}
        </Link>
        <Link to="/products" className="button-base button-secondary">
          {t("page.notFound.browseProducts")}
        </Link>
      </div>
    </main>
  );
}
