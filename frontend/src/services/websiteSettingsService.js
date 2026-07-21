import api from "./api.js";

const websiteSettingsService = {
  getPublicSettings: async () => {
    const res = await api.get("/public/settings");
    return res.data.data;
  },

  adminGetSettings: async () => {
    const res = await api.get("/admin/settings");
    return res.data.data;
  },

  adminUpdateSettings: async (payload) => {
    const res = await api.put("/admin/settings", payload);
    return res.data.data;
  },

  adminUploadLogo: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post("/admin/settings/logo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
  },

  adminUploadFavicon: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post("/admin/settings/favicon", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
  },

  adminUploadCertificateImage: async (certId, file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post(`/admin/settings/certificates/${certId}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
  },

  adminDeleteAsset: async (assetType) => {
    const res = await api.delete(`/admin/settings/asset/${assetType}`);
    return res.data.data;
  },
};

export default websiteSettingsService;
