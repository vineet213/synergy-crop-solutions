import api from "./api.js";

const testimonialService = {
  getPublicTestimonials: async (params = {}) => {
    const res = await api.get("/public/testimonials", { params });
    return res.data.data;
  },
  getPublicTestimonial: async (id) => {
    const res = await api.get(`/public/testimonials/${id}`);
    return res.data.data;
  },

  adminListTestimonials: async () => {
    const res = await api.get("/admin/testimonials");
    return res.data.data;
  },
  adminGetTestimonial: async (id) => {
    const res = await api.get(`/admin/testimonials/${id}`);
    return res.data.data;
  },
  adminCreateTestimonial: async (payload) => {
    const res = await api.post("/admin/testimonials", payload);
    return res.data.data;
  },
  adminUpdateTestimonial: async (id, payload) => {
    const res = await api.patch(`/admin/testimonials/${id}`, payload);
    return res.data.data;
  },
  adminDeleteTestimonial: async (id) => {
    const res = await api.delete(`/admin/testimonials/${id}`);
    return res.data.data;
  },
};

export default testimonialService;
