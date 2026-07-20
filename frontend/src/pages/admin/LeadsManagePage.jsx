import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { Download, Filter, X } from "lucide-react";
import useConfirm from "../../hooks/useConfirm.jsx";
import { useAdminLeads } from "../../hooks/useLeads.js";
import distributorService from "../../services/distributorService.js";
import leadService from "../../services/leadService.js";

const STATUS_OPTIONS = ["new", "contacted", "qualified", "converted", "closed"];
const FILTER_OPTIONS = ["all", ...STATUS_OPTIONS];

export default function LeadsManagePage() {
  const { t } = useTranslation("admin");
  const { confirm, ConfirmDialog } = useConfirm();

  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [distributorFilter, setDistributorFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exporting, setExporting] = useState(false);

  const buildParams = useCallback(() => {
    const params = {};
    if (statusFilter !== "all") params.status = statusFilter;
    if (dateFrom) params.dateFrom = dateFrom;
    if (dateTo) params.dateTo = dateTo;
    if (productFilter) params.product = productFilter;
    if (stateFilter) params.state = stateFilter;
    if (distributorFilter) params.assignedDistributor = distributorFilter;
    if (searchQuery) params.search = searchQuery;
    return params;
  }, [statusFilter, dateFrom, dateTo, productFilter, stateFilter, distributorFilter, searchQuery]);

  const [params, setParams] = useState({});
  const { leads, loading, error, reload, remove, update } = useAdminLeads(params);

  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editDistributor, setEditDistributor] = useState("");
  const [editAlternatePhone, setEditAlternatePhone] = useState("");
  const [editState, setEditState] = useState("");
  const [editDistrict, setEditDistrict] = useState("");
  const [editVillage, setEditVillage] = useState("");
  const [editCrop, setEditCrop] = useState("");
  const [editProduct, setEditProduct] = useState("");
  const [distributors, setDistributors] = useState([]);

  useEffect(() => {
    let mounted = true;
    distributorService.adminListDistributors()
      .then((data) => { if (mounted) setDistributors(data || []); })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  const applyFilters = () => {
    setParams(buildParams());
  };

  const clearFilters = () => {
    setStatusFilter("all");
    setDateFrom("");
    setDateTo("");
    setProductFilter("");
    setStateFilter("");
    setDistributorFilter("");
    setSearchQuery("");
    setParams({});
  };

  const handleDelete = async (id) => {
    const confirmed = await confirm(t("leads.deleteConfirmMessage"), t("leads.deleteConfirmTitle"));
    if (!confirmed) return;
    try {
      await remove(id);
      toast.success(t("leads.deleteSuccess"));
    } catch (err) {
      console.error(err);
      toast.error(t("leads.deleteFailed"));
    }
  };

  const startEdit = (lead) => {
    setEditingId(lead._id);
    setEditStatus(lead.status);
    setEditNotes(lead.notes || "");
    setEditDistributor(lead.assignedDistributor?._id || "");
    setEditAlternatePhone(lead.alternatePhone || "");
    setEditState(lead.state || "");
    setEditDistrict(lead.district || "");
    setEditVillage(lead.village || "");
    setEditCrop(lead.crop || "");
    setEditProduct(lead.product || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditStatus("");
    setEditNotes("");
    setEditDistributor("");
    setEditAlternatePhone("");
    setEditState("");
    setEditDistrict("");
    setEditVillage("");
    setEditCrop("");
    setEditProduct("");
  };

  const saveEdit = async (id) => {
    try {
      await update(id, {
        status: editStatus,
        notes: editNotes,
        assignedDistributor: editDistributor || null,
        alternatePhone: editAlternatePhone,
        state: editState,
        district: editDistrict,
        village: editVillage,
        crop: editCrop,
        product: editProduct,
      });
      setEditingId(null);
      toast.success(t("leads.updateSuccess"));
    } catch (err) {
      console.error(err);
      toast.error(t("leads.updateFailed"));
    }
  };

  const handleExport = async (format) => {
    setExporting(true);
    try {
      const exportParams = statusFilter !== "all" ? { status: statusFilter } : {};
      await leadService.adminExportLeads(exportParams, format);
      toast.success(t("leads.exportSuccess", { format: format.toUpperCase() }));
    } catch (err) {
      console.error(err);
      toast.error(t("leads.exportFailed"));
    } finally {
      setExporting(false);
    }
  };

  const handleExportFiltered = async (format) => {
    setExporting(true);
    try {
      await leadService.adminExportLeads(params, format);
      toast.success(t("leads.exportFilteredSuccess", { format: format.toUpperCase() }));
    } catch (err) {
      console.error(err);
      toast.error(t("leads.exportFailed"));
    } finally {
      setExporting(false);
    }
  };

  const hasActiveFilters = Object.keys(params).length > 0;

  return (
    <main className="page-container">
      <div className="flex items-center justify-between mb-6" style={{ flexWrap: "wrap", gap: "0.75rem" }}>
        <h1 className="page-title">{t("leads.title")}</h1>
        <div className="flex items-center" style={{ gap: "0.5rem" }}>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`button-base ${showFilters ? "button-primary" : ""}`}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}
          >
            <Filter size={16} />
            {t("leads.filtersButton")}
            {hasActiveFilters && (
              <span style={{ background: "var(--brand)", color: "#fff", borderRadius: "50%", width: "18px", height: "18px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem" }}>
                {Object.keys(params).length}
              </span>
            )}
          </button>

          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="button-base button-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}
              disabled={exporting}
            >
              <Download size={16} />
              {exporting ? t("leads.exporting") : t("leads.exportButton")}
            </button>
            {showExportMenu && (
              <>
                <div style={{ position: "fixed", inset: 0, zIndex: 19 }} onClick={() => setShowExportMenu(false)} />
                <div style={{ position: "absolute", top: "100%", right: 0, marginTop: "4px", background: "#fff", border: "1px solid var(--border)", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 20, minWidth: "220px", padding: "0.5rem 0" }}>
                  <div style={{ padding: "0.375rem 1rem", fontSize: "0.75rem", fontWeight: 600, color: "#666", textTransform: "uppercase", letterSpacing: "0.05em" }}>{t("leads.exportAllHeading")}</div>
                  <button onClick={() => { handleExport("excel"); setShowExportMenu(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "0.5rem 1rem", border: "none", background: "none", cursor: "pointer", fontSize: "0.875rem" }}>
                    {t("leads.exportExcel")}
                  </button>
                  <button onClick={() => { handleExport("csv"); setShowExportMenu(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "0.5rem 1rem", border: "none", background: "none", cursor: "pointer", fontSize: "0.875rem" }}>
                    {t("leads.exportCsv")}
                  </button>
                  <div style={{ borderTop: "1px solid var(--border)", margin: "0.25rem 0" }} />
                  <div style={{ padding: "0.375rem 1rem", fontSize: "0.75rem", fontWeight: 600, color: hasActiveFilters ? "#666" : "#aaa", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {t("leads.exportFilteredHeading")}
                  </div>
                  <button onClick={() => { handleExportFiltered("excel"); setShowExportMenu(false); }} disabled={!hasActiveFilters} style={{ display: "block", width: "100%", textAlign: "left", padding: "0.5rem 1rem", border: "none", background: "none", cursor: hasActiveFilters ? "pointer" : "not-allowed", fontSize: "0.875rem", opacity: hasActiveFilters ? 1 : 0.5 }}>
                    {t("leads.exportFilteredExcel")}
                  </button>
                  <button onClick={() => { handleExportFiltered("csv"); setShowExportMenu(false); }} disabled={!hasActiveFilters} style={{ display: "block", width: "100%", textAlign: "left", padding: "0.5rem 1rem", border: "none", background: "none", cursor: hasActiveFilters ? "pointer" : "not-allowed", fontSize: "0.875rem", opacity: hasActiveFilters ? 1 : 0.5 }}>
                    {t("leads.exportFilteredCsv")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Status Pills */}
      <div className="product-category-row" style={{ marginBottom: showFilters ? "0" : "1rem" }}>
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt}
            className={`filter-pill ${statusFilter === opt ? "active" : ""}`}
            onClick={() => {
              setStatusFilter(opt);
              setParams((prev) => {
                const next = { ...prev };
                if (opt === "all") {
                  delete next.status;
                } else {
                  next.status = opt;
                }
                return next;
              });
            }}
          >
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </button>
        ))}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="card-shell" style={{ marginBottom: "1.5rem", padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h3 style={{ fontWeight: 600, fontSize: "0.95rem" }}>{t("leads.advancedFilters")}</h3>
            {hasActiveFilters && (
              <button onClick={clearFilters} style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", color: "var(--brand)", background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem" }}>
                <X size={14} /> {t("leads.clearAll")}
              </button>
            )}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
            <div>
              <label className="block text-sm font-medium" style={{ marginBottom: "0.25rem" }}>{t("leads.dateFrom")}</label>
              <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium" style={{ marginBottom: "0.25rem" }}>{t("leads.dateTo")}</label>
              <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium" style={{ marginBottom: "0.25rem" }}>{t("leads.filterByProduct")}</label>
              <input type="text" value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className="input-field" placeholder={t("leads.placeholderFilterByProduct")} />
            </div>
            <div>
              <label className="block text-sm font-medium" style={{ marginBottom: "0.25rem" }}>{t("leads.filterByState")}</label>
              <input type="text" value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className="input-field" placeholder={t("leads.placeholderFilterByState")} />
            </div>
            <div>
              <label className="block text-sm font-medium" style={{ marginBottom: "0.25rem" }}>{t("leads.assignedDistributor")}</label>
              <select value={distributorFilter} onChange={(e) => setDistributorFilter(e.target.value)} className="input-field">
                <option value="">{t("leads.allDistributors")}</option>
                {distributors.map((d) => (
                  <option key={d._id} value={d._id}>{d.name} — {d.company}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium" style={{ marginBottom: "0.25rem" }}>{t("leads.searchLabel")}</label>
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field" placeholder={t("leads.placeholderSearch")} />
            </div>
          </div>
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
            <button onClick={applyFilters} className="button-base button-primary">{t("leads.applyFilters")}</button>
            <button onClick={clearFilters} className="button-base">{t("leads.resetFilters")}</button>
          </div>
        </div>
      )}

      {loading ? (
        <p>{t("common.loading")}</p>
      ) : error ? (
        <div className="empty-state card-shell">
          <h2>{t("leads.failedToLoad")}</h2>
          <p>{error}</p>
          <button onClick={reload} className="button-base button-primary">{t("common.retry")}</button>
        </div>
      ) : leads.length === 0 ? (
        <div className="empty-state card-shell">
          <h2>{t("leads.noLeadsTitle")}</h2>
          <p>{t("leads.noLeadsDescription")}</p>
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
                   {l.company && <p className="card-description">{t("leads.labelCompany")}{l.company}</p>}
                   {l.message && <p className="card-description">{t("leads.labelMessage")}{l.message}</p>}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.75rem" }}>
                     <div>
                       <label className="block text-sm font-medium">{t("leads.editLabelStatus")}</label>
                       <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className="input-field">
                         {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                       </select>
                     </div>
                     <div>
                       <label className="block text-sm font-medium">{t("leads.editLabelDistributor")}</label>
                       <select value={editDistributor} onChange={(e) => setEditDistributor(e.target.value)} className="input-field">
                         <option value="">{t("leads.unassigned")}</option>
                        {distributors.map((d) => (
                          <option key={d._id} value={d._id}>{d.name} — {d.company}</option>
                        ))}
                      </select>
                    </div>
                     <div>
                       <label className="block text-sm font-medium">{t("leads.editLabelAlternatePhone")}</label>
                       <input type="tel" value={editAlternatePhone} onChange={(e) => setEditAlternatePhone(e.target.value)} className="input-field" />
                     </div>
                     <div>
                       <label className="block text-sm font-medium">{t("leads.editLabelState")}</label>
                       <input value={editState} onChange={(e) => setEditState(e.target.value)} className="input-field" />
                     </div>
                     <div>
                       <label className="block text-sm font-medium">{t("leads.editLabelDistrict")}</label>
                       <input value={editDistrict} onChange={(e) => setEditDistrict(e.target.value)} className="input-field" />
                     </div>
                     <div>
                       <label className="block text-sm font-medium">{t("leads.editLabelVillage")}</label>
                       <input value={editVillage} onChange={(e) => setEditVillage(e.target.value)} className="input-field" />
                     </div>
                     <div>
                       <label className="block text-sm font-medium">{t("leads.editLabelCrop")}</label>
                       <input value={editCrop} onChange={(e) => setEditCrop(e.target.value)} className="input-field" />
                     </div>
                     <div>
                       <label className="block text-sm font-medium">{t("leads.editLabelProduct")}</label>
                       <input value={editProduct} onChange={(e) => setEditProduct(e.target.value)} className="input-field" />
                    </div>
                  </div>
                     <div>
                       <label className="block text-sm font-medium">{t("leads.editLabelNotes")}</label>
                    <textarea value={editNotes} onChange={(e) => setEditNotes(e.target.value)} className="input-field" rows={3} />
                  </div>
                     <div className="flex gap-2">
                       <button onClick={() => saveEdit(l._id)} className="button-base button-primary">{t("common.save")}</button>
                       <button onClick={cancelEdit} className="button-base">{t("common.cancel")}</button>
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
                   {(l.state || l.district || l.village) && (
                     <p className="card-description" style={{ marginBottom: "0.25rem" }}>
                       {t("leads.labelLocation")}{[l.village, l.district, l.state].filter(Boolean).join(", ")}
                     </p>
                   )}
                   {(l.crop || l.product) && (
                     <p className="card-description" style={{ marginBottom: "0.25rem" }}>
                       {l.crop && `${t("leads.labelCropPrefix")}${l.crop}`}{l.crop && l.product && " | "}{l.product && `${t("leads.labelProductPrefix")}${l.product}`}
                     </p>
                   )}
                   {l.company && <p className="card-description" style={{ marginBottom: "0.25rem" }}>{t("leads.labelCompany")}{l.company}</p>}
                   {l.message && <p className="card-description" style={{ marginBottom: "0.5rem" }}>"{l.message}"</p>}
                   {l.notes && <p className="card-description" style={{ fontSize: "0.9rem", fontStyle: "italic" }}>{t("leads.labelNotesPrefix")}{l.notes}</p>}
                   <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                     <button onClick={() => startEdit(l)} className="button-base">{t("common.edit")}</button>
                     <button onClick={() => handleDelete(l._id)} className="button-base button-danger">{t("common.delete")}</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {ConfirmDialog}
    </main>
  );
}
