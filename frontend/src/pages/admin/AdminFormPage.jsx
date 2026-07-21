import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import adminService from "../../services/adminService.js";
import { useTranslation } from "react-i18next";

export default function AdminFormPage() {
  const { t } = useTranslation("admin");
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "admin",
    },
  });

  useEffect(() => {
    if (!isEdit) return;
    let mounted = true;
    setLoading(true);
    adminService.adminGetAdmin(id)
      .then((data) => {
        if (!mounted) return;
        reset({ name: data.name, email: data.email, role: data.role, password: "" });
      })
      .catch((err) => {
        toast.error(t("adminForm.loadFailed"));
        navigate("/admin/admins");
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [id, isEdit, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      const payload = { name: data.name, email: data.email, role: data.role };
      if (!isEdit) {
        if (!data.password) {
          toast.error(t("adminForm.passwordRequired"));
          return;
        }
        payload.password = data.password;
      }

      if (isEdit) {
        await adminService.adminUpdateAdmin(id, payload);
      } else {
        await adminService.adminCreateAdmin(payload);
      }
      navigate("/admin/admins");
    } catch (err) {
      toast.error(err.response?.data?.message || t("adminForm.saveFailed"));
    }
  };

  if (loading) return <main className="page-container"><p>{t("common.loading")}</p></main>;

  return (
    <main className="page-container">
      <h1 className="page-title">{isEdit ? t("adminForm.editTitle") : t("adminForm.createTitle")}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium">{t("adminForm.name")} *</label>
          <input {...register("name", { required: t("adminForm.nameRequired") })} className="input-field" />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">{t("adminForm.email")} *</label>
          <input
            type="email"
            {...register("email", { required: t("adminForm.emailRequired"), pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t("adminForm.emailInvalid") } })}
            className="input-field"
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>
        {!isEdit && (
          <div>
            <label className="block text-sm font-medium">{t("adminForm.password")} *</label>
            <input
              type="password"
              {...register("password", { required: t("adminForm.passwordRequired"), minLength: { value: 8, message: t("adminForm.passwordMinLength") } })}
              className="input-field"
            />
            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium">{t("adminForm.role")} *</label>
          <select {...register("role", { required: t("adminForm.roleRequired") })} className="input-field">
            <option value="admin">{t("adminForm.roleAdmin")}</option>
            <option value="superadmin">{t("adminForm.roleSuperadmin")}</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={isSubmitting} className="button-base button-primary">
            {isSubmitting ? t("adminForm.saving") : isEdit ? t("adminForm.update") : t("adminForm.create")}
          </button>
          <button type="button" onClick={() => navigate("/admin/admins")} className="button-base">
            {t("common.cancel")}
          </button>
        </div>
      </form>
    </main>
  );
}
