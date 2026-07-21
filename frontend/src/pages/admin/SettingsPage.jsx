import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import adminService from "../../services/adminService.js";
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const { t } = useTranslation("admin");
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (data) => {
    try {
      await adminService.changePassword(data.currentPassword, data.newPassword);
      toast.success(t("settings.passwordUpdateSuccess"));
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || t("settings.passwordUpdateFailed"));
    }
  };

  return (
    <main className="page-container">
      <h1 className="page-title">{t("settings.title")}</h1>

      <div className="card-shell mb-6" style={{ maxWidth: "28rem" }}>
        <h2 className="font-semibold mb-2">{t("settings.profile")}</h2>
        <p className="text-sm text-gray-600">{t("settings.name")}: {user?.name}</p>
        <p className="text-sm text-gray-600">{t("settings.email")}: {user?.email}</p>
        <p className="text-sm text-gray-600">{t("settings.role")}: <span className={`badge badge-${user?.role === "superadmin" ? "brand" : "soft"}`}>{user?.role}</span></p>
      </div>

      <h2 className="font-semibold mb-3">{t("settings.changePassword")}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium">{t("settings.currentPassword")} *</label>
          <input
            type="password"
            {...register("currentPassword", { required: t("settings.currentPasswordRequired") })}
            className="input-field"
          />
          {errors.currentPassword && <p className="text-sm text-red-600">{errors.currentPassword.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">{t("settings.newPassword")} *</label>
          <input
            type="password"
            {...register("newPassword", { required: t("settings.newPasswordRequired"), minLength: { value: 8, message: t("settings.passwordMinLength") } })}
            className="input-field"
          />
          {errors.newPassword && <p className="text-sm text-red-600">{errors.newPassword.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">{t("settings.confirmNewPassword")} *</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: t("settings.confirmPasswordRequired"),
              validate: (val, formValues) => val === formValues.newPassword || t("settings.passwordsDoNotMatch"),
            })}
            className="input-field"
          />
          {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
        </div>
        <div>
          <button type="submit" disabled={isSubmitting} className="button-base button-primary">
            {isSubmitting ? t("common.updating") : t("settings.updatePassword")}
          </button>
        </div>
      </form>
    </main>
  );
}
