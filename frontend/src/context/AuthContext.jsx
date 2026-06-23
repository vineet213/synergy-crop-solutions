import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on mount — verify token against backend
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("authToken");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const user = await authService.getCurrentUser();
        if (user) {
          setUser(user);
          setIsAuthenticated(true);
        }
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
        return response;
      }
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
