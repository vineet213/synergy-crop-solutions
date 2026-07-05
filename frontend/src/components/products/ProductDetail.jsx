import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FileText, CheckCircle, Sprout, FlaskConical,
  Droplet, Thermometer, Shield, Download,
  Tag, Package, MapPin, Box, Image as ImageIcon
} from "lucide-react";

function QuickInfoCard({ icon: Icon, label, value }) {
  return (
    <div className="pd-qcard">
      <span className="pd-qcard-icon"><Icon size={16} /></span>
      <div className="pd-qcard-body">
        <span className="pd-qcard-label">{label}</span>
        <strong className="pd-qcard-value">{value}</strong>
      </div>
    </div>
  );
}

function DetailSection({ icon: Icon, title, children }) {
  return (
    <section className="pd-section">
      <div className="pd-section-head">
        <span className="pd-section-icon"><Icon size={20} /></span>
        <h2 className="pd-section-title">{title}</h2>
      </div>
      <div className="pd-section-body">{children}</div>
    </section>
  );
}

function imageUrl(raw) {
  if (!raw) return null;
  return raw.startsWith("http") || raw.startsWith("/") ? raw : `/${raw}`;
}

export default function ProductDetail({ product }) {
  const { t } = useTranslation("products");
  const na = t("detail.availableOnRequest");

  const images = (product.images || []).map(imageUrl).filter(Boolean);
  const [selectedImg, setSelectedImg] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  function val(v) {
    return v || na;
  }

  return (
    <div className="pd-wrapper">
      {/* ===== HERO ===== */}
      <div className="pd-hero">
        {/* LEFT: Image */}
        <div className="pd-hero-visual">
          {images.length > 0 ? (
            <>
              <div
                className={`pd-main-img ${zoomed ? "zoomed" : ""}`}
                onMouseEnter={() => setZoomed(true)}
                onMouseLeave={() => setZoomed(false)}
              >
                <img src={images[selectedImg]} alt={product.name} />
              </div>
              {images.length > 1 && (
                <div className="pd-thumbs" role="tablist" aria-label="Product image thumbnails">
                  {images.map((url, i) => (
                    <button
                      key={i}
                      role="tab"
                      aria-selected={i === selectedImg}
                      className={`pd-thumb ${i === selectedImg ? "active" : ""}`}
                      onClick={() => setSelectedImg(i)}
                    >
                      <img src={url} alt={`${product.name} view ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="pd-noimg">
              <ImageIcon size={48} />
              <span className="pd-qcard-value">{na}</span>
            </div>
          )}
        </div>

        {/* RIGHT: Info */}
        <div className="pd-hero-info">
          <span className="pd-badge">{product.category}</span>
          <h1 className="pd-name">{product.name}</h1>
          {product.scientificName && (
            <p className="pd-sci-name"><em>{product.scientificName}</em></p>
          )}
          {product.shortDescription && (
            <p className="pd-desc">{product.shortDescription}</p>
          )}
          <div className="pd-qgrid">
            <QuickInfoCard icon={Tag} label={t("detail.category")} value={product.category} />
            <QuickInfoCard icon={Package} label={t("detail.productType")} value={val(product.productType)} />
            <QuickInfoCard icon={MapPin} label={t("detail.origin")} value={na} />
            <QuickInfoCard icon={Box} label={t("detail.packSize")} value={product.packSize?.length ? product.packSize.join(", ") : na} />
          </div>
        </div>
      </div>

      {/* ===== DETAIL SECTIONS ===== */}
      <DetailSection icon={FileText} title={t("detail.overview")}>
        {product.longDescription || product.description || product.shortDescription ? (
          <p className="pd-section-p">{product.longDescription || product.description || product.shortDescription}</p>
        ) : (
          <p className="pd-na">{na}</p>
        )}
      </DetailSection>

      <DetailSection icon={CheckCircle} title={t("detail.benefits")}>
        {product.benefits?.length > 0 ? (
          <ul className="pd-ul">
            {product.benefits.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        ) : (
          <p className="pd-na">{na}</p>
        )}
      </DetailSection>

      <DetailSection icon={Sprout} title={t("detail.targetCrops")}>
        {product.targetCrops?.length > 0 ? (
          <div className="pd-tags">
            {product.targetCrops.map((c, i) => <span key={i} className="pd-tag">{c}</span>)}
          </div>
        ) : (
          <p className="pd-na">{na}</p>
        )}
      </DetailSection>

      <DetailSection icon={FlaskConical} title={t("detail.composition")}>
        {product.composition ? (
          <p className="pd-section-p">{product.composition}</p>
        ) : (
          <p className="pd-na">{na}</p>
        )}
      </DetailSection>

      <DetailSection icon={Droplet} title={t("detail.dosageApplication")}>
        {product.dosage || product.applicationMethod ? (
          <div className="pd-specs">
            {product.dosage && (
              <div className="pd-spec">
                <span className="pd-spec-l">{t("detail.dosage")}</span>
                <strong className="pd-spec-v">{product.dosage}</strong>
              </div>
            )}
            {product.applicationMethod && (
              <div className="pd-spec">
                <span className="pd-spec-l">{t("detail.applicationMethod")}</span>
                <strong className="pd-spec-v">{product.applicationMethod}</strong>
              </div>
            )}
          </div>
        ) : (
          <p className="pd-na">{na}</p>
        )}
      </DetailSection>

      <DetailSection icon={Thermometer} title={t("detail.storageShelfLife")}>
        {product.storage || product.shelfLife ? (
          <div className="pd-specs">
            {product.storage && (
              <div className="pd-spec">
                <span className="pd-spec-l">{t("detail.storage")}</span>
                <strong className="pd-spec-v">{product.storage}</strong>
              </div>
            )}
            {product.shelfLife && (
              <div className="pd-spec">
                <span className="pd-spec-l">{t("detail.shelfLife")}</span>
                <strong className="pd-spec-v">{product.shelfLife}</strong>
              </div>
            )}
          </div>
        ) : (
          <p className="pd-na">{na}</p>
        )}
      </DetailSection>

      <DetailSection icon={Shield} title={t("detail.safety")}>
        {product.compatibility || (product.metadata && Object.keys(product.metadata).length > 0) ? (
          <div className="pd-specs">
            {product.compatibility && (
              <div className="pd-spec">
                <span className="pd-spec-l">{t("detail.compatibility")}</span>
                <strong className="pd-spec-v">{product.compatibility}</strong>
              </div>
            )}
            {product.metadata && Object.keys(product.metadata).length > 0 && Object.entries(product.metadata).map(([k, v]) => (
              <div key={k} className="pd-spec">
                <span className="pd-spec-l">{k}</span>
                <strong className="pd-spec-v">{String(v)}</strong>
              </div>
            ))}
          </div>
        ) : (
          <p className="pd-na">{na}</p>
        )}
      </DetailSection>

      <DetailSection icon={Download} title={t("detail.downloads")}>
        <div className="pd-dl">
          <div className="pd-dl-body">
            <Download size={24} className="pd-dl-icon" />
            <div>
              <p className="pd-dl-title">{t("detail.downloadBrochure")}</p>
              <p className="pd-dl-desc">{t("detail.brochureNotAvailable")}</p>
            </div>
          </div>
          <button type="button" className="button-base button-secondary" disabled>{t("detail.downloadBrochure")}</button>
        </div>
      </DetailSection>
    </div>
  );
}