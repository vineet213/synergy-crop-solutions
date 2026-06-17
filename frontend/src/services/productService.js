import api from "./api.js";

const productService = {
	// Public
	getPublicProducts: async (params = {}) => {
		const res = await api.get("/public/products", { params });
		return res.data.data;
	},
	getPublicProduct: async (id) => {
		const res = await api.get(`/public/products/${id}`);
		return res.data.data;
	},

	// Admin
	adminListProducts: async () => {
		const res = await api.get("/admin/products");
		return res.data.data;
	},
	adminCreateProduct: async (payload) => {
		const res = await api.post("/admin/products", payload);
		return res.data.data;
	},
	adminUpdateProduct: async (id, payload) => {
		const res = await api.patch(`/admin/products/${id}`, payload);
		return res.data.data;
	},
	adminDeleteProduct: async (id) => {
		const res = await api.delete(`/admin/products/${id}`);
		return res.data.data;
	},
};

export default productService;
