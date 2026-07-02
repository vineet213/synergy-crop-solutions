import { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel, confirmLabel = "Delete", cancelLabel = "Cancel", variant = "danger" }) {
  const confirmRef = useRef(null);

  useEffect(() => {
    if (open && confirmRef.current) {
      confirmRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-header">
          <div className="confirm-icon-wrap">
            <AlertTriangle size={24} />
          </div>
          <button className="confirm-close" onClick={onCancel} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <h3 className="confirm-title">{title || "Confirm"}</h3>
        {message && <p className="confirm-message">{message}</p>}
        <div className="confirm-actions">
          <button onClick={onCancel} className="button-base">
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            onClick={onConfirm}
            className={`button-base ${variant === "danger" ? "button-danger" : "button-primary"}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
