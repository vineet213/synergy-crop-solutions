import { useState, useEffect } from "react";
import { useAdminLeads } from "../../hooks/useLeads.js";
import distributorService from "../../services/distributorService.js";

const STATUS_OPTIONS = ["new", "contacted", "qualified", "converted", "closed"];
const FILTER_OPTIONS = ["all", ...STATUS_OPTIONS];

export default function LeadsManagePage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const params = statusFilter !== "all" ? { status: statusFilter } : {};
  const { leads, loading, error, reload, remove, update } = useAdminLeads(params);
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editDistributor, setEditDistributor] = useState("");
  const [distributors, setDistributors] = useState([]);

  useEffect(() => {
    let mounted = true;
    distributorService.adminListDistributors()
      .then((data) => { if (mounted) setDistributors(data || []); })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this lead?")) return;
    try {
      await remove(id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete lead");
    }
  };

  const startEdit = (lead) => {
    setEditingId(lead._id);
    setEditStatus(lead.status);
    setEditNotes(lead.notes || "");
    setEditDistributor(lead.assignedDistributor?._id || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditStatus("");
    setEditNotes("");
    setEditDistributor("");
  };

  const saveEdit = async (id) => {
    try {
      await update(id, {
        status: editStatus,
        notes: editNotes,
        assignedDistributor: editDistributor || null,
      });
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update lead");
    }
  };

  return (
    <main className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">Leads</h1>
        <div className="product-category-row">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt}
              className={`filter-pill ${statusFilter === opt ? "active" : ""}`}
              onClick={() => setStatusFilter(opt)}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : error ? (
        <div className="empty-state card-shell">
          <h2>Failed to load leads</h2>
          <p>{error}</p>
          <button onClick={reload} className="button-base button-primary">Retry</button>
        </div>
      ) : leads.length === 0 ? (
        <div className="empty-state card-shell">
          <h2>No leads yet</h2>
          <p>Leads submitted through the Contact page will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((l) => (
            <div key={l._id} className="card-shell">
              {editingId === l._id ? (
                <div className="space-y-3">
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                    <strong>{l.name}</strong>
                    <span className="muted-label">{l.email}</span>
                    {l.phone && <span className="muted-label">{l.phone}</span>}
                  </div>
                  {l.company && <p className="card-description">Company: {l.company}</p>}
                  {l.message && <p className="card-description">Message: {l.message}</p>}
                  <div>
                    <label className="block text-sm font-medium">Status</label>
                    <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className="input-field">
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Assigned Distributor</label>
                    <select value={editDistributor} onChange={(e) => setEditDistributor(e.target.value)} className="input-field">
                      <option value="">— Unassigned —</option>
                      {distributors.map((d) => (
                        <option key={d._id} value={d._id}>{d.name} — {d.company}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Notes</label>
                    <textarea value={editNotes} onChange={(e) => setEditNotes(e.target.value)} className="input-field" rows={3} />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(l._id)} className="button-base button-primary">Save</button>
                    <button onClick={cancelEdit} className="button-base">Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                    <strong>{l.name}</strong>
                    <span className="muted-label">{l.email}</span>
                    {l.phone && <span className="muted-label">{l.phone}</span>}
                    <span className={`badge badge-${l.status === "new" ? "brand" : "soft"}`}>{l.status}</span>
                    {l.assignedDistributor && (
                      <span className="badge badge-soft">
                        {l.assignedDistributor.name} ({l.assignedDistributor.company})
                      </span>
                    )}
                  </div>
                  {l.company && <p className="card-description" style={{ marginBottom: "0.25rem" }}>Company: {l.company}</p>}
                  {l.message && <p className="card-description" style={{ marginBottom: "0.5rem" }}>"{l.message}"</p>}
                  {l.notes && <p className="card-description" style={{ fontSize: "0.9rem", fontStyle: "italic" }}>Notes: {l.notes}</p>}
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                    <button onClick={() => startEdit(l)} className="button-base">Edit</button>
                    <button onClick={() => handleDelete(l._id)} className="button-base button-danger">Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
