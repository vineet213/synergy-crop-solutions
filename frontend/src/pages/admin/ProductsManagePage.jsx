import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import toast from "react-hot-toast";
import useConfirm from "../../hooks/useConfirm.jsx";
import productService from "../../services/productService.js";

export default function ProductsManagePage() {
  const { confirm, ConfirmDialog } = useConfirm();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.adminListProducts();
      setProducts(data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    const confirmed = await confirm("Are you sure you want to delete this product? This action cannot be undone.", "Delete product");
    if (!confirmed) return;
    try {
      await productService.adminDeleteProduct(id);
      setProducts((p) => p.filter((x) => x._id !== id));
      toast.success("Product deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  const visible = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return (products || []).filter((p) => {
      if (filter === "featured" && !p.isFeatured) return false;
      if (filter === "non-featured" && p.isFeatured) return false;
      if (!q) return true;
      return (
        (p.name || "").toLowerCase().includes(q) ||
        (p.slug || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q) ||
        (p.subcategory || "").toLowerCase().includes(q) ||
        (p.scientificName || "").toLowerCase().includes(q)
      );
    });
  }, [products, filter, searchQuery]);

  return (
    <main className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">Products</h1>
        <Link to="/admin/products/new" className="button-base button-primary">Create product</Link>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 260px", maxWidth: 400 }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "0.85rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            className="input-field"
            placeholder="Search by name, slug, category, subcategory or scientific name…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: "2.5rem" }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: "0.6rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                display: "flex",
                padding: "2px",
              }}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          {[
            { value: "all", label: "All" },
            { value: "featured", label: "Featured" },
            { value: "non-featured", label: "Non Featured" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`button-base ${filter === opt.value ? "button-primary" : ""}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : error ? (
        <div className="empty-state card-shell">
          <h2>Failed to load products</h2>
          <p>{error}</p>
          <button onClick={load} className="button-base button-primary">Retry</button>
        </div>
      ) : visible.length === 0 ? (
        <div className="empty-state card-shell">
          <h2>No products found</h2>
          <p>{searchQuery || filter !== "all" ? "No products match your search and filter." : "Create your first product to start building your catalog."}</p>
          {!searchQuery && filter === "all" && (
            <Link to="/admin/products/new" className="button-base button-primary">Create product</Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {visible.map((prod) => (
            <div key={prod._id} className="card-shell flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{prod.name}</h3>
                <p className="text-sm text-gray-600">
                  {prod.category} &middot; {prod.slug}
                  &middot; <span className={`badge badge-${prod.status === "published" ? "brand" : "soft"}`}>{prod.status}</span>
                  {prod.isFeatured && <span className="badge badge-brand ml-1">Featured</span>}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/admin/products/${prod._id}/edit`} className="button-base">Edit</Link>
                <button onClick={() => handleDelete(prod._id)} className="button-base button-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {ConfirmDialog}
    </main>
  );
}
