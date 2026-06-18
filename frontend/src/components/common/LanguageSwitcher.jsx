import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
  { code: "kn", label: "ಕನ್ನಡ" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem("appLanguage", lang);
  };

  return (
    <select
      value={i18n.language}
      onChange={handleChange}
      style={{
        padding: "0.4rem 0.6rem",
        borderRadius: "8px",
        border: "1px solid var(--border)",
        background: "var(--surface)",
        fontSize: "0.85rem",
        cursor: "pointer",
      }}
      aria-label="Select language"
    >
      {LANGUAGES.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
