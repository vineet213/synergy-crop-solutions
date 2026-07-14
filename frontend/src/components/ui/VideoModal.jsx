import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function VideoModal({ src, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [onClose]);

  return (
    <div className="vm-overlay" onClick={onClose}>
      <div className="vm-content" onClick={(e) => e.stopPropagation()}>
        <button className="vm-close" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>
        <video
          ref={videoRef}
          src={src}
          controls
          autoPlay
          className="vm-video"
        />
      </div>
    </div>
  );
}
