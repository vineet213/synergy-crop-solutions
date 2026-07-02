import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import leadService from "../../services/leadService.js";
import Button from "../ui/Button.jsx";

export default function ContactForm() {
  const { t } = useTranslation("common");
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { name: "", email: "", phone: "", company: "", message: "" },
  });

  const onSubmit = async (data) => {
    try {
      await leadService.createPublicLead(data);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error(t("page.contactForm.failed"));
    }
  };

  if (submitted) {
    return (
      <div className="card-shell" style={{ padding: "2rem", textAlign: "center" }}>
        <h3 style={{ margin: "0 0 0.5rem", color: "var(--brand)" }}>{t("page.contactForm.thankYou")}</h3>
        <p className="card-description">{t("page.contactForm.successMessage")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-block">
      <div>
        <label className="block text-sm font-medium">{t("page.contactForm.name")}</label>
        <input {...register("name", { required: t("page.contactForm.nameRequired") })} className="input-field" placeholder={t("page.contactForm.namePlaceholder")} />
        {errors.name && <p className="form-field-error">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">{t("page.contactForm.email")}</label>
        <input type="email" {...register("email", { required: t("page.contactForm.emailRequired"), pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: t("page.contactForm.emailInvalid") || "Invalid email address" } })} className="input-field" placeholder={t("page.contactForm.emailPlaceholder")} />
        {errors.email && <p className="form-field-error">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">{t("page.contactForm.phone")}</label>
        <input type="tel" {...register("phone", { pattern: { value: /^[+]?[\d\s()-]{7,20}$/, message: t("page.contactForm.phoneInvalid") || "Invalid phone number" } })} className="input-field" placeholder={t("page.contactForm.phonePlaceholder")} />
          {errors.phone && <p className="form-field-error">{errors.phone.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">{t("page.contactForm.company")}</label>
        <input {...register("company")} className="input-field" placeholder={t("page.contactForm.companyPlaceholder")} />
      </div>
      <div>
        <label className="block text-sm font-medium">{t("page.contactForm.message")}</label>
        <textarea {...register("message")} className="input-field" rows={4} placeholder={t("page.contactForm.messagePlaceholder")} />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t("page.contactForm.submitting") : t("page.contactForm.submit")}
      </Button>
    </form>
  );
}
