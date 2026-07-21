import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { Save, ArrowLeft } from "lucide-react";
import productService from "../../services/productService.js";
import SectionCard from "../../components/admin/forms/SectionCard.jsx";
import TextField from "../../components/admin/forms/TextField.jsx";
import SelectField from "../../components/admin/forms/SelectField.jsx";
import ImageManager from "../../components/admin/forms/ImageManager.jsx";
import BrochureManager from "../../components/admin/forms/BrochureManager.jsx";
import LocaleTabs from "../../components/admin/forms/LocaleTabs.jsx";
import LocalizedTextField from "../../components/admin/forms/LocalizedTextField.jsx";
import LocalizedTextAreaField from "../../components/admin/forms/LocalizedTextAreaField.jsx";
import LocalizedDynamicListField from "../../components/admin/forms/LocalizedDynamicListField.jsx";
import LocalizedFAQEditor from "../../components/admin/forms/LocalizedFAQEditor.jsx";

const CATEGORIES = [
  { value: "Bio Fertilizer", label: "Bio Fertilizer" },
  { value: "Bio Pesticide", label: "Bio Pesticide" },
  { value: "Consortium", label: "Consortium" },
  { value: "Liquid Nutrition", label: "Liquid Nutrition" },
  { value: "Organic Inputs", label: "Organic Inputs" },
];

function loc(en = "") {
  return { en, hi: "", mr: "", kn: "" };
}

const DEFAULT_VALUES = {
  name: loc(),
  slug: "",
  category: "Bio Fertilizer",
  subCategory: loc(),
  scientificName: loc(),
  published: true,
  featured: false,
  displayOrder: 0,
  shortDescription: loc(),
  longDescription: loc(),
  overview: loc(),
  composition: loc(),
  activeIngredients: loc(),
  formulation: loc(),
  modeOfAction: loc(),
  technicalSpecifications: loc(),
  dosage: loc(),
  applicationMethod: loc(),
  frequency: loc(),
  growthStage: loc(),
  benefits: [],
  features: [],
  crops: [],
  diseases: [],
  pests: [],
  nutrientDeficiencies: [],
  suitableRegions: [],
  precautions: loc(),
  storageInstructions: loc(),
  compatibility: loc(),
  shelfLife: loc(),
  metaTitle: loc(),
  metaDescription: loc(),
  keywords: [],
  images: [],
  brochure: null,
  faqs: [],
};

function ensureLocalizedObj(v) {
  if (!v) return { en: "", hi: "", mr: "", kn: "" };
  if (typeof v === "string") return { en: v, hi: "", mr: "", kn: "" };
  if (typeof v === "object") return { en: v.en || "", hi: v.hi || "", mr: v.mr || "", kn: v.kn || "" };
  return { en: "", hi: "", mr: "", kn: "" };
}

function ensureLocalizedArray(v) {
  if (!Array.isArray(v)) return [];
  return v.map((item) => {
    if (typeof item === "string") return item;
    if (item && typeof item === "object") return item;
    return String(item);
  });
}

function normalizeImages(images) {
  if (!Array.isArray(images)) return [];
  return images.map((img) => {
    if (typeof img === "string") return { url: img, alt: "", caption: "" };
    if (img && typeof img === "object" && typeof img.url === "string") {
      return { url: img.url, alt: ensureLocalizedObj(img.alt), caption: ensureLocalizedObj(img.caption) };
    }
    return null;
  }).filter(Boolean);
}

function normalizeBrochure(v) {
  if (!v) return null;
  if (typeof v === "string") return { url: v, title: "" };
  if (typeof v === "object" && v.url) return { url: v.url, title: ensureLocalizedObj(v.title) };
  return null;
}

