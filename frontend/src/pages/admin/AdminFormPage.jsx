import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import adminService from "../../services/adminService.js";

export default function AdminFormPage() {
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
        console.error(err);
        toast.error("Failed to load admin");
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
          toast.error("Password is required for new admins");
          return;
        }
        payload.password = data.password;
      } else if (data.password) {
        payload.password = data.password;
      }

      if (isEdit) {
        await adminService.adminUpdateAdmin(id, payload);
      } else {
        await adminService.adminCreateAdmin(payload);
      }
      navigate("/admin/admins");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save admin");
    }
  };

  if (loading) return <main className="page-container"><p>Loading…</p></main>;

  return (
    <main className="page-container">
      <h1 className="page-title">{isEdit ? "Edit Admin" : "Create Admin"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium">Name *</label>
          <input {...register("name", { required: "Name is required" })} className="input-field" />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Email *</label>
          <input
            type="email"
            {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })}
            className="input-field"
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">
            {isEdit ? "New Password (leave blank to keep current)" : "Password *"}
          </label>
          <input
            type="password"
            {...register("password", !isEdit ? { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } } : { minLength: { value: 6, message: "Password must be at least 6 characters" } })}
            className="input-field"
            placeholder={isEdit ? "••••••••" : ""}
          />
          {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Role *</label>
          <select {...register("role", { required: "Role is required" })} className="input-field">
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={isSubmitting} className="button-base button-primary">
            {isSubmitting ? "Saving…" : isEdit ? "Update" : "Create"}
          </button>
          <button type="button" onClick={() => navigate("/admin/admins")} className="button-base">
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
