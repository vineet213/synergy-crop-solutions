import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productService from "../../services/productService.js";

export default function ProductsManagePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const data = await productService.adminListProducts();
        if (!mounted) return;
        setProducts(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await productService.adminDeleteProduct(id);
      setProducts((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
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
      ) : (
        <div className="space-y-4">
          {products.map((prod) => (
            <div key={prod._id} className="card-shell flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{prod.name}</h3>
                <p className="text-sm text-gray-600">{prod.category} • {prod.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/admin/products/${prod._id}/edit`} className="button-base">Edit</Link>
                <button onClick={() => handleDelete(prod._id)} className="button-base button-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
