import api from "./api.js";

const leadService = {
  createPublicLead: async (payload) => {
    const res = await api.post("/public/leads", payload);
    return res.data.data;
  },

  adminListLeads: async (params = {}) => {
    const res = await api.get("/admin/leads", { params });
    return res.data.data;
  },
  adminGetLead: async (id) => {
    const res = await api.get(`/admin/leads/${id}`);
    return res.data.data;
  },
  adminUpdateLead: async (id, payload) => {
    const res = await api.patch(`/admin/leads/${id}`, payload);
    return res.data.data;
  },
  adminDeleteLead: async (id) => {
    const res = await api.delete(`/admin/leads/${id}`);
    return res.data.data;
  },

  adminExportLeads: async (params = {}, format = "excel") => {
    const res = await api.get("/admin/leads/export", {
      params: { ...params, format },
      responseType: "blob",
    });
    const disposition = res.headers["content-disposition"] || "";
    const ext = format === "csv" ? "csv" : "xlsx";
    const filenameMatch = disposition.match(/filename="?([^";\n]+)"?/);
    const filename = filenameMatch ? filenameMatch[1] : `leads-export.${ext}`;

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};

export default leadService;
