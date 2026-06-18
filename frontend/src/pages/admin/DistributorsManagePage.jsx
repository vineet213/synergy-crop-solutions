import { Link } from "react-router-dom";
import { useAdminDistributors } from "../../hooks/useDistributors.js";

export default function DistributorsManagePage() {
  const { distributors, loading, error, reload, remove } = useAdminDistributors();

  const handleDelete = async (id) => {
    if (!confirm("Delete this distributor?")) return;
    try {
      await remove(id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete distributor");
    }
  };

  return (
    <main className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">Distributors</h1>
        <Link to="/admin/distributors/new" className="button-base button-primary">
          Add distributor
        </Link>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : error ? (
        <div className="empty-state card-shell">
          <h2>Failed to load distributors</h2>
          <p>{error}</p>
          <button onClick={reload} className="button-base button-primary">Retry</button>
        </div>
      ) : distributors.length === 0 ? (
        <div className="empty-state card-shell">
          <h2>No distributors yet</h2>
          <p>Create your first distributor to start building your network.</p>
          <Link to="/admin/distributors/new" className="button-base button-primary">
            Add distributor
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {distributors.map((d) => (
            <div key={d._id} className="card-shell flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{d.name}</h3>
                <p className="text-sm text-gray-600">
                  {d.company} &middot; {d.address?.city}, {d.address?.state}
                  &middot; <span className={d.status === "active" ? "badge badge-brand" : "badge badge-soft"}>{d.status}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/admin/distributors/${d._id}/edit`} className="button-base">
                  Edit
                </Link>
                <button onClick={() => handleDelete(d._id)} className="button-base button-danger">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
