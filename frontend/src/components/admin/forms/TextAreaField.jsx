export default function TextAreaField({
  label,
  value,
  onChange,
  error,
  placeholder,
  required,
  disabled,
  rows = 3,
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
      <textarea
        className={`input-field ${error ? "input-error" : ""}`}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
      />
      {helpText && !error && <p className="form-help">{helpText}</p>}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
