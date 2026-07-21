import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import useConfirm from "../../hooks/useConfirm.jsx";
import { useAdminDistributors } from "../../hooks/useDistributors.js";

export default function DistributorsManagePage() {
  const { t } = useTranslation("admin");
  const { confirm, ConfirmDialog } = useConfirm();
  const { distributors, loading, error, reload, remove } = useAdminDistributors();

  const handleDelete = async (id) => {
    const confirmed = await confirm(t("distributors.deleteConfirmMessage"), t("distributors.deleteConfirmTitle"));
    if (!confirmed) return;
    try {
      await remove(id);
      toast.success(t("distributors.deleteSuccess"));
    } catch (err) {
      toast.error(t("distributors.deleteFailed"));
    }
  };

  return (
    <main className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">{t("distributors.title")}</h1>
        <Link to="/admin/distributors/new" className="button-base button-primary">
          {t("distributors.addButton")}
        </Link>
      </div>

      {loading ? (
        <p>{t("common.loading")}</p>
      ) : error ? (
        <div className="empty-state card-shell">
          <h2>{t("distributors.failedToLoad")}</h2>
          <p>{error}</p>
          <button onClick={reload} className="button-base button-primary">{t("common.retry")}</button>
        </div>
      ) : distributors.length === 0 ? (
        <div className="empty-state card-shell">
          <h2>{t("distributors.noDistributorsTitle")}</h2>
          <p>{t("distributors.noDistributorsDescription")}</p>
          <Link to="/admin/distributors/new" className="button-base button-primary">
            {t("distributors.addButton")}
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
                  {t("common.edit")}
                </Link>
                <button onClick={() => handleDelete(d._id)} className="button-base button-danger">
                  {t("common.delete")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {ConfirmDialog}
    </main>
  );
}
