const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
  { code: "kn", label: "ಕನ್ನಡ" },
];

export { LANGUAGES };

export default function LocaleTabs({ active, onChange, completed = {} }) {
  return (
    <div className="locale-tabs">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          type="button"
          className={`locale-tab ${active === lang.code ? "locale-tab--active" : ""}`}
          onClick={() => onChange(lang.code)}
        >
          {lang.label}
          {completed[lang.code] && active !== lang.code && (
            <span className="locale-tab-dot" />
          )}
        </button>
      ))}
    </div>
  );
}
