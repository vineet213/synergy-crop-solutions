import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useConfirm from "../../hooks/useConfirm.jsx";
import diseaseService from "../../services/diseaseService.js";

export default function DiseasesManagePage() {
  const { confirm, ConfirmDialog } = useConfirm();
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await diseaseService.adminListDiseases();
      setDiseases(data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    const confirmed = await confirm("Are you sure you want to delete this disease? This action cannot be undone.", "Delete disease");
    if (!confirmed) return;
    try {
      await diseaseService.adminDeleteDisease(id);
      setDiseases((p) => p.filter((x) => x._id !== id));
      toast.success("Disease deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete disease");
    }
  };

  return (
    <main className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">Diseases</h1>
        <Link to="/admin/diseases/new" className="button-base button-primary">Create disease</Link>
      </div>

      {loading ? (
        <p>Loading&hellip;</p>
      ) : error ? (
        <div className="empty-state card-shell">
          <h2>Failed to load diseases</h2>
          <p>{error}</p>
          <button onClick={load} className="button-base button-primary">Retry</button>
        </div>
      ) : diseases.length === 0 ? (
        <div className="empty-state card-shell">
          <h2>No diseases yet</h2>
          <p>Create your first disease to help farmers discover relevant products.</p>
          <Link to="/admin/diseases/new" className="button-base button-primary">Create disease</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {diseases.map((d) => (
            <div key={d._id} className="card-shell flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{d.name}</h3>
                <p className="text-sm text-gray-600">
                  {d.slug}
                  {d.products?.length > 0 ? ` · ${d.products.length} product(s)` : ""}
                  &middot; <span className={`badge badge-${d.status === "active" ? "brand" : "soft"}`}>{d.status}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/admin/diseases/${d._id}/edit`} className="button-base">Edit</Link>
                <button onClick={() => handleDelete(d._id)} className="button-base button-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {ConfirmDialog}
    </main>
  );
}
