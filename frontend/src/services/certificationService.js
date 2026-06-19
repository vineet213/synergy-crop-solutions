import api from "./api.js";

const certificationService = {
  getPublicCertifications: async (params = {}) => {
    const res = await api.get("/public/certifications", { params });
    return res.data.data;
  },
  getPublicCertification: async (id) => {
    const res = await api.get(`/public/certifications/${id}`);
    return res.data.data;
  },

  adminListCertifications: async () => {
    const res = await api.get("/admin/certifications");
    return res.data.data;
  },
  adminGetCertification: async (id) => {
    const res = await api.get(`/admin/certifications/${id}`);
    return res.data.data;
  },
  adminCreateCertification: async (payload) => {
    const res = await api.post("/admin/certifications", payload);
    return res.data.data;
  },
  adminUpdateCertification: async (id, payload) => {
    const res = await api.patch(`/admin/certifications/${id}`, payload);
    return res.data.data;
  },
  adminDeleteCertification: async (id) => {
    const res = await api.delete(`/admin/certifications/${id}`);
    return res.data.data;
  },
};

export default certificationService;
