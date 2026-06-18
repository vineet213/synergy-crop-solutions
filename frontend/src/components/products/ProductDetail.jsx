import Badge from "../ui/Badge.jsx";
import Card from "../ui/Card.jsx";

export default function ProductDetail({ product }) {
  return (
    <div className="product-detail-shell">
      <div className="product-detail-summary">
        <Badge variant="soft">{product.category}</Badge>
        <h1>{product.name}</h1>
        {product.description && <p className="product-detail-lead">{product.description}</p>}
        <div className="product-detail-meta">
          <div>
            <p className="muted-label">Price</p>
            <strong>{product.price ? `₹${product.price}` : "Contact for price"}</strong>
          </div>
          <div>
            <p className="muted-label">Status</p>
            <strong>{product.status}</strong>
          </div>
          <div>
            <p className="muted-label">Slug</p>
            <strong>{product.slug}</strong>
          </div>
        </div>
      </div>

      {product.metadata && Object.keys(product.metadata).length > 0 && (
        <div className="product-detail-grid">
          <Card>
            <h2>Specifications</h2>
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
    </div>
  );
}
