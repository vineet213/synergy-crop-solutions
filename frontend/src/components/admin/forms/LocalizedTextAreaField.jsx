import TextAreaField from "./TextAreaField.jsx";

/**
 * Localized wrapper around TextAreaField.
 * `value` is a localized object { en: "...", hi: "...", ... } or a plain string.
 * `locale` is the currently active language code.
 * `onChange` receives the updated localized object.
 */
export default function LocalizedTextAreaField({
  label,
  value,
  locale = "en",
  onChange,
  error,
  placeholder,
  required,
  disabled,
  rows = 3,
  helpText,
}) {
  const obj = normalizeObj(value);
  const current = obj[locale] || "";

  const handleChange = (v) => {
    onChange({ ...obj, [locale]: v });
  };

  return (
    <TextAreaField
      label={label}
      value={current}
      onChange={handleChange}
      error={error}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      rows={rows}
      helpText={helpText}
    />
  );
}

function normalizeObj(v) {
  if (!v) return {};
  if (typeof v === "string") return { en: v };
  if (typeof v === "object") return v;
  return {};
}
