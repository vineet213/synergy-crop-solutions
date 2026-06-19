import { Link } from "react-router-dom";
import useSEO from "../../hooks/useSEO.js";

export default function NotFoundPage() {
  useSEO({
    title: "404 - Page Not Found",
    description: "The page you are looking for could not be found.",
    canonical: "/404",
  });

  return (
    <main className="page-container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
      <h1
        style={{
          fontSize: "6rem",
          fontWeight: 800,
          color: "#166534",
          lineHeight: 1,
          margin: "0 0 0.5rem",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "#111827",
          margin: "0 0 0.75rem",
        }}
      >
        Page Not Found
      </h2>
      <p
        style={{
          fontSize: "1rem",
          color: "#6b7280",
          maxWidth: "420px",
          margin: "0 auto 2rem",
          lineHeight: 1.6,
        }}
      >
        The page you are looking for does not exist or may have been moved.
      </p>
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
        <Link to="/" className="button-base button-primary">
          Go Home
        </Link>
        <Link to="/products" className="button-base button-secondary">
          Browse Products
        </Link>
      </div>
    </main>
  );
}
