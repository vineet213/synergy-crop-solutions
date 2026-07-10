import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useConfirm from "../../hooks/useConfirm.jsx";
import adminService from "../../services/adminService.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AdminManagePage() {
  const { confirm, ConfirmDialog } = useConfirm();
  const { user } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.adminListAdmins();
      setAdmins(data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id, name) => {
    const confirmed = await confirm(
      `Are you sure you want to delete "${name}"? This action cannot be undone.`,
      "Delete admin"
    );
    if (!confirmed) return;
    try {
      await adminService.adminDeleteAdmin(id);
      setAdmins((a) => a.filter((x) => x._id !== id));
      toast.success("Admin deleted");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete admin");
    }
  };

  return (
    <main className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">Admins</h1>
        <Link to="/admin/admins/new" className="button-base button-primary">Create admin</Link>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : error ? (
        <div className="empty-state card-shell">
          <h2>Failed to load admins</h2>
          <p>{error}</p>
          <button onClick={load} className="button-base button-primary">Retry</button>
        </div>
      ) : admins.length === 0 ? (
        <div className="empty-state card-shell">
          <h2>No admins yet</h2>
          <p>Create your first admin account.</p>
          <Link to="/admin/admins/new" className="button-base button-primary">Create admin</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {admins.map((admin) => (
            <div key={admin._id} className="card-shell flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{admin.name}</h3>
                <p className="text-sm text-gray-600">
                  {admin.email}
                  &middot; <span className={`badge badge-${admin.role === "superadmin" ? "brand" : "soft"}`}>{admin.role}</span>
                  {String(admin._id) === String(user?._id) && <span className="badge badge-brand" style={{ marginLeft: "0.5rem" }}>You</span>}
                </p>
                <p className="text-xs text-gray-400">
                  Created {new Date(admin.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/admin/admins/${admin._id}/edit`} className="button-base">Edit</Link>
                {String(admin._id) !== String(user?._id) && (
                  <button onClick={() => handleDelete(admin._id, admin.name)} className="button-base button-danger">Delete</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {ConfirmDialog}
    </main>
  );
}
