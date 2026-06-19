import api from "./api.js";

const cropService = {
  getPublicCrops: async (params = {}) => {
    const res = await api.get("/public/crops", { params });
    return res.data.data;
  },
  getPublicCrop: async (id) => {
    const res = await api.get(`/public/crops/${id}`);
    return res.data.data;
  },

  adminListCrops: async () => {
    const res = await api.get("/admin/crops");
    return res.data.data;
  },
  adminGetCrop: async (id) => {
    const res = await api.get(`/admin/crops/${id}`);
    return res.data.data;
  },
  adminCreateCrop: async (payload) => {
    const res = await api.post("/admin/crops", payload);
    return res.data.data;
  },
  adminUpdateCrop: async (id, payload) => {
    const res = await api.patch(`/admin/crops/${id}`, payload);
    return res.data.data;
  },
  adminDeleteCrop: async (id) => {
    const res = await api.delete(`/admin/crops/${id}`);
    return res.data.data;
  },
};

export default cropService;
