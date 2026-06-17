import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import ProductDetail from "../../components/products/ProductDetail.jsx";
import productService from "../../services/productService.js";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const data = await productService.getPublicProduct(id);
        if (!mounted) return;
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (id) load();
    return () => (mounted = false);
  }, [id]);

  return (
    <main className="page-container">
      <SectionContainer
        title={product ? product.name : "Product Details"}
        subtitle={product ? product.category : "Product information and specifications."}
      >
        {loading ? (
          <div className="loading-placeholder">
            <div className="skeleton-block skeleton-title" />
            <div className="skeleton-block skeleton-line" />
          </div>
        ) : product ? (
          <>
            <ProductDetail product={product} />
            <Link to="/products" className="button-base button-secondary back-link">
              Back to products
            </Link>
          </>
        ) : (
          <div className="empty-state card-shell">
            <h2>Product not found</h2>
            <p>The product you are looking for does not exist in the catalog.</p>
            <Link to="/products" className="button-base button-primary back-link">
              View catalog
            </Link>
          </div>
        )}
      </SectionContainer>
    </main>
  );
}
