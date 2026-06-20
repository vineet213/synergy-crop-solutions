import { useTranslation } from "react-i18next";
import Badge from "../ui/Badge.jsx";
import Card from "../ui/Card.jsx";

function DetailRow({ label, value }) {
  if (!value) return null;

  return (
    <div className="product-spec-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ListSection({ title, items }) {
  if (!items || items.length === 0) return null;

  return (
    <Card>
      <h2>{title}</h2>
      <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8 }}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}

export default function ProductDetail({ product }) {
  const { t } = useTranslation("products");

  const imageUrl =
    product.images?.[0]
      ? `/${product.images[0].replace(/^\/+/, "")}`
      : null;

  return (
    <div className="product-detail-shell">
      {imageUrl && (
        <div style={{ marginBottom: "1.5rem" }}>
          <img
            src={imageUrl}
            alt={product.name}
            style={{
              borderRadius: "16px",
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              display: "block",
            }}
          />
        </div>
      )}

      <div className="product-detail-summary">
        <Badge variant="brand">{product.category}</Badge>

        <h1>{product.name}</h1>

        {product.tagline && (
          <p
            className="product-detail-lead"
            style={{ fontStyle: "italic" }}
          >
            {product.tagline}
          </p>
        )}

        {product.shortDescription && (
          <p className="product-detail-lead">
            {product.shortDescription}
          </p>
        )}

        {product.description && (
          <p>{product.description}</p>
        )}

        <div className="product-detail-meta">
          {product.scientificName && (
            <div>
              <p className="muted-label">
                {t("detail.scientificName")}
              </p>
              <strong>
                <em>{product.scientificName}</em>
              </strong>
            </div>
          )}

          {product.productType && (
            <div>
              <p className="muted-label">
                {t("detail.productType")}
              </p>
              <strong>{product.productType}</strong>
            </div>
          )}

          <div>
            <p className="muted-label">
              {t("detail.category")}
            </p>
            <strong>{product.category}</strong>
          </div>

          {product.price && (
            <div>
              <p className="muted-label">
                {t("detail.price")}
              </p>
              <strong>₹{product.price}</strong>
            </div>
          )}

          {product.createdAt && (
            <div>
              <p className="muted-label">
                {t("detail.added")}
              </p>
              <strong>
                {new Date(product.createdAt).toLocaleDateString()}
              </strong>
            </div>
          )}
        </div>
      </div>

      <div className="product-detail-grid">
        <DetailRow
          label={t("detail.composition")}
          value={product.composition}
        />

        <DetailRow
          label={t("detail.dosage")}
          value={product.dosage}
        />

        <DetailRow
          label={t("detail.applicationMethod")}
          value={product.applicationMethod}
        />

        <DetailRow
          label={t("detail.storage")}
          value={product.storage}
        />

        <DetailRow
          label={t("detail.shelfLife")}
          value={product.shelfLife}
        />

        <DetailRow
          label={t("detail.compatibility")}
          value={product.compatibility}
        />

        <DetailRow
          label={t("detail.packSize")}
          value={product.packSize?.join(", ")}
        />
      </div>

      <ListSection
        title={t("detail.benefits")}
        items={product.benefits}
      />

      <ListSection
        title={t("detail.targetCrops")}
        items={product.targetCrops}
      />

      {product.longDescription && (
        <Card>
          <h2>{t("detail.longDescription")}</h2>
          <p>{product.longDescription}</p>
        </Card>
      )}

      {product.metadata &&
        Object.keys(product.metadata).length > 0 && (
          <Card>
            <h2>{t("detail.specs")}</h2>

            <div className="product-specs">
              {Object.entries(product.metadata).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className="product-spec-row"
                  >
                    <span>{key}</span>
                    <strong>{String(value)}</strong>
                  </div>
                )
              )}
            </div>
          </Card>
        )}

      {product.images && product.images.length > 1 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {product.images.slice(1).map((url, index) => (
            <img
              key={index}
              src={`/${url.replace(/^\/+/, "")}`}
              alt={`${product.name} ${index + 2}`}
              style={{
                borderRadius: "16px",
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}