import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import certificationService from "../../services/certificationService.js";

export default function CertificationsManagePage() {
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
    if (!confirm("Delete this certification?")) return;
    try {
      await certificationService.adminDeleteCertification(id);
      setCertifications((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete certification");
    }
  };

  return (
    <main className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">Certifications</h1>
        <Link to="/admin/certifications/new" className="button-base button-primary">Create certification</Link>
      </div>

      {loading ? (
        <p>Loading&hellip;</p>
      ) : error ? (
        <div className="empty-state card-shell">
          <h2>Failed to load certifications</h2>
          <p>{error}</p>
          <button onClick={load} className="button-base button-primary">Retry</button>
        </div>
      ) : certifications.length === 0 ? (
        <div className="empty-state card-shell">
          <h2>No certifications yet</h2>
          <p>Create your first certification to showcase your credentials.</p>
          <Link to="/admin/certifications/new" className="button-base button-primary">Create certification</Link>
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
                  {c.isFeatured && <span className="badge badge-brand ml-1">Featured</span>}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/admin/certifications/${c._id}/edit`} className="button-base">Edit</Link>
                <button onClick={() => handleDelete(c._id)} className="button-base button-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