export default function ProductFormPage() {
  const { t } = useTranslation("admin");
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeLocale, setActiveLocale] = useState("en");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: DEFAULT_VALUES });

  const watched = watch();

  const setField = useCallback(
    (name, val) => setValue(name, val, { shouldDirty: true, shouldTouch: true }),
    [setValue]
  );

  // Load existing product
  useEffect(() => {
    if (!isEdit) return;
    let mounted = true;
    setLoading(true);
    productService
      .adminGetProduct(id)
      .then((data) => {
        if (!mounted) return;
        reset({
          ...DEFAULT_VALUES,
          ...data,
          name: ensureLocalizedObj(data.name),
          scientificName: ensureLocalizedObj(data.scientificName),
          shortDescription: ensureLocalizedObj(data.shortDescription),
          longDescription: ensureLocalizedObj(data.longDescription),
          overview: ensureLocalizedObj(data.overview),
          composition: ensureLocalizedObj(data.composition),
          activeIngredients: ensureLocalizedObj(data.activeIngredients),
          formulation: ensureLocalizedObj(data.formulation),
          modeOfAction: ensureLocalizedObj(data.modeOfAction),
          technicalSpecifications: ensureLocalizedObj(data.technicalSpecifications),
          dosage: ensureLocalizedObj(data.dosage),
          applicationMethod: ensureLocalizedObj(data.applicationMethod),
          frequency: ensureLocalizedObj(data.frequency),
          growthStage: ensureLocalizedObj(data.growthStage),
          precautions: ensureLocalizedObj(data.precautions),
          storageInstructions: ensureLocalizedObj(data.storageInstructions),
          compatibility: ensureLocalizedObj(data.compatibility),
          shelfLife: ensureLocalizedObj(data.shelfLife),
          metaTitle: ensureLocalizedObj(data.metaTitle),
          metaDescription: ensureLocalizedObj(data.metaDescription),
          subCategory: ensureLocalizedObj(data.subCategory),
          benefits: ensureLocalizedArray(data.benefits),
          features: ensureLocalizedArray(data.features),
          crops: ensureLocalizedArray(data.crops),
          diseases: ensureLocalizedArray(data.diseases),
          pests: ensureLocalizedArray(data.pests),
          nutrientDeficiencies: ensureLocalizedArray(data.nutrientDeficiencies),
          suitableRegions: ensureLocalizedArray(data.suitableRegions),
          keywords: ensureLocalizedArray(data.keywords),
          images: normalizeImages(data.images),
          brochure: normalizeBrochure(data.brochure),
          faqs: Array.isArray(data.faqs) ? data.faqs : [],
        });
      })
      .catch((err) => {
        toast.error(t("productForm.loadFailed"));
        navigate("/admin/products");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [id, isEdit, reset, navigate]);

  // Auto-generate slug from name
  useEffect(() => {
    if (isEdit) return;
    const sub = watch((value) => {
      if (!watched.slug) {
        const raw = value.name;
        const nameStr = typeof raw === "string" ? raw : (raw?.en || "");
        const slug = nameStr
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        setValue("slug", slug);
      }
    });
    return () => sub.unsubscribe();
  }, [isEdit, watch, setValue, watched.slug]);

  const onSubmit = async (data) => {
    try {
      const existingImages = (data.images || [])
        .filter((img) => img && !img._file)
        .map(({ _file, ...rest }) => rest);

      const fd = new FormData();

      const { images, brochure, ...rest } = data;
      const payload = {
        ...rest,
        images: existingImages,
        brochure: brochure && !brochure._file ? brochure : undefined,
      };
      fd.append("data", JSON.stringify(payload));

      (data.images || [])
        .filter((img) => img?._file)
        .forEach((img) => fd.append("images", img._file));

      if (data.brochure?._file) {
        fd.append("brochure", data.brochure._file);
      }

      if (isEdit) {
        await productService.adminUpdateProduct(id, fd);
        toast.success(t("productForm.updateSuccess"));
      } else {
        await productService.adminCreateProduct(fd);
        toast.success(t("productForm.createSuccess"));
      }
      navigate("/admin/products");
    } catch (err) {
      toast.error(err.response?.data?.message || t("productForm.saveFailed"));
    }
  };

  if (loading) {
    return (
      <main className="page-container">
        <p>{t("common.loading")}</p>
      </main>
    );
  }

  return (
    <main className="page-container">
      <div className="cms-header">
        <button
          type="button"
          className="button-base button-ghost"
          onClick={() => navigate("/admin/products")}
        >
          <ArrowLeft size={16} /> {t("common.back")}
        </button>
        <h1 className="page-title">{isEdit ? t("productForm.editTitle") : t("productForm.createTitle")}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="cms-form">
        {/* ── Basic Information ─────────────────────────────────── */}
        <SectionCard title={t("productForm.sectionBasicInfo")}>
          <div className="form-grid form-grid-2">
            <LocalizedTextField
              label={t("productForm.fieldProductName")}
              value={watched.name}
              locale={activeLocale}
              onChange={(v) => setField("name", v)}
              error={errors.name?.message}
              required
              placeholder={t("productForm.placeholderProductName")}
            />
            <TextField
              label={t("productForm.fieldSlug")}
              value={watched.slug}
              onChange={(v) => setField("slug", v)}
              placeholder={t("productForm.placeholderSlug")}
              helpText={t("productForm.helpSlug")}
            />
          </div>
          <LocaleTabs active={activeLocale} onChange={setActiveLocale} />
          <div className="form-grid form-grid-3">
            <SelectField
              label={t("productForm.fieldCategory")}
              value={watched.category}
              onChange={(v) => setField("category", v)}
              options={CATEGORIES}
              required
            />
            <LocalizedTextField
              label={t("productForm.fieldSubCategory")}
              value={watched.subCategory}
              locale={activeLocale}
              onChange={(v) => setField("subCategory", v)}
              placeholder={t("productForm.placeholderSubCategory")}
            />
            <LocalizedTextField
              label={t("productForm.fieldScientificName")}
              value={watched.scientificName}
              locale={activeLocale}
              onChange={(v) => setField("scientificName", v)}
              placeholder={t("productForm.placeholderScientificName")}
            />
          </div>
          <div className="form-grid form-grid-3">
            <div className="form-field">
              <label className="form-label">{t("productForm.fieldPublished")}</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={watched.published}
                  onChange={(e) => setField("published", e.target.checked)}
                />
                <span className="toggle-slider" />
              </label>
            </div>
            <div className="form-field">
              <label className="form-label">{t("productForm.fieldFeatured")}</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={watched.featured}
                  onChange={(e) => setField("featured", e.target.checked)}
                />
                <span className="toggle-slider" />
              </label>
            </div>
            <TextField
              label={t("productForm.fieldDisplayOrder")}
              type="number"
              value={watched.displayOrder}
              onChange={(v) => setField("displayOrder", Number(v) || 0)}
              placeholder={t("productForm.placeholderDisplayOrder")}
            />
          </div>
        </SectionCard>

        {/* ── Images ────────────────────────────────────────────── */}
        <SectionCard title={t("productForm.sectionImages")} defaultOpen={false}>
          <ImageManager
            value={watched.images}
            onChange={(v) => setField("images", v)}
            locale={activeLocale}
          />
        </SectionCard>

        {/* ── Descriptions ─────────────────────────────────────── */}
        <SectionCard title={t("productForm.sectionDescriptions")} defaultOpen={false}>
          <LocaleTabs active={activeLocale} onChange={setActiveLocale} />
          <LocalizedTextAreaField
            label={t("productForm.fieldShortDescription")}
            value={watched.shortDescription}
            locale={activeLocale}
            onChange={(v) => setField("shortDescription", v)}
            placeholder={t("productForm.placeholderShortDescription")}
            rows={2}
          />
          <LocalizedTextAreaField
            label={t("productForm.fieldLongDescription")}
            value={watched.longDescription}
            locale={activeLocale}
            onChange={(v) => setField("longDescription", v)}
            placeholder={t("productForm.placeholderLongDescription")}
            rows={5}
          />
          <LocalizedTextAreaField
            label={t("productForm.fieldOverview")}
            value={watched.overview}
            locale={activeLocale}
            onChange={(v) => setField("overview", v)}
            placeholder={t("productForm.placeholderOverview")}
            rows={3}
          />
        </SectionCard>

        {/* ── Technical Information ─────────────────────────────── */}
        <SectionCard title={t("productForm.sectionTechnicalInfo")} defaultOpen={false}>
          <LocaleTabs active={activeLocale} onChange={setActiveLocale} />
          <LocalizedTextAreaField
            label={t("productForm.fieldComposition")}
            value={watched.composition}
            locale={activeLocale}
            onChange={(v) => setField("composition", v)}
            placeholder={t("productForm.placeholderComposition")}
            rows={3}
          />
          <LocalizedTextAreaField
            label={t("productForm.fieldActiveIngredients")}
            value={watched.activeIngredients}
            locale={activeLocale}
            onChange={(v) => setField("activeIngredients", v)}
            placeholder={t("productForm.placeholderActiveIngredients")}
            rows={2}
          />
          <div className="form-grid form-grid-2">
            <LocalizedTextAreaField
              label={t("productForm.fieldFormulation")}
              value={watched.formulation}
              locale={activeLocale}
              onChange={(v) => setField("formulation", v)}
              placeholder={t("productForm.placeholderFormulation")}
              rows={2}
            />
            <LocalizedTextAreaField
              label={t("productForm.fieldModeOfAction")}
              value={watched.modeOfAction}
              locale={activeLocale}
              onChange={(v) => setField("modeOfAction", v)}
              placeholder={t("productForm.placeholderModeOfAction")}
              rows={2}
            />
          </div>
          <LocalizedTextAreaField
            label={t("productForm.fieldTechnicalSpecs")}
            value={watched.technicalSpecifications}
            locale={activeLocale}
            onChange={(v) => setField("technicalSpecifications", v)}
            placeholder={t("productForm.placeholderTechnicalSpecs")}
            rows={3}
          />
        </SectionCard>

        {/* ── Benefits ──────────────────────────────────────────── */}
        <SectionCard title={t("productForm.sectionBenefitsFeatures")} defaultOpen={false}>
          <LocaleTabs active={activeLocale} onChange={setActiveLocale} />
          <LocalizedDynamicListField
            label={t("productForm.fieldBenefits")}
            value={watched.benefits}
            locale={activeLocale}
            onChange={(v) => setField("benefits", v)}
            placeholder={t("productForm.placeholderBenefits")}
          />
          <LocalizedDynamicListField
            label={t("productForm.fieldFeatures")}
            value={watched.features}
            locale={activeLocale}
            onChange={(v) => setField("features", v)}
            placeholder={t("productForm.placeholderFeatures")}
          />
        </SectionCard>

        {/* ── Usage ─────────────────────────────────────────────── */}
        <SectionCard title={t("productForm.sectionUsage")} defaultOpen={false}>
          <LocaleTabs active={activeLocale} onChange={setActiveLocale} />
          <LocalizedTextAreaField
            label={t("productForm.fieldDosage")}
            value={watched.dosage}
            locale={activeLocale}
            onChange={(v) => setField("dosage", v)}
            placeholder={t("productForm.placeholderDosage")}
            rows={2}
          />
          <LocalizedTextAreaField
            label={t("productForm.fieldApplicationMethod")}
            value={watched.applicationMethod}
            locale={activeLocale}
            onChange={(v) => setField("applicationMethod", v)}
            placeholder={t("productForm.placeholderApplicationMethod")}
            rows={3}
          />
          <div className="form-grid form-grid-2">
            <LocalizedTextAreaField
              label={t("productForm.fieldFrequency")}
              value={watched.frequency}
              locale={activeLocale}
              onChange={(v) => setField("frequency", v)}
              placeholder={t("productForm.placeholderFrequency")}
              rows={2}
            />
            <LocalizedTextAreaField
              label={t("productForm.fieldGrowthStage")}
              value={watched.growthStage}
              locale={activeLocale}
              onChange={(v) => setField("growthStage", v)}
              placeholder={t("productForm.placeholderGrowthStage")}
              rows={2}
            />
          </div>
        </SectionCard>

        {/* ── Agricultural Information ──────────────────────────── */}
        <SectionCard title={t("productForm.sectionAgricultural")} defaultOpen={false}>
          <LocaleTabs active={activeLocale} onChange={setActiveLocale} />
          <LocalizedDynamicListField
            label={t("productForm.fieldCrops")}
            value={watched.crops}
            locale={activeLocale}
            onChange={(v) => setField("crops", v)}
            placeholder={t("productForm.placeholderCrops")}
          />
          <LocalizedDynamicListField
            label={t("productForm.fieldDiseases")}
            value={watched.diseases}
            locale={activeLocale}
            onChange={(v) => setField("diseases", v)}
            placeholder={t("productForm.placeholderDiseases")}
          />
          <LocalizedDynamicListField
            label={t("productForm.fieldPests")}
            value={watched.pests}
            locale={activeLocale}
            onChange={(v) => setField("pests", v)}
            placeholder={t("productForm.placeholderPests")}
          />
          <LocalizedDynamicListField
            label={t("productForm.fieldNutrientDeficiencies")}
            value={watched.nutrientDeficiencies}
            locale={activeLocale}
            onChange={(v) => setField("nutrientDeficiencies", v)}
            placeholder={t("productForm.placeholderNutrientDeficiencies")}
          />
          <LocalizedDynamicListField
            label={t("productForm.fieldSuitableRegions")}
            value={watched.suitableRegions}
            locale={activeLocale}
            onChange={(v) => setField("suitableRegions", v)}
            placeholder={t("productForm.placeholderSuitableRegions")}
          />
        </SectionCard>

        {/* ── Safety ────────────────────────────────────────────── */}
        <SectionCard title={t("productForm.sectionSafetyStorage")} defaultOpen={false}>
          <LocaleTabs active={activeLocale} onChange={setActiveLocale} />
          <LocalizedTextAreaField
            label={t("productForm.fieldPrecautions")}
            value={watched.precautions}
            locale={activeLocale}
            onChange={(v) => setField("precautions", v)}
            placeholder={t("productForm.placeholderPrecautions")}
            rows={3}
          />
          <div className="form-grid form-grid-2">
            <LocalizedTextAreaField
              label={t("productForm.fieldStorageInstructions")}
              value={watched.storageInstructions}
              locale={activeLocale}
              onChange={(v) => setField("storageInstructions", v)}
              placeholder={t("productForm.placeholderStorageInstructions")}
              rows={2}
            />
            <LocalizedTextAreaField
              label={t("productForm.fieldShelfLife")}
              value={watched.shelfLife}
              locale={activeLocale}
              onChange={(v) => setField("shelfLife", v)}
              placeholder={t("productForm.placeholderShelfLife")}
              rows={2}
            />
          </div>
          <LocalizedTextAreaField
            label={t("productForm.fieldCompatibility")}
            value={watched.compatibility}
            locale={activeLocale}
            onChange={(v) => setField("compatibility", v)}
            placeholder={t("productForm.placeholderCompatibility")}
            rows={2}
          />
        </SectionCard>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <SectionCard title={t("productForm.sectionFaq")} defaultOpen={false}>
          <LocaleTabs active={activeLocale} onChange={setActiveLocale} />
          <LocalizedFAQEditor
            value={watched.faqs}
            locale={activeLocale}
            onChange={(v) => setField("faqs", v)}
          />
        </SectionCard>

        {/* ── Brochure ─────────────────────────────────────────── */}
        <SectionCard title={t("productForm.sectionBrochure")} defaultOpen={false}>
          <BrochureManager
            value={watched.brochure}
            onChange={(v) => setField("brochure", v)}
          />
        </SectionCard>

        {/* ── SEO ───────────────────────────────────────────────── */}
        <SectionCard title={t("productForm.sectionSeo")} defaultOpen={false}>
          <LocaleTabs active={activeLocale} onChange={setActiveLocale} />
          <LocalizedTextField
            label={t("productForm.fieldMetaTitle")}
            value={watched.metaTitle}
            locale={activeLocale}
            onChange={(v) => setField("metaTitle", v)}
            placeholder={t("productForm.placeholderMetaTitle")}
            helpText={t("productForm.helpMetaTitle", { count: (typeof watched.metaTitle === "string" ? watched.metaTitle : watched.metaTitle?.[activeLocale] || watched.metaTitle?.en || "").length })}
          />
          <LocalizedTextAreaField
            label={t("productForm.fieldMetaDescription")}
            value={watched.metaDescription}
            locale={activeLocale}
            onChange={(v) => setField("metaDescription", v)}
            placeholder={t("productForm.placeholderMetaDescription")}
            rows={2}
            helpText={t("productForm.helpMetaDescription", { count: (typeof watched.metaDescription === "string" ? watched.metaDescription : watched.metaDescription?.[activeLocale] || watched.metaDescription?.en || "").length })}
          />
          <LocalizedDynamicListField
            label={t("productForm.fieldKeywords")}
            value={watched.keywords}
            locale={activeLocale}
            onChange={(v) => setField("keywords", v)}
            placeholder={t("productForm.placeholderKeywords")}
          />
        </SectionCard>

        {/* ── Submit ────────────────────────────────────────────── */}
        <div className="cms-footer">
          <button
            type="button"
            className="button-base"
            onClick={() => navigate("/admin/products")}
          >
            {t("common.cancel")}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="button-base button-primary"
          >
            <Save size={16} />
            {isSubmitting ? t("productForm.saving") : isEdit ? t("productForm.submitUpdate") : t("productForm.submitCreate")}
          </button>
        </div>
      </form>
    </main>
  );
}
