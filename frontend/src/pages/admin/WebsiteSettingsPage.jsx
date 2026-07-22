import { useEffect, useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Save, Upload, Trash2, Plus, Image as ImageIcon, X } from "lucide-react";
import websiteSettingsService from "../../services/websiteSettingsService.js";
import { useWebsiteSettings } from "../../context/WebsiteSettingsContext.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import SectionCard from "../../components/admin/forms/SectionCard.jsx";

function formatFileSize(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export default function WebsiteSettingsPage() {
  const { t } = useTranslation("admin");
  const { refreshSettings } = useWebsiteSettings();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, type: "", data: null });
  const logoInputRef = useRef(null);
  const faviconInputRef = useRef(null);
  const certImageInputsRef = useRef({});

  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFileName, setLogoFileName] = useState("");
  const [logoFileSize, setLogoFileSize] = useState(0);

  const [faviconPreview, setFaviconPreview] = useState(null);
  const [faviconFileName, setFaviconFileName] = useState("");
  const [faviconFileSize, setFaviconFileSize] = useState(0);

  const [certPreviews, setCertPreviews] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: getDefaultValues(),
  });

  const watchCertificates = watch("certificates");

  function getDefaultValues() {
    return {
      company: { name: "", tagline: "", address: "", city: "", state: "", pinCode: "" },
      contact: { phoneNumbers: [], whatsappNumber: "", email: "", officeHours: "" },
      location: { googleMapsEmbedUrl: "" },
      socialMedia: { facebook: "", instagram: "", linkedin: "", youtube: "", twitter: "" },
      website: { footerText: "", copyrightText: "" },
      certificates: [],
    };
  }

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    websiteSettingsService
      .adminGetSettings()
      .then((data) => {
        if (!mounted) return;
        setSettings(data);
        reset({
          company: data.company || getDefaultValues().company,
          contact: data.contact || getDefaultValues().contact,
          location: data.location || getDefaultValues().location,
          socialMedia: data.socialMedia || getDefaultValues().socialMedia,
          website: data.website || getDefaultValues().website,
          certificates: (data.certificates || []).map((c) => ({
            _id: c._id,
            title: c.title || "",
            description: c.description || "",
            imageUrl: c.imageUrl || "",
            displayOrder: c.displayOrder || 0,
            active: c.active !== false,
          })),
        });
      })
      .catch(() => {
        toast.error(t("websiteSettings.loadError"));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [reset, t]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const payload = {
        company: data.company,
        contact: {
          ...data.contact,
          phoneNumbers: (data.contact.phoneNumbers || []).filter((p) => p && p.trim()),
        },
        location: data.location,
        socialMedia: data.socialMedia,
        website: data.website,
        certificates: (data.certificates || []).map((c) => ({
          _id: c._id,
          title: c.title,
          description: c.description,
          imageUrl: c.imageUrl,
          displayOrder: Number(c.displayOrder) || 0,
          active: c.active,
        })),
      };
      const updated = await websiteSettingsService.adminUpdateSettings(payload);
      setSettings(updated);
      reset({
        company: updated.company,
        contact: updated.contact,
        location: updated.location,
        socialMedia: updated.socialMedia,
        website: updated.website,
        certificates: (updated.certificates || []).map((c) => ({
          _id: c._id,
          title: c.title || "",
          description: c.description || "",
          imageUrl: c.imageUrl || "",
          displayOrder: c.displayOrder || 0,
          active: c.active !== false,
        })),
      });
      toast.success(t("websiteSettings.saveSuccess"));
      refreshSettings();
    } catch (err) {
      toast.error(err.response?.data?.message || t("websiteSettings.saveError"));
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  const handleFileSelect = useCallback(
    (type, file) => {
      if (!file) return;
      const previewUrl = URL.createObjectURL(file);
      if (type === "logo") {
        setLogoPreview(previewUrl);
        setLogoFileName(file.name);
        setLogoFileSize(file.size);
      } else if (type === "favicon") {
        setFaviconPreview(previewUrl);
        setFaviconFileName(file.name);
        setFaviconFileSize(file.size);
      }
    },
    []
  );

  const cancelFileSelection = useCallback(
    (type) => {
      if (type === "logo") {
        if (logoPreview) URL.revokeObjectURL(logoPreview);
        setLogoPreview(null);
        setLogoFileName("");
        setLogoFileSize(0);
        if (logoInputRef.current) logoInputRef.current.value = "";
      } else if (type === "favicon") {
        if (faviconPreview) URL.revokeObjectURL(faviconPreview);
        setFaviconPreview(null);
        setFaviconFileName("");
        setFaviconFileSize(0);
        if (faviconInputRef.current) faviconInputRef.current.value = "";
      }
    },
    [logoPreview, faviconPreview]
  );

  const handleFileUpload = async (type, file) => {
    if (!file) return;
    try {
      let updated;
      if (type === "logo") {
        updated = await websiteSettingsService.adminUploadLogo(file);
      } else if (type === "favicon") {
        updated = await websiteSettingsService.adminUploadFavicon(file);
      }
      setSettings(updated);
      refreshSettings();
      cancelFileSelection(type);
      toast.success(
        t(type === "logo" ? "websiteSettings.logoUploadSuccess" : "websiteSettings.faviconUploadSuccess")
      );
    } catch (err) {
      toast.error(err.response?.data?.message || t("websiteSettings.uploadError"));
    }
  };

  const confirmLogoUpload = () => {
    const input = logoInputRef.current;
    if (input?.files?.[0]) {
      handleFileUpload("logo", input.files[0]);
    }
  };

  const confirmFaviconUpload = () => {
    const input = faviconInputRef.current;
    if (input?.files?.[0]) {
      handleFileUpload("favicon", input.files[0]);
    }
  };

  const handleCertFileSelect = useCallback((certIdOrIndex, file) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setCertPreviews((prev) => ({
      ...prev,
      [certIdOrIndex]: { url: previewUrl, name: file.name, size: file.size },
    }));
  }, []);

  const cancelCertFileSelection = useCallback((certIdOrIndex) => {
    setCertPreviews((prev) => {
      const next = { ...prev };
      if (next[certIdOrIndex]?.url) URL.revokeObjectURL(next[certIdOrIndex].url);
      delete next[certIdOrIndex];
      return next;
    });
  }, []);

  const handleCertImageUpload = async (certId, file) => {
    if (!file) return;
    try {
      const updated = await websiteSettingsService.adminUploadCertificateImage(certId, file);
      setSettings(updated);
      const certs = watch("certificates") || [];
      const updatedCert = (updated.certificates || []).find((c) => c._id === certId);
      if (updatedCert) {
        const idx = certs.findIndex((c) => c._id === certId);
        if (idx !== -1) {
          const newCerts = [...certs];
          newCerts[idx] = { ...newCerts[idx], imageUrl: updatedCert.imageUrl || "" };
          setValue("certificates", newCerts);
        }
      }
      cancelCertFileSelection(certId);
      refreshSettings();
      toast.success(t("websiteSettings.certImageUploadSuccess"));
    } catch (err) {
      toast.error(err.response?.data?.message || t("websiteSettings.uploadError"));
    }
  };

  const confirmCertImageUpload = (certIdOrIndex) => {
    const preview = certPreviews[certIdOrIndex];
    if (!preview) return;
    const inputEl = certImageInputsRef.current[certIdOrIndex];
    const file = inputEl?.files?.[0];
    if (file && certIdOrIndex && typeof certIdOrIndex === "string" && certIdOrIndex.startsWith("new-") === false) {
      handleCertImageUpload(certIdOrIndex, file);
    } else if (file) {
      toast.error(t("websiteSettings.saveFirstForCertImage"));
    }
  };

  const handleDeleteAsset = (assetType) => {
    setConfirmDialog({
      open: true,
      type: "deleteAsset",
      data: assetType,
    });
  };

  const confirmDeleteAsset = async () => {
    const assetType = confirmDialog.data;
    setConfirmDialog({ open: false, type: "", data: null });
    try {
      const updated = await websiteSettingsService.adminDeleteAsset(assetType);
      setSettings(updated);
      refreshSettings();
      toast.success(t("websiteSettings.assetDeleted"));
    } catch (err) {
      toast.error(err.response?.data?.message || t("websiteSettings.deleteError"));
    }
  };

  const handleDeleteCertificate = (index) => {
    setConfirmDialog({
      open: true,
      type: "deleteCertificate",
      data: index,
    });
  };

  const confirmDeleteCertificate = () => {
    const index = confirmDialog.data;
    setConfirmDialog({ open: false, type: "", data: null });
    const key = watch("certificates")?.[index]?._id || `new-${index}`;
    cancelCertFileSelection(key);
    removeCertificate(index);
  };

  const addPhoneNumber = () => {
    const phones = watch("contact.phoneNumbers") || [];
    setValue("contact.phoneNumbers", [...phones, ""]);
  };

  const removePhoneNumber = (index) => {
    const phones = watch("contact.phoneNumbers") || [];
    setValue("contact.phoneNumbers", phones.filter((_, i) => i !== index));
  };

  const addCertificate = () => {
    const certs = watch("certificates") || [];
    setValue("certificates", [
      ...certs,
      { title: "", description: "", imageUrl: "", displayOrder: certs.length, active: true },
    ]);
  };

  const removeCertificate = (index) => {
    const certs = watch("certificates") || [];
    setValue("certificates", certs.filter((_, i) => i !== index));
  };

  const updateCertificateField = (index, field, value) => {
    const certs = watch("certificates") || [];
    const newCerts = [...certs];
    newCerts[index] = { ...newCerts[index], [field]: value };
    setValue("certificates", newCerts);
  };

  if (loading) {
    return (
      <main className="page-container">
        <p>{t("common.loading")}</p>
      </main>
    );
  }

  const logoUrl = settings?.assets?.logo ? `/${settings.assets.logo}` : "";
  const faviconUrl = settings?.assets?.favicon ? `/${settings.assets.favicon}` : "";

  return (
    <main className="page-container" style={{ maxWidth: "56rem" }}>
      <h1 className="page-title">{t("websiteSettings.pageTitle")}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Company Information */}
        <SectionCard title={t("websiteSettings.sectionCompany")}>
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">{t("websiteSettings.companyName")}</label>
              <input {...register("company.name")} className="input-field" placeholder={t("websiteSettings.companyNamePlaceholder")} />
            </div>
            <div className="form-field">
              <label className="form-label">{t("websiteSettings.tagline")}</label>
              <input {...register("company.tagline")} className="input-field" placeholder={t("websiteSettings.taglinePlaceholder")} />
            </div>
            <div className="form-field" style={{ gridColumn: "1 / -1" }}>
              <label className="form-label">{t("websiteSettings.address")}</label>
              <input {...register("company.address")} className="input-field" placeholder={t("websiteSettings.addressPlaceholder")} />
            </div>
            <div className="form-field">
              <label className="form-label">{t("websiteSettings.city")}</label>
              <input {...register("company.city")} className="input-field" placeholder={t("websiteSettings.cityPlaceholder")} />
            </div>
            <div className="form-field">
              <label className="form-label">{t("websiteSettings.state")}</label>
              <input {...register("company.state")} className="input-field" placeholder={t("websiteSettings.statePlaceholder")} />
            </div>
            <div className="form-field">
              <label className="form-label">{t("websiteSettings.pinCode")}</label>
              <input {...register("company.pinCode")} className="input-field" placeholder={t("websiteSettings.pinCodePlaceholder")} />
            </div>
          </div>
        </SectionCard>

        {/* Contact Information */}
        <SectionCard title={t("websiteSettings.sectionContact")}>
          <div className="form-grid">
            <div className="form-field" style={{ gridColumn: "1 / -1" }}>
              <label className="form-label">{t("websiteSettings.phoneNumbers")}</label>
              {(watch("contact.phoneNumbers") || []).map((phone, index) => (
                <div key={index} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <input
                    value={phone}
                    onChange={(e) => {
                      const phones = watch("contact.phoneNumbers") || [];
                      const newPhones = [...phones];
                      newPhones[index] = e.target.value;
                      setValue("contact.phoneNumbers", newPhones);
                    }}
                    className="input-field"
                    placeholder="+91-XXXXXXXXXX"
                    style={{ flex: 1 }}
                  />
                  <button type="button" onClick={() => removePhoneNumber(index)} className="button-base button-danger" style={{ padding: "0.5rem" }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addPhoneNumber} className="button-base" style={{ marginTop: "0.25rem" }}>
                <Plus size={14} /> {t("websiteSettings.addPhoneNumber")}
              </button>
            </div>
            <div className="form-field">
              <label className="form-label">{t("websiteSettings.whatsappNumber")}</label>
              <input {...register("contact.whatsappNumber")} className="input-field" placeholder="+91-XXXXXXXXXX" />
            </div>
            <div className="form-field">
              <label className="form-label">{t("websiteSettings.emailAddress")}</label>
              <input {...register("contact.email")} className="input-field" placeholder="contact@example.com" type="email" />
              {errors.contact?.email && <p className="form-error">{errors.contact.email.message}</p>}
            </div>
            <div className="form-field">
              <label className="form-label">{t("websiteSettings.officeHours")}</label>
              <input {...register("contact.officeHours")} className="input-field" placeholder={t("websiteSettings.officeHoursPlaceholder")} />
            </div>
          </div>
        </SectionCard>

        {/* Location */}
        <SectionCard title={t("websiteSettings.sectionLocation")}>
          <div className="form-grid">
            <div className="form-field" style={{ gridColumn: "1 / -1" }}>
              <label className="form-label">{t("websiteSettings.googleMapsEmbedUrl")}</label>
              <input {...register("location.googleMapsEmbedUrl")} className="input-field" placeholder="https://www.google.com/maps/embed?..." />
              <p className="form-help">{t("websiteSettings.googleMapsHelp")}</p>
            </div>
          </div>
        </SectionCard>

        {/* Social Media */}
        <SectionCard title={t("websiteSettings.sectionSocialMedia")}>
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">{t("websiteSettings.facebook")}</label>
              <input {...register("socialMedia.facebook")} className="input-field" placeholder="https://facebook.com/..." />
            </div>
            <div className="form-field">
              <label className="form-label">{t("websiteSettings.instagram")}</label>
              <input {...register("socialMedia.instagram")} className="input-field" placeholder="https://instagram.com/..." />
            </div>
            <div className="form-field">
              <label className="form-label">{t("websiteSettings.linkedin")}</label>
              <input {...register("socialMedia.linkedin")} className="input-field" placeholder="https://linkedin.com/..." />
            </div>
            <div className="form-field">
              <label className="form-label">{t("websiteSettings.youtube")}</label>
              <input {...register("socialMedia.youtube")} className="input-field" placeholder="https://youtube.com/..." />
            </div>
            <div className="form-field">
              <label className="form-label">{t("websiteSettings.twitter")}</label>
              <input {...register("socialMedia.twitter")} className="input-field" placeholder="https://x.com/..." />
            </div>
          </div>
        </SectionCard>

        {/* Website */}
        <SectionCard title={t("websiteSettings.sectionWebsite")}>
          <div className="form-grid">
            <div className="form-field" style={{ gridColumn: "1 / -1" }}>
              <label className="form-label">{t("websiteSettings.footerText")}</label>
              <textarea {...register("website.footerText")} className="input-field" rows={2} placeholder={t("websiteSettings.footerTextPlaceholder")} />
            </div>
            <div className="form-field" style={{ gridColumn: "1 / -1" }}>
              <label className="form-label">{t("websiteSettings.copyrightText")}</label>
              <input {...register("website.copyrightText")} className="input-field" placeholder={t("websiteSettings.copyrightTextPlaceholder")} />
            </div>
          </div>
        </SectionCard>

        {/* Branding */}
        <SectionCard title={t("websiteSettings.sectionBranding")}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            {/* Logo */}
            <div className="form-field" style={{ flex: "1 1 260px", minWidth: 0 }}>
              <label className="form-label">{t("websiteSettings.companyLogo")}</label>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                {/* Preview: selected file OR existing logo */}
                {logoPreview ? (
                  <div style={{ position: "relative" }}>
                    <img
                      src={logoPreview}
                      alt={t("websiteSettings.logoPreviewAlt")}
                      style={{ maxHeight: "80px", borderRadius: "0.5rem", border: "1px solid #e5e7eb" }}
                    />
                    <button
                      type="button"
                      onClick={() => cancelFileSelection("logo")}
                      style={{ position: "absolute", top: "-8px", right: "-8px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "50%", width: "24px", height: "24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : logoUrl ? (
                  <div style={{ position: "relative" }}>
                    <img
                      src={logoUrl}
                      alt={t("websiteSettings.logoPreviewAlt")}
                      style={{ maxHeight: "80px", borderRadius: "0.5rem", border: "1px solid #e5e7eb" }}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling && (e.target.nextSibling.style.display = "flex");
                      }}
                    />
                    <div style={{ width: "80px", height: "80px", border: "2px dashed #d1d5db", borderRadius: "0.5rem", display: "none", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>
                      <ImageIcon size={24} />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteAsset("logo")}
                      style={{ position: "absolute", top: "-8px", right: "-8px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "50%", width: "24px", height: "24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ) : (
                  <div style={{ width: "80px", height: "80px", border: "2px dashed #d1d5db", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>
                    <ImageIcon size={24} />
                  </div>
                )}
                <div>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileSelect("logo", e.target.files?.[0])}
                  />
                  {logoPreview ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <p style={{ fontSize: "0.8rem", color: "#374151", margin: 0 }}>{logoFileName}</p>
                      <p style={{ fontSize: "0.75rem", color: "#6b7280", margin: 0 }}>{formatFileSize(logoFileSize)}</p>
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <button type="button" onClick={confirmLogoUpload} className="button-base button-primary">
                          <Save size={14} /> {t("websiteSettings.saveLogo")}
                        </button>
                        <button type="button" onClick={() => cancelFileSelection("logo")} className="button-base">
                          <X size={14} /> {t("websiteSettings.cancel")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button type="button" onClick={() => logoInputRef.current?.click()} className="button-base">
                        <Upload size={14} /> {logoUrl ? t("websiteSettings.replace") : t("websiteSettings.uploadLogo")}
                      </button>
                      <p className="form-help">{t("websiteSettings.imageFormatsHint")}</p>
                      <p className="form-help">{t("websiteSettings.logoDimensionsHint")}</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Favicon */}
            <div className="form-field" style={{ flex: "1 1 260px", minWidth: 0 }}>
              <label className="form-label">{t("websiteSettings.favicon")}</label>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                {faviconPreview ? (
                  <div style={{ position: "relative" }}>
                    <img
                      src={faviconPreview}
                      alt={t("websiteSettings.faviconPreviewAlt")}
                      style={{ width: "48px", height: "48px", borderRadius: "0.25rem", border: "1px solid #e5e7eb", objectFit: "contain" }}
                    />
                    <button
                      type="button"
                      onClick={() => cancelFileSelection("favicon")}
                      style={{ position: "absolute", top: "-8px", right: "-8px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "50%", width: "24px", height: "24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : faviconUrl ? (
                  <div style={{ position: "relative" }}>
                    <img
                      src={faviconUrl}
                      alt={t("websiteSettings.faviconPreviewAlt")}
                      style={{ width: "48px", height: "48px", borderRadius: "0.25rem", border: "1px solid #e5e7eb", objectFit: "contain" }}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling && (e.target.nextSibling.style.display = "flex");
                      }}
                    />
                    <div style={{ width: "48px", height: "48px", border: "2px dashed #d1d5db", borderRadius: "0.25rem", display: "none", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>
                      <ImageIcon size={16} />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteAsset("favicon")}
                      style={{ position: "absolute", top: "-8px", right: "-8px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "50%", width: "24px", height: "24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ) : (
                  <div style={{ width: "48px", height: "48px", border: "2px dashed #d1d5db", borderRadius: "0.25rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>
                    <ImageIcon size={16} />
                  </div>
                )}
                <div>
                  <input
                    ref={faviconInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileSelect("favicon", e.target.files?.[0])}
                  />
                  {faviconPreview ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <p style={{ fontSize: "0.8rem", color: "#374151", margin: 0 }}>{faviconFileName}</p>
                      <p style={{ fontSize: "0.75rem", color: "#6b7280", margin: 0 }}>{formatFileSize(faviconFileSize)}</p>
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <button type="button" onClick={confirmFaviconUpload} className="button-base button-primary">
                          <Save size={14} /> {t("websiteSettings.saveFavicon")}
                        </button>
                        <button type="button" onClick={() => cancelFileSelection("favicon")} className="button-base">
                          <X size={14} /> {t("websiteSettings.cancel")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button type="button" onClick={() => faviconInputRef.current?.click()} className="button-base">
                        <Upload size={14} /> {faviconUrl ? t("websiteSettings.replace") : t("websiteSettings.uploadFavicon")}
                      </button>
                      <p className="form-help">{t("websiteSettings.imageFormatsHint")}</p>
                      <p className="form-help">{t("websiteSettings.faviconDimensionsHint")}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Certificates & Licences */}
        <SectionCard title={t("websiteSettings.sectionCertificates")} badge={`${(watchCertificates || []).length} ${t("websiteSettings.items")}`}>
          <div>
            {(watchCertificates || []).length === 0 && (
              <div style={{ textAlign: "center", padding: "2rem 1rem", color: "#6b7280", border: "2px dashed #e5e7eb", borderRadius: "0.5rem", marginBottom: "1rem" }}>
                <ImageIcon size={32} style={{ marginBottom: "0.5rem", opacity: 0.5 }} />
                <p style={{ margin: "0 0 0.25rem", fontWeight: 600 }}>{t("websiteSettings.noCertificatesTitle")}</p>
                <p style={{ margin: 0, fontSize: "0.85rem" }}>{t("websiteSettings.noCertificatesHint")}</p>
              </div>
            )}
            {(watchCertificates || []).map((cert, index) => {
              const certKey = cert._id || `new-${index}`;
              const certPreview = certPreviews[certKey];
              return (
                <div
                  key={certKey}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    marginBottom: "1rem",
                    background: cert.active ? "#fafafa" : "#f3f4f6",
                    opacity: cert.active ? 1 : 0.75,
                    transition: "background 0.2s, opacity 0.2s",
                  }}
                >
                  {/* Card header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                    <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "#374151" }}>
                      {t("websiteSettings.certificateNumber", { num: index + 1 })}
                    </span>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "0.25rem",
                          background: cert.active ? "#dcfce7" : "#f3f4f6",
                          color: cert.active ? "#166534" : "#6b7280",
                          fontWeight: cert.active ? 600 : 400,
                          transition: "background 0.2s, color 0.2s",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={cert.active}
                          onChange={(e) => updateCertificateField(index, "active", e.target.checked)}
                          style={{ accentColor: "#16a34a" }}
                        />
                        {t("websiteSettings.active")}
                      </label>
                      <button
                        type="button"
                        onClick={() => handleDeleteCertificate(index)}
                        className="button-base"
                        style={{ padding: "0.35rem", color: "#ef4444" }}
                        title={t("websiteSettings.deleteCertificate")}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-field">
                      <label className="form-label">{t("websiteSettings.certTitle")}</label>
                      <input
                        value={cert.title}
                        onChange={(e) => updateCertificateField(index, "title", e.target.value)}
                        className="input-field"
                        placeholder={t("websiteSettings.certTitlePlaceholder")}
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">{t("websiteSettings.displayOrder")}</label>
                      <input
                        type="number"
                        value={cert.displayOrder}
                        onChange={(e) => updateCertificateField(index, "displayOrder", parseInt(e.target.value) || 0)}
                        className="input-field"
                        min="0"
                      />
                    </div>
                    <div className="form-field" style={{ gridColumn: "1 / -1" }}>
                      <label className="form-label">{t("websiteSettings.certDescription")}</label>
                      <textarea
                        value={cert.description}
                        onChange={(e) => updateCertificateField(index, "description", e.target.value)}
                        className="input-field"
                        rows={2}
                        placeholder={t("websiteSettings.certDescriptionPlaceholder")}
                      />
                    </div>
                    <div className="form-field" style={{ gridColumn: "1 / -1" }}>
                      <label className="form-label">{t("websiteSettings.certImage")}</label>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                        {certPreview ? (
                          <div style={{ position: "relative" }}>
                            <img
                              src={certPreview.url}
                              alt={t("websiteSettings.certImagePreviewAlt")}
                              style={{ maxHeight: "60px", borderRadius: "0.25rem", border: "1px solid #e5e7eb" }}
                            />
                            <button
                              type="button"
                              onClick={() => cancelCertFileSelection(certKey)}
                              style={{ position: "absolute", top: "-8px", right: "-8px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "50%", width: "22px", height: "22px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ) : cert.imageUrl ? (
                          <div style={{ position: "relative" }}>
                            <img
                              src={`/${cert.imageUrl}`}
                              alt={cert.title}
                              style={{ maxHeight: "60px", borderRadius: "0.25rem", border: "1px solid #e5e7eb" }}
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling && (e.target.nextSibling.style.display = "flex");
                              }}
                            />
                            <div style={{ width: "60px", height: "60px", border: "2px dashed #d1d5db", borderRadius: "0.25rem", display: "none", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>
                              <ImageIcon size={16} />
                            </div>
                          </div>
                        ) : (
                          <div style={{ width: "60px", height: "60px", border: "2px dashed #d1d5db", borderRadius: "0.25rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>
                            <ImageIcon size={16} />
                          </div>
                        )}
                        <div>
                          <input
                            ref={(el) => { certImageInputsRef.current[certKey] = el; }}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleCertFileSelect(certKey, file);
                              }
                              e.target.value = "";
                            }}
                          />
                          {certPreview ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                              <p style={{ fontSize: "0.8rem", color: "#374151", margin: 0 }}>{certPreview.name}</p>
                              <p style={{ fontSize: "0.75rem", color: "#6b7280", margin: 0 }}>{formatFileSize(certPreview.size)}</p>
                              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (!cert._id) {
                                      toast.error(t("websiteSettings.saveFirstForCertImage"));
                                      return;
                                    }
                                    const inputEl = certImageInputsRef.current[certKey];
                                    const file = inputEl?.files?.[0];
                                    if (file) handleCertImageUpload(cert._id, file);
                                  }}
                                  className="button-base button-primary"
                                  style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }}
                                >
                                  <Save size={12} /> {t("websiteSettings.saveLogo")}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => cancelCertFileSelection(certKey)}
                                  className="button-base"
                                  style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }}
                                >
                                  <X size={12} /> {t("websiteSettings.cancel")}
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  if (!cert._id) {
                                    toast(t("websiteSettings.saveFirstForCertImage"), { icon: "ℹ️" });
                                    return;
                                  }
                                  certImageInputsRef.current[certKey]?.click();
                                }}
                                className="button-base"
                                disabled={!cert._id}
                                style={!cert._id ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                              >
                                <Upload size={14} /> {cert.imageUrl ? t("websiteSettings.replace") : t("websiteSettings.upload")}
                              </button>
                              <p className="form-help" style={{ marginTop: "0.35rem" }}>{t("websiteSettings.imageFormatsHint")}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <button type="button" onClick={addCertificate} className="button-base" style={{ marginTop: "0.5rem" }}>
              <Plus size={14} /> {t("websiteSettings.addCertificate")}
            </button>
          </div>
        </SectionCard>

        {/* Save Button */}
        <div style={{ marginTop: "1.5rem", paddingBottom: "2rem" }}>
          <button type="submit" disabled={saving} className="button-base button-primary">
            <Save size={16} />
            {saving ? t("websiteSettings.saving") : t("websiteSettings.saveSettings")}
          </button>
        </div>
      </form>

      <ConfirmDialog
        open={confirmDialog.open}
        title={
          confirmDialog.type === "deleteAsset"
            ? t("websiteSettings.confirmDeleteAssetTitle")
            : t("websiteSettings.confirmDeleteCertTitle")
        }
        message={
          confirmDialog.type === "deleteAsset"
            ? t("websiteSettings.confirmDeleteAssetMessage", { type: confirmDialog.data })
            : t("websiteSettings.confirmDeleteCertMessage")
        }
        onConfirm={
          confirmDialog.type === "deleteAsset"
            ? confirmDeleteAsset
            : confirmDialog.type === "deleteCertificate"
              ? confirmDeleteCertificate
              : () => setConfirmDialog({ open: false, type: "", data: null })
        }
        onCancel={() => setConfirmDialog({ open: false, type: "", data: null })}
      />
    </main>
  );
}
