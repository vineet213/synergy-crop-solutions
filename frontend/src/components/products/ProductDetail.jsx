import { useTranslation } from "react-i18next";
import Badge from "../ui/Badge.jsx";
import Card from "../ui/Card.jsx";

export default function ProductDetail({ product }) {
  const { t } = useTranslation("products");

  return (
    <div className="product-detail-shell">
      <div className="product-detail-summary">
        <Badge variant="brand">{product.category}</Badge>
        <h1>{product.name}</h1>
        {product.description && <p className="product-detail-lead">{product.description}</p>}
        <div className="product-detail-meta">
          <div>
            <p className="muted-label">{t("detail.price")}</p>
            <strong>{product.price ? `₹${product.price}` : t("contactForPrice")}</strong>
          </div>
          <div>
            <p className="muted-label">{t("detail.category")}</p>
            <strong>{product.category}</strong>
          </div>
          <div>
            <p className="muted-label">{t("detail.added")}</p>
            <strong>{new Date(product.createdAt).toLocaleDateString()}</strong>
          </div>
        </div>
      </div>

      {product.metadata && Object.keys(product.metadata).length > 0 && (
        <div className="product-detail-grid">
          <Card>
            <h2>{t("detail.specs")}</h2>
            <div className="product-specs">
              {Object.entries(product.metadata).map(([key, value]) => (
                <div key={key} className="product-spec-row">
                  <span>{key}</span>
                  <strong>{String(value)}</strong>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {product.images && product.images.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          {product.images.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`${product.name} ${i + 1}`}
              style={{ borderRadius: "16px", width: "100%", height: "auto" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
