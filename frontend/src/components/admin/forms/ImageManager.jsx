import { useRef } from "react";
import { Upload, X, ChevronUp, ChevronDown, ImageIcon } from "lucide-react";
import mediaUrl from "../../../utils/mediaUrl.js";
import { resolveLocale } from "../../../utils/productHelpers.js";

export default function ImageManager({
  value = [],
  onChange,
  maxImages = 10,
  locale = "en",
}) {
  const inputRef = useRef(null);

  const addFiles = (fileList) => {
    const files = Array.from(fileList);
    const remaining = maxImages - value.length;
    const toAdd = files.slice(0, remaining).map((f) => ({
      url: URL.createObjectURL(f),
      alt: { en: "", hi: "", mr: "", kn: "" },
      caption: { en: "", hi: "", mr: "", kn: "" },
      _file: f,
    }));
    if (toAdd.length > 0) onChange([...value, ...toAdd]);
  };

  const removeImage = (i) => {
    const img = value[i];
    if (img?.url?.startsWith("blob:")) URL.revokeObjectURL(img.url);
    onChange(value.filter((_, idx) => idx !== i));
  };

  const updateImage = (i, field, v) => {
    const next = [...value];
    const current = next[i][field];
    if (current && typeof current === "object" && !Array.isArray(current)) {
      next[i] = { ...next[i], [field]: { ...current, [locale]: v } };
    } else if (locale === "en") {
      next[i] = { ...next[i], [field]: v };
    } else {
      next[i] = { ...next[i], [field]: { en: typeof current === "string" ? current : "", [locale]: v } };
    }
    onChange(next);
  };

  const moveImage = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  const canAdd = value.length < maxImages;

  return (
    <div className="form-field">
      <label className="form-label">
        Product Images
        <span className="badge badge-soft" style={{ marginLeft: "0.5rem" }}>
          {value.length}/{maxImages}
        </span>
      </label>

      <div className="image-grid">
        {value.map((img, i) => {
          const preview = img._file
            ? img.url
            : mediaUrl(typeof img.url === "string" ? img.url : "") || img.url;
          const altText = resolveLocale(img.alt, locale);
          const captionText = resolveLocale(img.caption, locale);
          return (
            <div key={i} className="image-card">
              <div className="image-preview">
                {preview ? (
                  <img src={preview} alt={altText} />
                ) : (
                  <div className="image-placeholder">
                    <ImageIcon size={24} />
                  </div>
                )}
                <button
                  type="button"
                  className="image-remove"
                  onClick={() => removeImage(i)}
                  title="Remove image"
                >
                  <X size={14} />
                </button>
                <div className="image-order-controls">
                  <button
                    type="button"
                    className="icon-btn icon-btn-sm"
                    onClick={() => moveImage(i, -1)}
                    disabled={i === 0}
                  >
                    <ChevronUp size={12} />
                  </button>
                  <button
                    type="button"
                    className="icon-btn icon-btn-sm"
                    onClick={() => moveImage(i, 1)}
                    disabled={i === value.length - 1}
                  >
                    <ChevronDown size={12} />
                  </button>
                </div>
              </div>
              <input
                className="input-field input-field-sm"
                value={altText}
                onChange={(e) => updateImage(i, "alt", e.target.value)}
                placeholder="Alt text"
              />
              <input
                className="input-field input-field-sm"
                value={captionText}
                onChange={(e) => updateImage(i, "caption", e.target.value)}
                placeholder="Caption (optional)"
              />
            </div>
          );
        })}
      </div>

      {canAdd && (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
            style={{ display: "none" }}
          />
          <button
            type="button"
            className="upload-btn"
            onClick={() => inputRef.current?.click()}
          >
            <Upload size={16} /> Upload images
          </button>
        </>
      )}
    </div>
  );
}
