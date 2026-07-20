import TextField from "./TextField.jsx";

/**
 * Localized wrapper around TextField.
 * `value` is a localized object { en: "...", hi: "...", ... } or a plain string.
 * `locale` is the currently active language code.
 * `onChange` receives the updated localized object.
 */
export default function LocalizedTextField({
  label,
  value,
  locale = "en",
  onChange,
  error,
  placeholder,
  required,
  disabled,
  type = "text",
  helpText,
}) {
  const obj = normalizeObj(value);
  const current = obj[locale] || "";

  const handleChange = (v) => {
    onChange({ ...obj, [locale]: v });
  };

  return (
    <TextField
      label={label}
      value={current}
      onChange={handleChange}
      error={error}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      type={type}
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
