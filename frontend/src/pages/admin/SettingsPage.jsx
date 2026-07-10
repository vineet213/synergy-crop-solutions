import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import adminService from "../../services/adminService.js";

export default function SettingsPage() {
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (data) => {
    try {
      await adminService.changePassword(data.currentPassword, data.newPassword);
      toast.success("Password updated successfully");
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <main className="page-container">
      <h1 className="page-title">Settings</h1>

      <div className="card-shell mb-6" style={{ maxWidth: "28rem" }}>
        <h2 className="font-semibold mb-2">Profile</h2>
        <p className="text-sm text-gray-600">Name: {user?.name}</p>
        <p className="text-sm text-gray-600">Email: {user?.email}</p>
        <p className="text-sm text-gray-600">Role: <span className={`badge badge-${user?.role === "superadmin" ? "brand" : "soft"}`}>{user?.role}</span></p>
      </div>

      <h2 className="font-semibold mb-3">Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium">Current Password *</label>
          <input
            type="password"
            {...register("currentPassword", { required: "Current password is required" })}
            className="input-field"
          />
          {errors.currentPassword && <p className="text-sm text-red-600">{errors.currentPassword.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">New Password *</label>
          <input
            type="password"
            {...register("newPassword", { required: "New password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
            className="input-field"
          />
          {errors.newPassword && <p className="text-sm text-red-600">{errors.newPassword.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Confirm New Password *</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (val, formValues) => val === formValues.newPassword || "Passwords do not match",
            })}
            className="input-field"
          />
          {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
        </div>
        <div>
          <button type="submit" disabled={isSubmitting} className="button-base button-primary">
            {isSubmitting ? "Updating…" : "Update Password"}
          </button>
        </div>
      </form>
    </main>
  );
}
