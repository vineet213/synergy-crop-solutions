import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useConfirm from "../../hooks/useConfirm.jsx";
import adminService from "../../services/adminService.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useTranslation } from "react-i18next";

export default function AdminManagePage() {
  const { t } = useTranslation("admin");
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
      t("admins.deleteConfirmMessage", { name }),
      t("admins.deleteConfirmTitle")
    );
    if (!confirmed) return;
    try {
      await adminService.adminDeleteAdmin(id);
      setAdmins((a) => a.filter((x) => x._id !== id));
      toast.success(t("admins.deleteSuccess"));
    } catch (err) {
      toast.error(err.response?.data?.message || t("admins.deleteFailed"));
    }
  };

  return (
    <main className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">{t("admins.title")}</h1>
        <Link to="/admin/admins/new" className="button-base button-primary">{t("admins.createButton")}</Link>
      </div>

      {loading ? (
        <p>{t("common.loading")}</p>
      ) : error ? (
        <div className="empty-state card-shell">
          <h2>{t("admins.failedToLoad")}</h2>
          <p>{error}</p>
          <button onClick={load} className="button-base button-primary">{t("common.retry")}</button>
        </div>
      ) : admins.length === 0 ? (
        <div className="empty-state card-shell">
          <h2>{t("admins.noAdminsTitle")}</h2>
          <p>{t("admins.noAdminsDescription")}</p>
          <Link to="/admin/admins/new" className="button-base button-primary">{t("admins.createButton")}</Link>
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
                <Link to={`/admin/admins/${admin._id}/edit`} className="button-base">{t("common.edit")}</Link>
                {String(admin._id) !== String(user?._id) && (
                  <button onClick={() => handleDelete(admin._id, admin.name)} className="button-base button-danger">{t("common.delete")}</button>
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
