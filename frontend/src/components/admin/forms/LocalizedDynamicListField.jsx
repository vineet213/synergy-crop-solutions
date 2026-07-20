import DynamicListField from "./DynamicListField.jsx";

/**
 * Localized wrapper around DynamicListField.
 * `value` is an array of localized items — each item is either a string or
 * { en: "...", hi: "...", ... }.
 * `locale` is the currently active language code.
 * `onChange` receives the updated array (full localized objects preserved).
 */
export default function LocalizedDynamicListField({
  label,
  value = [],
  locale = "en",
  onChange,
  placeholder = "Add item...",
  required,
}) {
  const localizedValues = value.map((item) => {
    if (typeof item === "string") return item;
    if (item && typeof item === "object") return item[locale] || item.en || "";
    return String(item || "");
  });

  const handleChange = (arr) => {
    const next = arr.map((v, i) => {
      const existing = value[i];
      if (existing && typeof existing === "object" && !Array.isArray(existing)) {
        return { ...existing, [locale]: v };
      }
      if (locale === "en") return v;
      return { en: typeof existing === "string" ? existing : "", [locale]: v };
    });
    onChange(next);
  };

  return (
    <DynamicListField
      label={label}
      value={localizedValues}
      onChange={handleChange}
      placeholder={placeholder}
      required={required}
    />
  );
}
