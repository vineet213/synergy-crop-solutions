import { Link } from "react-router-dom";
import Badge from "../ui/Badge.jsx";
import Card from "../ui/Card.jsx";

export default function ProductCard({ product }) {
  return (
    <Card className="product-card">
      <div className="product-card-head">
        <Badge variant="soft">{product.category}</Badge>
        <h3 className="product-card-title">{product.name}</h3>
      </div>
      <div className="product-card-body">
        <p className="product-card-lead">{product.description}</p>
      </div>
      <div className="product-card-footer">
        <div>
          <p className="product-price">{product.price ? `₹${product.price}` : "Contact for price"}</p>
        </div>
        <Link to={`/products/${product._id}`} className="button-base button-primary button-small">
          View details
        </Link>
      </div>
    </Card>
  );
}
