import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useConfirm from "../../hooks/useConfirm.jsx";
import productService from "../../services/productService.js";

export default function ProductsManagePage() {
  const { confirm, ConfirmDialog } = useConfirm();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <main className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">Products</h1>
        <Link to="/admin/products/new" className="button-base button-primary">Create product</Link>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : error ? (
        <div className="empty-state card-shell">
          <h2>Failed to load products</h2>
          <p>{error}</p>
          <button onClick={load} className="button-base button-primary">Retry</button>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state card-shell">
          <h2>No products yet</h2>
          <p>Create your first product to start building your catalog.</p>
          <Link to="/admin/products/new" className="button-base button-primary">Create product</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((prod) => (
            <div key={prod._id} className="card-shell flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{prod.name}</h3>
                <p className="text-sm text-gray-600">
                  {prod.category} &middot; {prod.slug}
                  &middot; <span className={`badge badge-${prod.status === "published" ? "brand" : "soft"}`}>{prod.status}</span>
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
