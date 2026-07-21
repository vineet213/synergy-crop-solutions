import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Upload, X, Play, Image as ImageIcon } from "lucide-react";
import testimonialService from "../../services/testimonialService.js";
import mediaUrl from "../../utils/mediaUrl.js";
import { useTranslation } from "react-i18next";

function mediaPath(entry) {
  if (!entry) return null;
  return typeof entry === "string" ? entry : entry?.url || null;
}

function mediaPreview(file, existingPath) {
  if (file) return URL.createObjectURL(file);
  return mediaUrl(existingPath) || null;
}

export default function TestimonialFormPage() {
  const { t } = useTranslation("admin");
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [existingData, setExistingData] = useState(null);

  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      customerName: "",
      location: "",
      testimonial: "",
      rating: "",
      crop: "",
      videoType: "",
      youtubeUrl: "",
      isFeatured: false,
      displayOrder: 0,
      status: "active",
    },
  });

  const watchVideoType = watch("videoType");

  useEffect(() => {
    if (!isEdit) return;
    let mounted = true;
    setLoading(true);
    testimonialService
      .adminGetTestimonial(id)
      .then((data) => {
        if (!mounted) return;
        setExistingData(data);
        const videoStr = mediaPath(data.video);
        const isYouTube = videoStr && videoStr.startsWith("http");
        reset({
          customerName: data.customerName || "",
          location: data.location || "",
          testimonial: data.testimonial || "",
          rating: data.rating ?? "",
          crop: data.crop || "",
          videoType: isYouTube ? "youtube" : data.videoType || "",
          youtubeUrl: isYouTube ? videoStr : "",
          isFeatured: data.isFeatured ?? false,
          displayOrder: data.displayOrder ?? 0,
          status: data.status || "active",
        });
      })
      .catch((err) => {
        toast.error(t("testimonialForm.loadFailed"));
        navigate("/admin/testimonials");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [id, isEdit, reset, navigate]);

  const onSubmit = async (formData) => {
    try {
      const fd = new FormData();
      fd.append("customerName", formData.customerName);
      fd.append("location", formData.location || "");
      fd.append("testimonial", formData.testimonial);
      fd.append("crop", formData.crop || "");
      fd.append("rating", formData.rating ? String(formData.rating) : "");
      fd.append("displayOrder", String(formData.displayOrder || 0));
      fd.append("isFeatured", String(Boolean(formData.isFeatured)));
      fd.append("status", formData.status || "active");

      if (videoFile) {
        fd.append("video", videoFile);
      } else if (formData.videoType === "youtube" && formData.youtubeUrl) {
        fd.append("video", formData.youtubeUrl);
        fd.append("videoType", "youtube");
      } else if (isEdit && existingData?.video && !mediaPath(existingData.video)?.startsWith("http") && !videoFile) {
        // keep existing uploaded video — don't send video field
      }

      if (thumbnailFile) {
        fd.append("thumbnail", thumbnailFile);
      }

      if (imageFile) {
        fd.append("image", imageFile);
      }

      if (isEdit) {
        await testimonialService.adminUpdateTestimonial(id, fd);
      } else {
        await testimonialService.adminCreateTestimonial(fd);
      }
      navigate("/admin/testimonials");
    } catch (err) {
      toast.error(err.response?.data?.message || t("testimonialForm.saveFailed"));
    }
  };

  if (loading)
    return (
      <main className="page-container">
        <p>{t("common.loading")}</p>
      </main>
    );

  return (
    <main className="page-container">
      <h1 className="page-title">{isEdit ? t("testimonialForm.editTitle") : t("testimonialForm.createTitle")}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium">{t("testimonialForm.fieldCustomerName")}</label>
          <input
            {...register("customerName", { required: t("testimonialForm.errorCustomerNameRequired") })}
            className="input-field"
          />
          {errors.customerName && (
            <p className="text-sm text-red-600">{errors.customerName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">{t("testimonialForm.fieldLocation")}</label>
          <input
            {...register("location")}
            className="input-field"
            placeholder={t("testimonialForm.placeholderLocation")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">{t("testimonialForm.fieldTestimonial")}</label>
          <textarea
            {...register("testimonial", { required: t("testimonialForm.errorTestimonialRequired") })}
            className="input-field"
            rows={4}
          />
          {errors.testimonial && (
            <p className="text-sm text-red-600">{errors.testimonial.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">{t("testimonialForm.fieldCrop")}</label>
          <input
            {...register("crop")}
            className="input-field"
            placeholder={t("testimonialForm.placeholderCrop")}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">{t("testimonialForm.fieldRating")}</label>
            <input
              type="number"
              min="1"
              max="5"
              {...register("rating")}
              className="input-field"
              placeholder={t("testimonialForm.placeholderRating")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">{t("testimonialForm.fieldDisplayOrder")}</label>
            <input
              type="number"
              min="0"
              {...register("displayOrder")}
              className="input-field"
              placeholder={t("testimonialForm.placeholderDisplayOrder")}
            />
          </div>
        </div>

        {/* Video Upload */}
        <div>
          <label className="block text-sm font-medium">{t("testimonialForm.fieldVideoType")}</label>
          <select {...register("videoType")} className="input-field">
            <option value="">{t("testimonialForm.videoTypeNone")}</option>
            <option value="mp4">{t("testimonialForm.videoTypeUpload")}</option>
            <option value="youtube">{t("testimonialForm.videoTypeYouTube")}</option>
          </select>
        </div>

        {watchVideoType === "youtube" && (
          <div>
            <label className="block text-sm font-medium">{t("testimonialForm.fieldYouTubeUrl")}</label>
            <input
              {...register("youtubeUrl")}
              className="input-field"
              placeholder={t("testimonialForm.placeholderYouTubeUrl")}
            />
          </div>
        )}

        {watchVideoType === "mp4" && (
          <div>
            <label className="block text-sm font-medium">
              {t("testimonialForm.fieldVideoUpload")} <span className="font-normal text-gray-500">{t("testimonialForm.videoUploadHint")}</span>
            </label>
            <FileInput
              accept="video/mp4,video/quicktime,video/webm"
              file={videoFile}
              onChange={setVideoFile}
              existingPath={existingData?.video}
              isVideo
              label={t("testimonialForm.chooseVideoFile")}
            />
          </div>
        )}

        {/* Thumbnail Upload */}
        <div>
          <label className="block text-sm font-medium">
            {t("testimonialForm.fieldThumbnail")} <span className="font-normal text-gray-500">{t("testimonialForm.thumbnailHint")}</span>
          </label>
          <FileInput
            accept="image/jpeg,image/jpg,image/png,image/webp"
            file={thumbnailFile}
            onChange={setThumbnailFile}
            existingPath={existingData?.thumbnail}
            label={t("testimonialForm.chooseThumbnailImage")}
          />
        </div>

        {/* Gallery Image Upload */}
        <div>
          <label className="block text-sm font-medium">
            {t("testimonialForm.fieldGalleryImage")} <span className="font-normal text-gray-500">{t("testimonialForm.galleryImageHint")}</span>
          </label>
          <FileInput
            accept="image/jpeg,image/jpg,image/png,image/webp"
            file={imageFile}
            onChange={setImageFile}
            existingPath={existingData?.image}
            label={t("testimonialForm.chooseGalleryImage")}
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" {...register("isFeatured")} />
            {t("testimonialForm.fieldFeatured")}
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium">{t("testimonialForm.fieldStatus")}</label>
          <select {...register("status")} className="input-field">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={isSubmitting} className="button-base button-primary">
            {isSubmitting ? t("testimonialForm.saving") : isEdit ? t("testimonialForm.submitUpdate") : t("testimonialForm.submitCreate")}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/testimonials")}
            className="button-base"
          >
            {t("common.cancel")}
          </button>
        </div>
      </form>
    </main>
  );
}

function FileInput({ accept, file, onChange, existingPath, isVideo, label }) {
  const { t } = useTranslation("admin");
  const existingStr = mediaPath(existingPath);
  const preview = file ? URL.createObjectURL(file) : mediaUrl(existingPath);
  const hasExisting = !file && existingStr;
  const fileName = file?.name || (hasExisting ? existingStr.split("/").pop() : null);

  const handleClear = (e) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div style={{ marginTop: "0.375rem" }}>
      <label
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          padding: preview ? "0.75rem" : "1.25rem",
          border: "2px dashed var(--border)",
          borderRadius: "var(--radius-sm)",
          cursor: "pointer",
          background: preview ? "transparent" : "var(--surface-muted)",
          transition: "border-color 0.15s",
          position: "relative",
        }}
      >
        <input
          type="file"
          accept={accept}
          onChange={(e) => {
            const f = e.target.files?.[0] || null;
            onChange(f);
          }}
          style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
        />

        {preview ? (
          <div style={{ position: "relative", width: "100%" }}>
            {isVideo ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <Play size={20} fill="var(--brand)" stroke="var(--brand)" />
                <span style={{ fontSize: "0.85rem", wordBreak: "break-all" }}>{fileName}</span>
              </div>
            ) : (
              <img
                src={preview}
                alt={t("testimonialForm.previewAlt")}
                style={{
                  width: "100%",
                  maxHeight: 160,
                  objectFit: "cover",
                  borderRadius: "var(--radius-sm)",
                }}
              />
            )}
            <button
              type="button"
              onClick={handleClear}
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                background: "rgba(0,0,0,0.6)",
                border: "none",
                borderRadius: "50%",
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
              }}
              aria-label={t("testimonialForm.removeFile")}
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <>
            <Upload size={20} style={{ color: "var(--text-muted)" }} />
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{label}</span>
          </>
        )}
      </label>
    </div>
  );
}
