import api from "./api.js";

const adminService = {
  adminListAdmins: async () => {
    const res = await api.get("/admins");
    return res.data.data;
  },

  adminGetAdmin: async (id) => {
    const res = await api.get(`/admins/${id}`);
    return res.data.data;
  },

  adminCreateAdmin: async (payload) => {
    const res = await api.post("/admins", payload);
    return res.data.data;
  },

  adminUpdateAdmin: async (id, payload) => {
    const res = await api.patch(`/admins/${id}`, payload);
    return res.data.data;
  },

  adminDeleteAdmin: async (id) => {
    const res = await api.delete(`/admins/${id}`);
    return res.data.data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const res = await api.put("/auth/change-password", { currentPassword, newPassword });
    return res.data;
  },
};

export default adminService;
