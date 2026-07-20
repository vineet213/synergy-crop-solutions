import { Plus, X, ChevronUp, ChevronDown } from "lucide-react";

export default function DynamicListField({
  label,
  value = [],
  onChange,
  placeholder = "Add item...",
  required,
}) {
  const addItem = () => onChange([...value, ""]);
  const removeItem = (i) => onChange(value.filter((_, idx) => idx !== i));
  const updateItem = (i, v) => {
    const next = [...value];
    next[i] = v;
    onChange(next);
  };
  const moveItem = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="form-field">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="form-required">*</span>}
        </label>
      )}
      <div className="dynamic-list">
        {value.map((item, i) => (
          <div key={i} className="dynamic-list-item">
            <div className="dynamic-list-grip">
              <button
                type="button"
                className="icon-btn"
                onClick={() => moveItem(i, -1)}
                disabled={i === 0}
                title="Move up"
              >
                <ChevronUp size={14} />
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={() => moveItem(i, 1)}
                disabled={i === value.length - 1}
                title="Move down"
              >
                <ChevronDown size={14} />
              </button>
            </div>
            <input
              className="input-field dynamic-list-input"
              value={item}
              onChange={(e) => updateItem(i, e.target.value)}
              placeholder={placeholder}
            />
            <button
              type="button"
              className="icon-btn icon-btn-danger"
              onClick={() => removeItem(i)}
              title="Remove"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="add-btn" onClick={addItem}>
        <Plus size={14} /> Add {label?.toLowerCase() || "item"}
      </button>
    </div>
  );
}
