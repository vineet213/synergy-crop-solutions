import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Leaf } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
  { code: "kn", label: "ಕನ್ನಡ" },
];

export default function LanguageWelcomeModal({ onComplete }) {
  const { i18n } = useTranslation();
  const firstButtonRef = useRef(null);

  useEffect(() => {
    firstButtonRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSelect = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem("appLanguage", langCode);
    localStorage.setItem("languageWelcomeShown", "true");
    onComplete();
  };

  const handleKeyDown = (e, langCode) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(langCode);
    }
  };

  const backdropStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "1rem",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "1rem",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    maxWidth: "480px",
    width: "100%",
    padding: "2.5rem 2rem",
    textAlign: "center",
  };

  const iconWrapperStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    backgroundColor: "#166534",
    color: "#fff",
    marginBottom: "1.25rem",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#166534",
    marginBottom: "0.5rem",
    lineHeight: 1.3,
  };

  const subtitleStyle = {
    fontSize: "1rem",
    color: "#6b7280",
    marginBottom: "2rem",
  };

  const buttonGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.75rem",
  };

  const langButtonStyle = {
    padding: "1rem 0.75rem",
    fontSize: "1.05rem",
    fontWeight: 600,
    border: "2px solid #e5e7eb",
    borderRadius: "0.75rem",
    backgroundColor: "#f9fafb",
    color: "#111827",
    cursor: "pointer",
    transition: "all 0.15s ease",
    outline: "none",
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.borderColor = "#166534";
    e.currentTarget.style.backgroundColor = "#f0fdf4";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.borderColor = "#e5e7eb";
    e.currentTarget.style.backgroundColor = "#f9fafb";
  };

  const handleFocus = (e) => {
    e.currentTarget.style.borderColor = "#166534";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(22, 101, 52, 0.25)";
  };

  const handleBlur = (e) => {
    e.currentTarget.style.borderColor = "#e5e7eb";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Language selection"
      style={backdropStyle}
    >
      <div style={cardStyle}>
        <div style={iconWrapperStyle}>
          <Leaf size={32} />
        </div>

        <h1 style={titleStyle}>Welcome to Synergy Crop Solutions</h1>
        <p style={subtitleStyle}>Choose your preferred language</p>

        <div style={buttonGridStyle}>
          {LANGUAGES.map((lang, index) => (
            <button
              key={lang.code}
              ref={index === 0 ? firstButtonRef : null}
              onClick={() => handleSelect(lang.code)}
              onKeyDown={(e) => handleKeyDown(e, lang.code)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={langButtonStyle}
              tabIndex={0}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
