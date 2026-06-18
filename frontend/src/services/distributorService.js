import api from "./api.js";

const distributorService = {
  getPublicDistributors: async (params = {}) => {
    const res = await api.get("/public/distributors", { params });
    return res.data.data;
  },
  getPublicDistributor: async (id) => {
    const res = await api.get(`/public/distributors/${id}`);
    return res.data.data;
  },

  adminListDistributors: async () => {
    const res = await api.get("/admin/distributors");
    return res.data.data;
  },
  adminGetDistributor: async (id) => {
    const res = await api.get(`/admin/distributors/${id}`);
    return res.data.data;
  },
  adminCreateDistributor: async (payload) => {
    const res = await api.post("/admin/distributors", payload);
    return res.data.data;
  },
  adminUpdateDistributor: async (id, payload) => {
    const res = await api.patch(`/admin/distributors/${id}`, payload);
    return res.data.data;
  },
  adminDeleteDistributor: async (id) => {
    const res = await api.delete(`/admin/distributors/${id}`);
    return res.data.data;
  },
};

export default distributorService;
