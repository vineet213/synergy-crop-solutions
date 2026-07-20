import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import distributorService from "../../services/distributorService.js";

export default function DistributorFormPage() {
  const { t } = useTranslation("admin");
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      "address.street": "",
      "address.city": "",
      "address.state": "",
      "address.zip": "",
      serviceableStates: "",
      products: "",
      certifications: "",
      status: "active",
      website: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!isEdit) return;
    let mounted = true;
    setLoading(true);
    distributorService.adminGetDistributor(id)
      .then((data) => {
        if (!mounted) return;
        reset({
          ...data,
          "address.street": data.address?.street || "",
          "address.city": data.address?.city || "",
          "address.state": data.address?.state || "",
          "address.zip": data.address?.zip || "",
          serviceableStates: (data.serviceableStates || []).join(", "),
          products: (data.products || []).join(", "),
          certifications: (data.certifications || []).join(", "),
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error(t("distributorForm.loadFailed"));
        navigate("/admin/distributors");
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [id, isEdit, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        address: {
          street: data["address.street"],
          city: data["address.city"],
          state: data["address.state"],
          zip: data["address.zip"],
        },
        serviceableStates: data.serviceableStates.split(",").map((s) => s.trim()).filter(Boolean),
        products: data.products.split(",").map((s) => s.trim()).filter(Boolean),
        certifications: data.certifications.split(",").map((s) => s.trim()).filter(Boolean),
      };
      delete payload["address.street"];
      delete payload["address.city"];
      delete payload["address.state"];
      delete payload["address.zip"];

      if (isEdit) {
        await distributorService.adminUpdateDistributor(id, payload);
      } else {
        await distributorService.adminCreateDistributor(payload);
      }
      navigate("/admin/distributors");
    } catch (err) {
      console.error(err);
      toast.error(t("distributorForm.saveFailed"));
    }
  };

  if (loading) return <main className="page-container"><p>{t("common.loading")}</p></main>;

  return (
    <main className="page-container">
      <h1 className="page-title">{isEdit ? t("distributorForm.editTitle") : t("distributorForm.createTitle")}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium">{t("distributorForm.fieldName")}</label>
          <input {...register("name", { required: t("distributorForm.errorNameRequired") })} className="input-field" />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">{t("distributorForm.fieldCompany")}</label>
          <input {...register("company", { required: t("distributorForm.errorCompanyRequired") })} className="input-field" />
          {errors.company && <p className="text-sm text-red-600">{errors.company.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">{t("distributorForm.fieldEmail")}</label>
          <input type="email" {...register("email", { required: t("distributorForm.errorEmailRequired") })} className="input-field" />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">{t("distributorForm.fieldPhone")}</label>
          <input {...register("phone", { required: t("distributorForm.errorPhoneRequired") })} className="input-field" />
          {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">{t("distributorForm.fieldStreet")}</label>
          <input {...register("address.street")} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium">{t("distributorForm.fieldCity")}</label>
          <input {...register("address.city", { required: t("distributorForm.errorCityRequired") })} className="input-field" />
          {errors["address.city"] && <p className="text-sm text-red-600">{errors["address.city"].message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">{t("distributorForm.fieldState")}</label>
          <input {...register("address.state", { required: t("distributorForm.errorStateRequired") })} className="input-field" />
          {errors["address.state"] && <p className="text-sm text-red-600">{errors["address.state"].message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">{t("distributorForm.fieldZip")}</label>
          <input {...register("address.zip")} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium">{t("distributorForm.fieldServiceableStates")}</label>
          <input {...register("serviceableStates")} className="input-field" placeholder={t("distributorForm.placeholderServiceableStates")} />
        </div>
        <div>
          <label className="block text-sm font-medium">{t("distributorForm.fieldProducts")}</label>
          <input {...register("products")} className="input-field" placeholder={t("distributorForm.placeholderProducts")} />
        </div>
        <div>
          <label className="block text-sm font-medium">{t("distributorForm.fieldCertifications")}</label>
          <input {...register("certifications")} className="input-field" placeholder={t("distributorForm.placeholderCertifications")} />
        </div>
        <div>
          <label className="block text-sm font-medium">{t("distributorForm.fieldWebsite")}</label>
          <input {...register("website")} className="input-field" placeholder={t("distributorForm.placeholderWebsite")} />
        </div>
        <div>
          <label className="block text-sm font-medium">{t("distributorForm.fieldStatus")}</label>
          <select {...register("status")} className="input-field">
            <option value="active">{t("common.active")}</option>
            <option value="inactive">{t("common.inactive")}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">{t("distributorForm.fieldDescription")}</label>
          <textarea {...register("description")} className="input-field" rows={3} />
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={isSubmitting} className="button-base button-primary">
            {isSubmitting ? t("common.saving") : isEdit ? t("distributorForm.submitUpdate") : t("distributorForm.submitCreate")}
          </button>
          <button type="button" onClick={() => navigate("/admin/distributors")} className="button-base">
            {t("common.cancel")}
          </button>
        </div>
      </form>
    </main>
  );
}
