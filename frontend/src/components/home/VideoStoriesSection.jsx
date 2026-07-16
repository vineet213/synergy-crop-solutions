import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Play, ChevronRight, User } from "lucide-react";
import VideoModal from "../../components/ui/VideoModal.jsx";
import testimonialService from "../../services/testimonialService.js";
import mediaUrl from "../../utils/mediaUrl.js";

function isYouTube(url) {
  return /youtube\.com|youtu\.be/.test(url || "");
}

function ytEmbed(url) {
  if (!url) return null;
  const m = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

export default function VideoStoriesSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const { t } = useTranslation("home");
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    testimonialService
      .getPublicTestimonials({ featured: "true", limit: "3", sort: "displayOrder,-createdAt" })
      .then((data) => {
        if (!cancelled) setItems(data || []);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading || items.length === 0) return null;

  return (
    <>
      <section className="prem prem-alt">
        <div className="prem-container">
          <header className="prem-header center">
            <span className="prem-header__label">{t("stories.label")}</span>
            <h2 className="prem-header__title">{t("stories.title")}</h2>
          </header>
          <div className="vs-grid">
            {items.map((item) => {
              const thumbSrc = mediaUrl(item.thumbnail) || mediaUrl(item.image);
              const videoSrc = mediaUrl(item.video);
              const ytUrl = isYouTube(item.video) ? item.video : null;

              return (
                <div key={item._id} className="vs-card">
                  <div
                    className="vs-thumb"
                    onClick={() => setActiveVideo(ytUrl || videoSrc)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setActiveVideo(ytUrl || videoSrc);
                    }}
                    aria-label={t("stories.play")}
                  >
                    {thumbSrc ? (
                      <img src={thumbSrc} alt={item.customerName || ""} className="vs-thumb-video" style={{ objectFit: "cover" }} />
                    ) : (
                      <div className="vs-thumb-video" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface-muted)" }}>
                        <User size={40} style={{ color: "var(--text-muted)" }} />
                      </div>
                    )}
                    <div className="vs-thumb-overlay">
                      <span className="vs-play-btn">
                        <Play size={28} fill="currentColor" />
                      </span>
                    </div>
                  </div>
                  <div className="vs-card-body">
                    {item.customerName && <p className="vs-card-label">{item.customerName}</p>}
                    <button
                      className="vs-watch-btn"
                      onClick={() => setActiveVideo(ytUrl || videoSrc)}
                    >
                      {t("stories.play")} <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="vs-cta">
            <button
              className="button-base button-primary"
              onClick={() => navigate("/testimonials")}
            >
              {t("stories.viewAll")} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {activeVideo && (
        isYouTube(activeVideo) ? (
          <div className="vm-overlay" onClick={() => setActiveVideo(null)}>
            <div className="vm-content" onClick={(e) => e.stopPropagation()}>
              <button className="vm-close" onClick={() => setActiveVideo(null)} aria-label="Close">
                <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>&times;</span>
              </button>
              <iframe
                src={ytEmbed(activeVideo)}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="vm-video"
                style={{ width: "100%", aspectRatio: "16/9", border: "none", borderRadius: "var(--radius-sm)" }}
              />
            </div>
          </div>
        ) : (
          <VideoModal src={activeVideo} onClose={() => setActiveVideo(null)} />
        )
      )}
    </>
  );
}
