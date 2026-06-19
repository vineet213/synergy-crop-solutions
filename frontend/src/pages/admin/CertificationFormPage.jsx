import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import certificationService from "../../services/certificationService.js";

export default function CertificationFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      title: "",
      issuingAuthority: "",
      certificateNumber: "",
      description: "",
      imageUrl: "",
      documentUrl: "",
      issueDate: "",
      expiryDate: "",
      isFeatured: false,
      status: "active",
    },
  });

  useEffect(() => {
    if (!isEdit) return;
    let mounted = true;
    setLoading(true);
    certificationService.adminGetCertification(id)
      .then((data) => {
        if (!mounted) return;
        reset({
          ...data,
          issueDate: data.issueDate ? data.issueDate.slice(0, 10) : "",
          expiryDate: data.expiryDate ? data.expiryDate.slice(0, 10) : "",
          isFeatured: data.isFeatured ?? false,
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load certification");
        navigate("/admin/certifications");
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [id, isEdit, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        issueDate: data.issueDate || undefined,
        expiryDate: data.expiryDate || undefined,
        isFeatured: Boolean(data.isFeatured),
      };
      if (isEdit) {
        await certificationService.adminUpdateCertification(id, payload);
      } else {
        await certificationService.adminCreateCertification(payload);
      }
      navigate("/admin/certifications");
    } catch (err) {
      console.error(err);
      alert("Failed to save certification");
    }
  };

  if (loading) return <main className="page-container"><p>Loading&hellip;</p></main>;

  return (
    <main className="page-container">
      <h1 className="page-title">{isEdit ? "Edit Certification" : "Create Certification"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium">Title *</label>
          <input {...register("title", { required: "Title is required" })} className="input-field" />
          {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Issuing Authority</label>
          <input {...register("issuingAuthority")} className="input-field" placeholder="e.g. ISO, FSSAI" />
        </div>
        <div>
          <label className="block text-sm font-medium">Certificate Number</label>
          <input {...register("certificateNumber")} className="input-field" placeholder="e.g. CERT-2024-001" />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea {...register("description")} className="input-field" rows={3} />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input {...register("imageUrl")} className="input-field" placeholder="https://..." />
        </div>
        <div>
          <label className="block text-sm font-medium">Document URL</label>
          <input {...register("documentUrl")} className="input-field" placeholder="https://..." />
        </div>
        <div>
          <label className="block text-sm font-medium">Issue Date</label>
          <input type="date" {...register("issueDate")} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium">Expiry Date</label>
          <input type="date" {...register("expiryDate")} className="input-field" />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" {...register("isFeatured")} />
            Featured certification
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select {...register("status")} className="input-field">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={isSubmitting} className="button-base button-primary">
            {isSubmitting ? "Saving&hellip;" : isEdit ? "Update" : "Create"}
          </button>
          <button type="button" onClick={() => navigate("/admin/certifications")} className="button-base">
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
