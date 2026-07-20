import api from "./api.js";

const productService = {
	// Public — new API
	getProducts: async (params = {}) => {
		const res = await api.get("/products", { params });
		return res.data;
	},
	getProductBySlug: async (slug) => {
		const res = await api.get(`/products/${slug}`);
		return res.data.data;
	},
	getProductsByCategory: async (category) => {
		const res = await api.get(`/products/category/${encodeURIComponent(category)}`);
		return res.data.data;
	},

	// Public — legacy (keep for backward compat)
	getPublicProducts: async (params = {}) => {
		const res = await api.get("/public/products", { params });
		return res.data.data;
	},
	getPublicProduct: async (id) => {
		const res = await api.get(`/public/products/${id}`);
		return res.data.data;
	},

	// Admin
	adminListProducts: async (params = {}) => {
		const res = await api.get("/admin/products", { params });
		return res.data.data;
	},
	adminGetProduct: async (id) => {
		const res = await api.get(`/admin/products/${id}`);
		return res.data.data;
	},
	adminCreateProduct: async (payload) => {
		const res = await api.post("/admin/products", payload, {
			headers: payload instanceof FormData
				? { "Content-Type": "multipart/form-data" }
				: undefined,
		});
		return res.data.data;
	},
	adminUpdateProduct: async (id, payload) => {
		const res = await api.patch(`/admin/products/${id}`, payload, {
			headers: payload instanceof FormData
				? { "Content-Type": "multipart/form-data" }
				: undefined,
		});
		return res.data.data;
	},
	adminDeleteProduct: async (id) => {
		const res = await api.delete(`/admin/products/${id}`);
		return res.data.data;
	},
};

export default productService;
