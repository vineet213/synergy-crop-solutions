import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import Badge from "../../components/ui/Badge.jsx";
import diseaseService from "../../services/diseaseService.js";

export default function DiseaseDetailPage() {
  const { id } = useParams();
  const [disease, setDisease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    diseaseService.getPublicDisease(id)
      .then(setDisease)
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
          <h2>Failed to load disease</h2>
          <p>{error}</p>
          <Link to="/diseases" className="button-base button-primary">Back to diseases</Link>
        </div>
      </main>
    );
  }

  if (!disease) {
    return (
      <main className="page-container" style={{ padding: "2rem 0" }}>
        <div className="empty-state card-shell">
          <h2>Disease not found</h2>
          <p>The disease you are looking for does not exist.</p>
          <Link to="/diseases" className="button-base button-primary">Back to diseases</Link>
        </div>
      </main>
    );
  }

  const activeProducts = (disease.products || []).filter((p) => p.status === "published");

  return (
    <main className="page-container" style={{ padding: "2rem 0" }}>
      <Link
        to="/diseases"
        className="button-base button-secondary"
        style={{ marginBottom: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
      >
        <ArrowLeft size={18} />
        Back to diseases
      </Link>

      <SectionContainer title={disease.name} subtitle="Disease information">
        {disease.description && <p>{disease.description}</p>}
        {disease.symptoms && (
          <div style={{ marginTop: "1rem" }}>
            <h3 className="font-semibold">Symptoms</h3>
            <p>{disease.symptoms}</p>
          </div>
        )}
      </SectionContainer>

      <SectionContainer title="Related Products" subtitle={`${activeProducts.length} product(s) available`}>
        {activeProducts.length === 0 ? (
          <p>No products listed for this disease yet.</p>
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
                  <Link to={`/products/${product.slug}`} className="button-base button-primary button-small">
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
