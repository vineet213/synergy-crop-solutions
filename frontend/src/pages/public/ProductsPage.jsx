import { useEffect, useMemo, useState } from "react";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import ProductFilter from "../../components/products/ProductFilter.jsx";
import ProductGrid from "../../components/products/ProductGrid.jsx";
import { productCatalog, productCategories } from "../../components/products/mockProducts.js";
import Card from "../../components/ui/Card.jsx";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return productCatalog.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.lead.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="page-container product-page">
      <SectionContainer title="Products" subtitle="Agricultural products built for modern operations.">
        <p className="product-intro-copy">
          Browse a curated catalog of agronomy, protection, irrigation, and digital tools. Filter by category or search for the exact solution your farm needs.
        </p>

        <ProductFilter
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          categories={productCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onClear={() => {
            setSearchQuery("");
            setSelectedCategory("All");
          }}
        />

        {loading ? (
          <div className="loading-grid">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="product-skeleton">
                <div className="skeleton-block skeleton-title" />
                <div className="skeleton-block skeleton-line" />
                <div className="skeleton-block skeleton-line short" />
                <div className="skeleton-block skeleton-tag" />
              </Card>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state card-shell">
            <h2>No products match your search</h2>
            <p>Try a different keyword or clear the category filter to see more agricultural products.</p>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </SectionContainer>
    </main>
  );
}
