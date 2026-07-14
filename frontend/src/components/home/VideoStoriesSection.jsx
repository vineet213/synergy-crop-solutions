import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Play, ChevronRight } from "lucide-react";
import VideoModal from "../../components/ui/VideoModal.jsx";
import { videoTestimonials } from "../../data/testimonials.js";

const featuredVideos = videoTestimonials.filter((v) => v.isFeatured);

export default function VideoStoriesSection() {
  const [activeVideo, setActiveVideo] = useState(null);
  const { t } = useTranslation("home");
  const navigate = useNavigate();

  return (
    <>
      <section className="prem prem-alt">
        <div className="prem-container">
          <header className="prem-header center">
            <span className="prem-header__label">{t("stories.label")}</span>
            <h2 className="prem-header__title">{t("stories.title")}</h2>
          </header>
          <div className="vs-grid">
            {featuredVideos.map((item) => (
              <div key={item.id} className="vs-card">
                <div
                  className="vs-thumb"
                  onClick={() => setActiveVideo(item.video)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setActiveVideo(item.video);
                  }}
                  aria-label={t("stories.play")}
                >
                  <video
                    src={item.video}
                    preload="metadata"
                    muted
                    className="vs-thumb-video"
                  />
                  <div className="vs-thumb-overlay">
                    <span className="vs-play-btn">
                      <Play size={28} fill="currentColor" />
                    </span>
                  </div>
                </div>
                <div className="vs-card-body">
                  <p className="vs-card-label">{t("stories.cardLabel")}</p>
                  <button
                    className="vs-watch-btn"
                    onClick={() => setActiveVideo(item.video)}
                  >
                    {t("stories.play")} <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
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
        <VideoModal src={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </>
  );
}
