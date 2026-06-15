import Badge from "../ui/Badge.jsx";
import Button from "../ui/Button.jsx";
import Card from "../ui/Card.jsx";

export default function ProductDetail({ product }) {
  return (
    <div className="product-detail-shell">
      <div className="product-detail-summary">
        <Badge variant="soft">{product.category}</Badge>
        <h1>{product.name}</h1>
        <p className="product-card-tagline">{product.tagline}</p>
        <p className="product-detail-lead">{product.lead}</p>
        <div className="product-detail-meta">
          <div>
            <p className="muted-label">Price</p>
            <strong>{product.price}</strong>
          </div>
          <div>
            <p className="muted-label">Delivery</p>
            <strong>{product.specs[1].value}</strong>
          </div>
          <div>
            <p className="muted-label">Support</p>
            <strong>{product.specs[2].value}</strong>
          </div>
        </div>
        <Button>Request quote</Button>
      </div>

      <div className="product-detail-grid">
        <Card>
          <h2>Key benefits</h2>
          <ul className="product-detail-list">
            {product.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2>Specifications</h2>
          <div className="product-specs">
            {product.specs.map((spec) => (
              <div key={spec.label} className="product-spec-row">
                <span>{spec.label}</span>
                <strong>{spec.value}</strong>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2>What this product includes</h2>
          <ul className="product-detail-list">
            {product.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
