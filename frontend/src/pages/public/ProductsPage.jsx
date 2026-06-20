import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import ProductFilter from "../../components/products/ProductFilter.jsx";
import ProductGrid from "../../components/products/ProductGrid.jsx";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import { usePublicProducts } from "../../hooks/useProducts.js";
import useSEO from "../../hooks/useSEO.js";

export default function ProductsPage() {
  useSEO({ title: "Products", description: "Browse our curated catalog of agricultural products including bio fertilizers, bio pesticides, fungicides, and micronutrients for modern farming operations.", canonical: "/products" });
  const { t } = useTranslation("products");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  const params = { limit: 100 };
  if (selectedCategory !== "All") params.category = selectedCategory;
  const { products, loading, error, reload } = usePublicProducts(params);

  useEffect(() => {
    if (selectedCategory === "All" && !loading) {
      const cats = ["All", ...Array.from(new Set((products || []).map((p) => p.category || "Uncategorized")))];
      setCategories(cats);
    }
  }, [selectedCategory, loading, products]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return products;
    return products.filter((product) =>
      (product.name && product.name.toLowerCase().includes(q)) ||
      (product.scientificName && product.scientificName.toLowerCase().includes(q)) ||
      (product.category && product.category.toLowerCase().includes(q))
    );
  }, [searchQuery, products]);

  return (
    <main className="page-container" style={{ padding: "2rem 0" }}>
      <SectionContainer title={t("title")} subtitle={t("subtitle")}>
        <p className="product-intro-copy">
          {t("intro")}
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
        ) : error ? (
          <div className="empty-state card-shell">
            <h2>{t("errors.load")}</h2>
            <p>{error}</p>
            <Button onClick={reload}>
              Retry
            </Button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state card-shell">
            <h2>{t("empty.title")}</h2>
            <p>{t("empty.description")}</p>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </SectionContainer>
    </main>
  );
}
