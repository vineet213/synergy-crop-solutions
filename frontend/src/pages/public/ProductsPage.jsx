import { useEffect, useMemo, useState } from "react";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import ProductFilter from "../../components/products/ProductFilter.jsx";
import ProductGrid from "../../components/products/ProductGrid.jsx";
import Card from "../../components/ui/Card.jsx";
import productService from "../../services/productService.js";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const data = await productService.getPublicProducts();
        if (!mounted) return;
        setProducts(data || []);
        // derive categories
        const cats = ["All", ...Array.from(new Set((data || []).map((p) => p.category || "Uncategorized")))];
        setCategories(cats);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        (product.name && product.name.toLowerCase().includes(q)) ||
        (product.description && product.description.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, products]);

  return (
    <main className="page-container product-page">
      <SectionContainer title="Products" subtitle="Agricultural products built for modern operations.">
        <p className="product-intro-copy">
          Browse a curated catalog of agronomy, protection, irrigation, and digital tools. Filter by category or search for the exact solution your farm needs.
        </p>

        <ProductFilter
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          categories={categories}
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
