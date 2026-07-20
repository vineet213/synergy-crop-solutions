export default function TextField({
  label,
  value,
  onChange,
  error,
  placeholder,
  required,
  disabled,
  type = "text",
  helpText,
}) {
  return (
    <div className="form-field">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="form-required">*</span>}
        </label>
      )}
      <input
        type={type}
        className={`input-field ${error ? "input-error" : ""}`}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
      {helpText && !error && <p className="form-help">{helpText}</p>}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
