import { Link } from "react-router-dom";
import Badge from "../ui/Badge.jsx";
import Button from "../ui/Button.jsx";
import Card from "../ui/Card.jsx";

export default function ProductCard({ product }) {
  return (
    <Card className="product-card">
      <div className="product-card-head">
        <Badge variant="soft">{product.category}</Badge>
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-tagline">{product.tagline}</p>
      </div>
      <div className="product-card-body">
        <p className="product-card-lead">{product.lead}</p>
        <ul className="product-card-highlights">
          {product.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </div>
      <div className="product-card-footer">
        <div>
          <p className="product-price">{product.price}</p>
        </div>
        <Link to={`/products/${product.id}`} className="button-base button-primary button-small">
          View details
        </Link>
      </div>
    </Card>
  );
}
