import { useState, useEffect, useCallback, useId } from "react";
import { useTranslation } from "react-i18next";

const PLACEHOLDER_IMAGES = [
  {
    src: "https://placehold.co/800x600/1b4332/ffffff?text=Farmers+at+Work",
    alt: "Farmers working in lush green fields",
  },
  {
    src: "https://placehold.co/800x600/0d2818/ffffff?text=Bio+Products",
    alt: "Bio-based crop protection products",
  },
  {
    src: "https://placehold.co/800x600/e0ede7/1b4332?text=Healthy+Harvest",
    alt: "Healthy, residue-free harvest",
  },
];

export default function HeroCarousel({ images = PLACEHOLDER_IMAGES, interval = 4000, labels = {} }) {
  const { t } = useTranslation("home");
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const uid = useId();

  const regionLabel = labels.region || t("carousel.region", "Featured images");
  const controlsLabel = labels.controls || t("carousel.controls", "Slide controls");
  const slideLabel = labels.slide || t("carousel.slide", "Slide");
  const ofLabel = labels.of || t("carousel.of", "of");
  const goToLabel = labels.goTo || t("carousel.goTo", "Go to slide");

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goTo = (index) => setCurrent(index);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [paused, next, interval, images.length]);

  if (images.length === 0) return null;

  return (
    <div
      className="hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-label={regionLabel}
      aria-roledescription="carousel"
    >
      <div className="hero-carousel-track">
        {images.map((img, index) => (
          <div
            key={index}
            className={`hero-carousel-slide ${index === current ? "active" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideLabel} ${index + 1} ${ofLabel} ${images.length}`}
            aria-hidden={index !== current}
          >
            <img src={img.src} alt={img.alt} loading={index === 0 ? "eager" : "lazy"} />
          </div>
        ))}
        <div className="hero-carousel-overlay" aria-hidden="true" />
      </div>

      {images.length > 1 && (
        <div className="hero-carousel-indicators" role="tablist" aria-label={controlsLabel}>
          {images.map((_, index) => (
            <button
              key={`${uid}-dot-${index}`}
              className={`carousel-dot ${index === current ? "active" : ""}`}
              onClick={() => goTo(index)}
              role="tab"
              aria-selected={index === current}
              aria-label={`${goToLabel} ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
