import api from "./api.js";

const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    if (response.data.success) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return null;
    }

    try {
      const response = await api.get("/auth/me");
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data.user;
      }
    } catch (error) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },
};

export default authService;
