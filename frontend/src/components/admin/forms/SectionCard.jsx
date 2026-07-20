import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SectionCard({ title, defaultOpen = true, badge, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="cms-section">
      <button
        type="button"
        className="cms-section-header"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="cms-section-header-left">
          <h3 className="cms-section-title">{title}</h3>
          {badge && <span className="badge badge-soft">{badge}</span>}
        </div>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && <div className="cms-section-body">{children}</div>}
    </div>
  );
}
