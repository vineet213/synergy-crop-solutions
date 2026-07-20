import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import certificationService from "../../services/certificationService.js";
import { useTranslation } from "react-i18next";

export default function CertificationFormPage() {
  const { t } = useTranslation("admin");
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
        toast.error(t("certificationForm.loadFailed"));
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
      toast.error(t("certificationForm.saveFailed"));
    }
  };

  if (loading) return <main className="page-container"><p>{t("common.loading")}</p></main>;

  return (
    <main className="page-container">
      <h1 className="page-title">{isEdit ? t("certificationForm.editTitle") : t("certificationForm.createTitle")}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium">{t("certificationForm.fieldTitle")}</label>
          <input {...register("title", { required: t("certificationForm.errorTitleRequired") })} className="input-field" />
          {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">{t("certificationForm.fieldIssuingAuthority")}</label>
          <input {...register("issuingAuthority")} className="input-field" placeholder={t("certificationForm.placeholderIssuingAuthority")} />
        </div>
        <div>
          <label className="block text-sm font-medium">{t("certificationForm.fieldCertificateNumber")}</label>
          <input {...register("certificateNumber")} className="input-field" placeholder={t("certificationForm.placeholderCertificateNumber")} />
        </div>
        <div>
          <label className="block text-sm font-medium">{t("certificationForm.fieldDescription")}</label>
          <textarea {...register("description")} className="input-field" rows={3} />
        </div>
        <div>
          <label className="block text-sm font-medium">{t("certificationForm.fieldImageUrl")}</label>
          <input {...register("imageUrl")} className="input-field" placeholder={t("certificationForm.placeholderImageUrl")} />
        </div>
        <div>
          <label className="block text-sm font-medium">{t("certificationForm.fieldDocumentUrl")}</label>
          <input {...register("documentUrl")} className="input-field" placeholder={t("certificationForm.placeholderDocumentUrl")} />
        </div>
        <div>
          <label className="block text-sm font-medium">{t("certificationForm.fieldIssueDate")}</label>
          <input type="date" {...register("issueDate")} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium">{t("certificationForm.fieldExpiryDate")}</label>
          <input type="date" {...register("expiryDate")} className="input-field" />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" {...register("isFeatured")} />
            {t("certificationForm.fieldFeatured")}
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium">{t("certificationForm.fieldStatus")}</label>
          <select {...register("status")} className="input-field">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={isSubmitting} className="button-base button-primary">
            {isSubmitting ? t("certificationForm.saving") : isEdit ? t("certificationForm.submitUpdate") : t("certificationForm.submitCreate")}
          </button>
          <button type="button" onClick={() => navigate("/admin/certifications")} className="button-base">
            {t("common.cancel")}
          </button>
        </div>
      </form>
    </main>
  );
}
