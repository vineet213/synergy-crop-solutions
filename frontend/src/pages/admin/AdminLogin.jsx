import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import { Mail, Lock, LogIn } from "lucide-react";

export default function AdminLogin() {
  const { t } = useTranslation("admin");
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      email: "",
      password: "",
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
        toast.success(t("auth.loginSuccess"));
        navigate("/admin/dashboard");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        t("auth.loginFailed");
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
            <h1 className="page-title">{t("auth.title")}</h1>
            <p className="page-description" style={{ marginTop: "0.5rem" }}>{t("auth.subtitle")}</p>
          </div>

          {submitError && (
            <div className="admin-login-error">{submitError}</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="admin-login-field">
              <label htmlFor="email" className="admin-login-label">
                {t("auth.emailLabel")}
              </label>
              <div className="admin-login-input-wrap">
                <Mail size={20} className="admin-login-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder={t("auth.emailPlaceholder")}
                  className={`input-field admin-login-input ${errors.email ? "admin-login-input-error" : ""}`}
                  {...register("email", {
                    required: t("auth.emailRequired"),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t("auth.emailInvalid"),
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
                {t("auth.passwordLabel")}
              </label>
              <div className="admin-login-input-wrap">
                <Lock size={20} className="admin-login-icon" />
                <input
                  id="password"
                  type="password"
                  placeholder={t("auth.passwordPlaceholder")}
                  className={`input-field admin-login-input ${errors.password ? "admin-login-input-error" : ""}`}
                  {...register("password", {
                    required: t("auth.passwordRequired"),
                    minLength: {
                      value: 8,
                      message: t("auth.passwordMinLength"),
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
              {isSubmitting ? t("auth.loggingIn") : t("auth.loginButton")}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Link to="/" style={{ color: "var(--brand)" }}>
              {t("auth.backToHome")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
