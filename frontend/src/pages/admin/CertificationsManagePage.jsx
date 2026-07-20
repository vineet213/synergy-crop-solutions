import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useConfirm from "../../hooks/useConfirm.jsx";
import certificationService from "../../services/certificationService.js";
import { useTranslation } from "react-i18next";

export default function CertificationsManagePage() {
  const { t } = useTranslation("admin");
  const { confirm, ConfirmDialog } = useConfirm();
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await certificationService.adminListCertifications();
      setCertifications(data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    const confirmed = await confirm(t("certifications.deleteConfirmMessage"), t("certifications.deleteConfirmTitle"));
    if (!confirmed) return;
    try {
      await certificationService.adminDeleteCertification(id);
      setCertifications((p) => p.filter((x) => x._id !== id));
      toast.success(t("certifications.deleteSuccess"));
    } catch (err) {
      console.error(err);
      toast.error(t("certifications.deleteFailed"));
    }
  };

  return (
    <main className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">{t("certifications.title")}</h1>
        <Link to="/admin/certifications/new" className="button-base button-primary">{t("certifications.createButton")}</Link>
      </div>

      {loading ? (
        <p>{t("common.loading")}</p>
      ) : error ? (
        <div className="empty-state card-shell">
          <h2>{t("certifications.failedToLoad")}</h2>
          <p>{error}</p>
          <button onClick={load} className="button-base button-primary">{t("common.retry")}</button>
        </div>
      ) : certifications.length === 0 ? (
        <div className="empty-state card-shell">
          <h2>{t("certifications.noCertificationsTitle")}</h2>
          <p>{t("certifications.noCertificationsDescription")}</p>
          <Link to="/admin/certifications/new" className="button-base button-primary">{t("certifications.createButton")}</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {certifications.map((c) => (
            <div key={c._id} className="card-shell flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-sm text-gray-600">
                  {c.issuingAuthority ? `${c.issuingAuthority} · ` : ""}
                  {c.certificateNumber ? `#${c.certificateNumber} · ` : ""}
                  <span className={`badge badge-${c.status === "active" ? "brand" : "soft"}`}>{c.status}</span>
                  {c.isFeatured && <span className="badge badge-brand ml-1">{t("certifications.badgeFeatured")}</span>}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/admin/certifications/${c._id}/edit`} className="button-base">{t("common.edit")}</Link>
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
