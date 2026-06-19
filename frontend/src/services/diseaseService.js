import api from "./api.js";

const diseaseService = {
  getPublicDiseases: async (params = {}) => {
    const res = await api.get("/public/diseases", { params });
    return res.data.data;
  },
  getPublicDisease: async (id) => {
    const res = await api.get(`/public/diseases/${id}`);
    return res.data.data;
  },

  adminListDiseases: async () => {
    const res = await api.get("/admin/diseases");
    return res.data.data;
  },
  adminGetDisease: async (id) => {
    const res = await api.get(`/admin/diseases/${id}`);
    return res.data.data;
  },
  adminCreateDisease: async (payload) => {
    const res = await api.post("/admin/diseases", payload);
    return res.data.data;
  },
  adminUpdateDisease: async (id, payload) => {
    const res = await api.patch(`/admin/diseases/${id}`, payload);
    return res.data.data;
  },
  adminDeleteDisease: async (id) => {
    const res = await api.delete(`/admin/diseases/${id}`);
    return res.data.data;
  },
};

export default diseaseService;
