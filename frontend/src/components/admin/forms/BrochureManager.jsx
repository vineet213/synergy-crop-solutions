import { useRef } from "react";
import { Upload, X, FileText } from "lucide-react";
import mediaUrl from "../../../utils/mediaUrl.js";
import { resolveLocale } from "../../../utils/productHelpers.js";

function normalize(v) {
  if (!v) return null;
  if (typeof v === "string") return { url: v, title: "" };
  if (typeof v === "object" && v.url) return v;
  return null;
}

export default function BrochureManager({ value, onChange, locale = "en" }) {
  const inputRef = useRef(null);
  const normalized = normalize(value);

  const addFile = (file) => {
    if (normalized?.url?.startsWith("blob:")) URL.revokeObjectURL(normalized.url);
    const titleObj = normalized?.title && typeof normalized.title === "object"
      ? { ...normalized.title }
      : { en: normalized?.title || "", hi: "", mr: "", kn: "" };
    onChange({
      url: URL.createObjectURL(file),
      title: { ...titleObj, en: file.name.replace(/\.pdf$/i, "") },
      _file: file,
    });
  };

  const removeBrochure = () => {
    if (normalized?.url?.startsWith("blob:")) URL.revokeObjectURL(normalized.url);
    onChange(null);
  };

  const preview = normalized?._file
    ? normalized.url
    : normalized?.url
      ? mediaUrl(normalized.url) || normalized.url
      : null;

  const fileName = normalized?._file
    ? normalized._file.name
    : normalized?.url
      ? normalized.url.split("/").pop()
      : null;

  const titleText = resolveLocale(normalized?.title, locale);

  const handleTitleChange = (v) => {
    const current = normalized?.title;
    let titleObj;
    if (current && typeof current === "object") {
      titleObj = { ...current, [locale]: v };
    } else if (locale === "en") {
      titleObj = v;
    } else {
      titleObj = { en: typeof current === "string" ? current : "", [locale]: v };
    }
    onChange({ ...normalized, title: titleObj });
  };

  return (
    <div className="form-field">
      <label className="form-label">Brochure (PDF)</label>

      {preview ? (
        <div className="brochure-preview">
          <div className="brochure-info">
            <FileText size={20} />
            <div>
              <p className="brochure-name">{titleText || fileName}</p>
              <a
                href={preview}
                target="_blank"
                rel="noopener noreferrer"
                className="brochure-link"
              >
                View PDF
              </a>
            </div>
          </div>
          <button
            type="button"
            className="icon-btn icon-btn-danger"
            onClick={removeBrochure}
            title="Remove brochure"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) addFile(file);
              e.target.value = "";
            }}
            style={{ display: "none" }}
          />
          <button
            type="button"
            className="upload-btn"
            onClick={() => inputRef.current?.click()}
          >
            <Upload size={16} /> Upload PDF brochure
          </button>
        </>
      )}

      {normalized && (
        <input
          className="input-field"
          value={titleText}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Brochure title"
          style={{ marginTop: "0.5rem" }}
        />
      )}
    </div>
  );
}
