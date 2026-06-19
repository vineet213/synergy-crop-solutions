import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import Badge from "../../components/ui/Badge.jsx";
import cropService from "../../services/cropService.js";

export default function CropDetailPage() {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    cropService.getPublicCrop(id)
      .then(setCrop)
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="page-container" style={{ padding: "2rem 0" }}>
        <p>Loading&hellip;</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container" style={{ padding: "2rem 0" }}>
        <div className="empty-state card-shell">
          <h2>Failed to load crop</h2>
          <p>{error}</p>
          <Link to="/crops" className="button-base button-primary">Back to crops</Link>
        </div>
      </main>
    );
  }

  if (!crop) {
    return (
      <main className="page-container" style={{ padding: "2rem 0" }}>
        <div className="empty-state card-shell">
          <h2>Crop not found</h2>
          <p>The crop you are looking for does not exist.</p>
          <Link to="/crops" className="button-base button-primary">Back to crops</Link>
        </div>
      </main>
    );
  }

  const activeProducts = (crop.products || []).filter((p) => p.status === "published");

  return (
    <main className="page-container" style={{ padding: "2rem 0" }}>
      <Link
        to="/crops"
        className="button-base button-secondary"
        style={{ marginBottom: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
      >
        <ArrowLeft size={18} />
        Back to crops
      </Link>

      <SectionContainer title={crop.name} subtitle="Crop information">
        {crop.imageUrl && (
          <img src={crop.imageUrl} alt={crop.name} style={{ maxWidth: "100%", borderRadius: "0.5rem", marginBottom: "1rem" }} />
        )}
        <p>{crop.description || "No description available."}</p>
      </SectionContainer>

      <SectionContainer title="Related Products" subtitle={`${activeProducts.length} product(s) available`}>
        {activeProducts.length === 0 ? (
          <p>No products listed for this crop yet.</p>
        ) : (
          <div className="product-grid">
            {activeProducts.map((product) => (
              <Card key={product._id} className="product-card">
                <div className="product-card-head">
                  <Badge variant="soft">{product.category}</Badge>
                  <h3 className="product-card-title">{product.name}</h3>
                </div>
                <div className="product-card-body">
                  <p className="product-card-lead">{product.description}</p>
                </div>
                <div className="product-card-footer">
                  <div>
                    <p className="product-price">
                      {product.price ? `₹${product.price}` : "Contact for price"}
                    </p>
                  </div>
                  <Link to={`/products/${product._id}`} className="button-base button-primary button-small">
                    View Details
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </SectionContainer>
    </main>
  );
}
