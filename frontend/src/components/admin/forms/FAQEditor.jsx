import { Plus, X, GripVertical } from "lucide-react";

export default function FAQEditor({ value = [], onChange }) {
  const addFaq = () => onChange([...value, { question: "", answer: "" }]);
  const removeFaq = (i) => onChange(value.filter((_, idx) => idx !== i));
  const updateFaq = (i, field, v) => {
    const next = [...value];
    next[i] = { ...next[i], [field]: v };
    onChange(next);
  };

  return (
    <div className="form-field">
      <label className="form-label">
        Frequently Asked Questions
        {value.length > 0 && (
          <span className="badge badge-soft" style={{ marginLeft: "0.5rem" }}>
            {value.length}
          </span>
        )}
      </label>
      <div className="faq-list">
        {value.map((faq, i) => (
          <div key={i} className="faq-item">
            <div className="faq-item-header">
              <GripVertical size={16} className="faq-grip" />
              <span className="faq-number">#{i + 1}</span>
              <button
                type="button"
                className="icon-btn icon-btn-danger"
                onClick={() => removeFaq(i)}
                title="Remove FAQ"
              >
                <X size={14} />
              </button>
            </div>
            <input
              className="input-field"
              value={faq.question}
              onChange={(e) => updateFaq(i, "question", e.target.value)}
              placeholder="Question"
            />
            <textarea
              className="input-field"
              value={faq.answer}
              onChange={(e) => updateFaq(i, "answer", e.target.value)}
              placeholder="Answer"
              rows={3}
            />
          </div>
        ))}
      </div>
      <button type="button" className="add-btn" onClick={addFaq}>
        <Plus size={14} /> Add FAQ
      </button>
    </div>
  );
}
