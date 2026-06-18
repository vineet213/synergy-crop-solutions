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
};

export default leadService;
