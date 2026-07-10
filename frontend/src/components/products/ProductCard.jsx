import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Badge from "../ui/Badge.jsx";
import Card from "../ui/Card.jsx";
import { formatCategory } from "../../utils/formatters.js";

export default function ProductCard({ product }) {
  const { t } = useTranslation("products");
  const imageUrl = product.images?.[0] || null;

  return (
    <Card className="product-card">
      {imageUrl && (
        <div className="product-card-image">
          <img src={imageUrl} alt={product.name} />
        </div>
      )}
      <div className="product-card-head">
        <Badge variant="soft">{formatCategory(product.category, t)}</Badge>
        <h3 className="product-card-title">{product.name}</h3>
      </div>
      <div className="product-card-body">
        <p className="product-card-lead">{product.shortDescription || product.description}</p>
      </div>
      <div className="product-card-footer">
        <div>
          <p className="product-price">{product.price ? `₹${product.price}` : t("contactForPrice")}</p>
        </div>
        <Link to={`/products/${product.slug}`} className="button-base button-primary button-small">
          {t("viewDetails")}
        </Link>
      </div>
    </Card>
  );
}
