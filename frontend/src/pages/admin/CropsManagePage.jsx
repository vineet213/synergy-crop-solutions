import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useConfirm from "../../hooks/useConfirm.jsx";
import { useTranslation } from "react-i18next";
import cropService from "../../services/cropService.js";

export default function CropsManagePage() {
  const { t } = useTranslation("admin");
  const { confirm, ConfirmDialog } = useConfirm();
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
    const confirmed = await confirm(t("crops.deleteConfirmMessage"), t("crops.deleteConfirmTitle"));
    if (!confirmed) return;
    try {
      await cropService.adminDeleteCrop(id);
      setCrops((p) => p.filter((x) => x._id !== id));
      toast.success(t("crops.deleteSuccess"));
    } catch (err) {
      toast.error(t("crops.deleteFailed"));
    }
  };

  return (
    <main className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">{t("crops.title")}</h1>
        <Link to="/admin/crops/new" className="button-base button-primary">{t("crops.createButton")}</Link>
      </div>

      {loading ? (
        <p>{t("common.loading")}</p>
      ) : error ? (
        <div className="empty-state card-shell">
          <h2>{t("crops.failedToLoad")}</h2>
          <p>{error}</p>
          <button onClick={load} className="button-base button-primary">{t("common.retry")}</button>
        </div>
      ) : crops.length === 0 ? (
        <div className="empty-state card-shell">
          <h2>{t("crops.noCropsTitle")}</h2>
          <p>{t("crops.noCropsDescription")}</p>
          <Link to="/admin/crops/new" className="button-base button-primary">{t("crops.createButton")}</Link>
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
                <Link to={`/admin/crops/${c._id}/edit`} className="button-base">{t("common.edit")}</Link>
                <button onClick={() => handleDelete(c._id)} className="button-base button-danger">{t("common.delete")}</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {ConfirmDialog}
    </main>
  );
}
