import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  throw new Error(
    "VITE_API_URL environment variable is required. " +
      "Create a frontend/.env file with VITE_API_URL=http://localhost:5000/api " +
      "for development, or set VITE_API_URL in your production environment."
  );
}
  
// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default api;
