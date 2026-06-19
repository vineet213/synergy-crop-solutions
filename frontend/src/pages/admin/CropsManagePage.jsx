import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cropService from "../../services/cropService.js";

export default function CropsManagePage() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cropService.adminListCrops();
      setCrops(data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this crop?")) return;
    try {
      await cropService.adminDeleteCrop(id);
      setCrops((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete crop");
    }
  };

  return (
    <main className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">Crops</h1>
        <Link to="/admin/crops/new" className="button-base button-primary">Create crop</Link>
      </div>

      {loading ? (
        <p>Loading&hellip;</p>
      ) : error ? (
        <div className="empty-state card-shell">
          <h2>Failed to load crops</h2>
          <p>{error}</p>
          <button onClick={load} className="button-base button-primary">Retry</button>
        </div>
      ) : crops.length === 0 ? (
        <div className="empty-state card-shell">
          <h2>No crops yet</h2>
          <p>Create your first crop to help farmers discover relevant products.</p>
          <Link to="/admin/crops/new" className="button-base button-primary">Create crop</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {crops.map((c) => (
            <div key={c._id} className="card-shell flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-sm text-gray-600">
                  {c.slug}
                  {c.products?.length > 0 ? ` · ${c.products.length} product(s)` : ""}
                  &middot; <span className={`badge badge-${c.status === "active" ? "brand" : "soft"}`}>{c.status}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/admin/crops/${c._id}/edit`} className="button-base">Edit</Link>
                <button onClick={() => handleDelete(c._id)} className="button-base button-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
