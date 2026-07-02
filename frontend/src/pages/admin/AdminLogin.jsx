import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import { Mail, Lock, LogIn } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      email: "admin@synergycrop.com",
      password: "Admin@123",
    },
  });
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, authLoading, navigate]);

  const onSubmit = async (data) => {
    setSubmitError("");
    try {
      const response = await login(data.email, data.password);
      if (response.success) {
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to login. Please try again.";
      setSubmitError(errorMessage);
      toast.error(errorMessage);
    }
  };

  if (authLoading) {
    return (
      <div className="protected-loading">
        <div className="protected-spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="card-shell">
          <div className="admin-login-header">
            <h1 className="page-title">Agri Platform</h1>
            <p className="page-description" style={{ marginTop: "0.5rem" }}>Admin Login</p>
          </div>

          {submitError && (
            <div className="admin-login-error">{submitError}</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="admin-login-field">
              <label htmlFor="email" className="admin-login-label">
                Email Address
              </label>
              <div className="admin-login-input-wrap">
                <Mail size={20} className="admin-login-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`input-field admin-login-input ${errors.email ? "admin-login-input-error" : ""}`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="admin-login-field-error">{errors.email.message}</p>
              )}
            </div>

            <div className="admin-login-field">
              <label htmlFor="password" className="admin-login-label">
                Password
              </label>
              <div className="admin-login-input-wrap">
                <Lock size={20} className="admin-login-icon" />
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className={`input-field admin-login-input ${errors.password ? "admin-login-input-error" : ""}`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
              </div>
              {errors.password && (
                <p className="admin-login-field-error">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="button-base button-primary admin-login-submit"
            >
              <LogIn size={20} />
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="admin-login-footer">
            <p style={{ margin: "0 0 0.5rem", color: "var(--text-muted)" }}>
              Demo credentials:
            </p>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Email: admin@synergycrop.com
              <br />
              Password: Admin@123
            </p>
          </div>

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Link to="/" style={{ color: "var(--brand)" }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
