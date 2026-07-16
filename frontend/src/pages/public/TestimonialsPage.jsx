import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Play, ChevronLeft, ChevronRight, X,
  Image as ImageIcon, ArrowRight, User,
} from "lucide-react";
import useSEO from "../../hooks/useSEO.js";
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

export default function TestimonialsPage() {
  useSEO({
    title: "Testimonials — Synergy Crop Solutions",
    description:
      "Watch video testimonials from farmers and explore our gallery of residue-free agriculture in action across Maharashtra and Karnataka.",
    canonical: "/testimonials",
  });
  const { t } = useTranslation("testimonials");
  const { t: tc } = useTranslation("common");
  const navigate = useNavigate();

  const [allTestimonials, setAllTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    let cancelled = false;
    testimonialService
      .getPublicTestimonials({ sort: "displayOrder,-createdAt" })
      .then((data) => {
        if (!cancelled) setAllTestimonials(data || []);
      })
      .catch(() => {
        if (!cancelled) setAllTestimonials([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const videoTestimonials = allTestimonials.filter((t) => t.video);
  const galleryImages = allTestimonials
    .filter((t) => t.image)
    .map((t) => ({
      src: mediaUrl(t.image),
      alt: t.customerName || "Agricultural field",
    }));

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) => (i > 0 ? i - 1 : galleryImages.length - 1));
  const nextImage = () =>
    setLightboxIndex((i) => (i < galleryImages.length - 1 ? i + 1 : 0));

  return (
    <div className="page-container">
      {/* ============ HERO ============ */}
      <section className="tp-hero">
        <div className="prem-container">
          <span className="prem-header__label">{t("hero.label")}</span>
          <h1 className="tp-hero-title">{t("hero.title")}</h1>
          <p className="tp-hero-sub">{t("hero.subtitle")}</p>
        </div>
      </section>

      {/* ============ SECTION A: VIDEO TESTIMONIALS ============ */}
      {!loading && videoTestimonials.length > 0 && (
        <section className="tp-section">
          <div className="prem-container">
            <header className="prem-header center">
              <span className="prem-header__label">{t("videos.label")}</span>
              <h2 className="prem-header__title">{t("videos.title")}</h2>
            </header>
            <div className="tp-video-grid">
              {videoTestimonials.map((item) => {
                const thumbSrc = mediaUrl(item.thumbnail) || mediaUrl(item.image);
                const videoSrc = mediaUrl(item.video);
                const ytUrl = isYouTube(item.video) ? item.video : null;
                const playable = ytUrl || videoSrc;

                return (
                  <div key={item._id} className="vs-card">
                    <div
                      className="vs-thumb"
                      onClick={() => setActiveVideo(playable)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setActiveVideo(playable);
                      }}
                      aria-label={t("videos.play")}
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
                        onClick={() => setActiveVideo(playable)}
                      >
                        {t("videos.play")} <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============ SECTION B: GALLERY ============ */}
      {!loading && galleryImages.length > 0 && (
        <section className="tp-section tp-section--alt">
          <div className="prem-container">
            <header className="prem-header center">
              <span className="prem-header__label">{t("gallery.label")}</span>
              <h2 className="prem-header__title">{t("gallery.title")}</h2>
            </header>
            <div className="tp-gallery-grid">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  className="tp-gallery-item"
                  onClick={() => openLightbox(idx)}
                  aria-label={t("gallery.viewImage")}
                >
                  <img src={img.src} alt={img.alt} loading="lazy" />
                  <div className="tp-gallery-hover">
                    <ImageIcon size={24} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ CTA ============ */}
      <section className="tp-section">
        <div className="prem-container">
          <div className="prem-cta-card">
            <header className="prem-header center">
              <span className="prem-header__label" style={{ color: "rgba(255,255,255,0.6)" }}>{t("cta.label")}</span>
              <h2 className="prem-header__title">{t("cta.title")}</h2>
              <p className="prem-header__text">{t("cta.text")}</p>
            </header>
            <div className="prem-cta-actions">
              <button className="button-base button-primary" onClick={() => navigate("/contact")}>
                {tc("cta.contactOurTeam")} <ArrowRight size={16} />
              </button>
              <button className="button-base button-secondary" onClick={() => navigate("/products")}>
                {tc("cta.exploreSolutions")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LIGHTBOX ============ */}
      {lightboxIndex !== null && (
        <div className="lb-overlay" onClick={closeLightbox}>
          <button className="lb-close" onClick={closeLightbox} aria-label={t("lightbox.close")}>
            <X size={28} />
          </button>
          <button
            className="lb-nav lb-nav--prev"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label={t("lightbox.prev")}
          >
            <ChevronLeft size={32} />
          </button>
          <div className="lb-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
            />
            <p className="lb-caption">
              {lightboxIndex + 1} <span className="lb-counter">{t("lightbox.of")} {galleryImages.length}</span>
            </p>
          </div>
          <button
            className="lb-nav lb-nav--next"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label={t("lightbox.next")}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}

      {/* ============ VIDEO MODAL ============ */}
      {activeVideo && (
        isYouTube(activeVideo) ? (
          <div className="vm-overlay" onClick={() => setActiveVideo(null)}>
            <div className="vm-content" onClick={(e) => e.stopPropagation()}>
              <button className="vm-close" onClick={() => setActiveVideo(null)} aria-label="Close">
                <X size={24} />
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
    </div>
  );
}
