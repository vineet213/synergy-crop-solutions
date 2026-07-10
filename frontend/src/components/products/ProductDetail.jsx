import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  FileText, CheckCircle, Sprout, FlaskConical,
  Droplet, Thermometer, Shield, Download,
  Tag, Package, MapPin, Box, Image as ImageIcon,
  ArrowRight, Leaf, AlertTriangle, Clock,
  X, ChevronDown, Award, Film, ExternalLink, Phone, Info, Microscope,
  Calendar, HelpCircle, Bug, Beaker, Maximize2
} from "lucide-react";
import useEnrichedProduct from "../../hooks/useEnrichedProduct.js";
import { formatCategory } from "../../utils/formatters.js";

function imageUrl(raw) {
  if (!raw) return null;
  return raw.startsWith("http") || raw.startsWith("/") ? raw : `/${raw}`;
}

const TABS = [
  { id: "overview", icon: FileText, labelKey: "detail.overview" },
  { id: "benefits", icon: CheckCircle, labelKey: "detail.benefits" },
  { id: "crops", icon: Sprout, labelKey: "detail.targetCrops" },
  { id: "composition", icon: FlaskConical, labelKey: "detail.composition" },
  { id: "application", icon: Droplet, labelKey: "detail.dosageApplication" },
  { id: "storage", icon: Thermometer, labelKey: "detail.storageShelfLife" },
  { id: "safety", icon: Shield, labelKey: "detail.safety" },
];

export default function ProductDetail({ product }) {
  const { t } = useTranslation("products");
  const p = useEnrichedProduct(product);
  const na = t("detail.availableOnRequest");

  const images = (p.images || []).map(imageUrl).filter(Boolean);
  const [selectedImg, setSelectedImg] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [fullscreenImg, setFullscreenImg] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [showSticky, setShowSticky] = useState(true);

  const relatedProducts = p.relatedProducts || [];

  function SectionBlock({ icon: Icon, title, children }) {
    return (
      <section className="pd-section" style={{ marginBottom: "1rem" }}>
        <div className="pd-section-head">
          <span className="pd-section-icon"><Icon size={20} /></span>
          <h2 className="pd-section-title">{title}</h2>
        </div>
        <div className="pd-section-body">{children}</div>
      </section>
    );
  }

  return (
    <div>
      {/* ===== FULLSCREEN MODAL ===== */}
      {fullscreenImg !== null && (
        <div className="pd-fs-overlay" onClick={() => setFullscreenImg(null)}>
          <button className="pd-fs-close" onClick={() => setFullscreenImg(null)}><X size={24} /></button>
          <img src={images[fullscreenImg]} alt={p.name} className="pd-fs-img" />
        </div>
      )}

      {/* ===== HERO V2 ===== */}
      <div className="pd-hero-v2">
        {/* LEFT: Gallery */}
        <div className="pd-gallery">
          {images.length > 0 ? (
            <>
              <div className="pd-gallery-main" style={{ cursor: "pointer" }} onClick={() => setFullscreenImg(selectedImg)}>
                <img src={images[selectedImg]} alt={p.name} />
                <span className="pd-gallery-zoom"><Maximize2 size={16} /></span>
              </div>
              {images.length > 1 && (
                <div className="pd-gallery-thumbs" role="tablist" aria-label={t("detail.productImageThumbnails")}>
                  {images.map((url, i) => (
                    <button
                      key={i}
                      role="tab"
                      aria-selected={i === selectedImg}
                      className={`pd-gallery-thumb ${i === selectedImg ? "active" : ""}`}
                      onClick={() => setSelectedImg(i)}
                    >
                      <img src={url} alt={t("detail.thumbnailAlt", { name: p.name, index: i + 1 })} />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="pd-noimg" style={{ minHeight: "340px" }}>
              <ImageIcon size={48} />
              <span>{na}</span>
            </div>
          )}
        </div>

        {/* RIGHT: Info */}
        <div className="pd-info-v2">
          <span className="pd-info-badge">{formatCategory(p.category, t)}</span>
          <h1 className="pd-info-name">{p.name}</h1>
          {p.scientificName && (
            <p className="pd-info-sci"><em>{p.scientificName}</em></p>
          )}
          {p.shortDescription && (
            <p className="pd-info-desc">{p.shortDescription}</p>
          )}

          {p.cfu && (
            <div className="pd-info-badges">
              <span className="pd-cert-badge"><Beaker size={14} /> {p.cfu}</span>
            </div>
          )}

          <div className="pd-info-grid">
            <div className="pd-info-cell">
              <span className="pd-info-cell-icon"><Tag size={16} /></span>
              <div className="pd-info-cell-body">
                <span className="pd-info-cell-label">{t("detail.category")}</span>
                <span className="pd-info-cell-value">{formatCategory(p.category, t)}</span>
              </div>
            </div>
            {p.productType && (
              <div className="pd-info-cell">
                <span className="pd-info-cell-icon"><Package size={16} /></span>
                <div className="pd-info-cell-body">
                  <span className="pd-info-cell-label">{t("detail.productType")}</span>
                  <span className="pd-info-cell-value">{p.productType}</span>
                </div>
              </div>
            )}
            {p.packSize?.length > 0 && (
              <div className="pd-info-cell">
                <span className="pd-info-cell-icon"><Box size={16} /></span>
                <div className="pd-info-cell-body">
                  <span className="pd-info-cell-label">{t("detail.packSize")}</span>
                  <span className="pd-info-cell-value">{p.packSize.join(", ")}</span>
                </div>
              </div>
            )}
          </div>

          {/* USPs */}
          {p.metadata?.usp && p.metadata.usp.length > 0 && (
            <div className="pd-usps">
              {p.metadata.usp.map((usp, i) => <span key={i} className="pd-usp">{usp}</span>)}
            </div>
          )}

          {/* CTA */}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
            <Link to="/contact" className="button-base button-primary">
              {t("detail.enquireNow")} <ArrowRight size={16} style={{ marginLeft: "0.35rem" }} />
            </Link>
            {product.brochure && (
              <a href={product.brochure} target="_blank" rel="noopener noreferrer" className="button-base button-secondary">
                <Download size={16} style={{ marginRight: "0.35rem" }} />
                {t("detail.downloadBrochure")}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ===== TABS ===== */}
      <div className="pd-tabs">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              className={`pd-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} style={{ marginRight: "0.4rem", verticalAlign: "middle" }} />
              {t(tab.labelKey)}
            </button>
          );
        })}
      </div>

      {/* ===== TAB CONTENT ===== */}
      <div style={{ marginTop: "1.5rem" }}>

        {/* ── Overview ── */}
        {activeTab === "overview" && (
          <div>
            {(p.longDescription || p.description || p.shortDescription) && (
              <SectionBlock icon={FileText} title={t("detail.overview")}>
                <p className="pd-section-p">{p.longDescription || p.description || p.shortDescription}</p>
              </SectionBlock>
            )}

            {p.benefits?.length > 0 && (
              <SectionBlock icon={CheckCircle} title={t("detail.benefits")}>
                <ul className="pd-ul">
                  {p.benefits.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </SectionBlock>
            )}

            {p.targetCrops?.length > 0 && (
              <SectionBlock icon={Sprout} title={t("detail.targetCrops")}>
                <div className="pd-tags">
                  {p.targetCrops.map((c, i) => <span key={i} className="pd-tag">{c}</span>)}
                </div>
              </SectionBlock>
            )}
          </div>
        )}

        {/* ── Composition ── */}
        {activeTab === "composition" && p.composition && (
          <section className="pd-section">
            <div className="pd-section-head">
              <span className="pd-section-icon"><FlaskConical size={20} /></span>
              <h2 className="pd-section-title">{t("detail.composition")}</h2>
            </div>
                <div className="pd-comp-table-wrap">
              <table className="pd-comp-table">
                <tbody>
                  <tr><td className="pd-comp-label">{t("detail.compositionLabel")}</td><td className="pd-comp-value">{p.composition}</td></tr>
                  {p.scientificName && <tr><td className="pd-comp-label">{t("detail.scientificNameLabel")}</td><td className="pd-comp-value"><em>{p.scientificName}</em></td></tr>}
                  {p.cfu && <tr><td className="pd-comp-label">{t("detail.cfuCountLabel")}</td><td className="pd-comp-value">{p.cfu}</td></tr>}
                  {p.productType && <tr><td className="pd-comp-label">{t("detail.formulationLabel")}</td><td className="pd-comp-value">{p.productType}</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Application ── */}
        {activeTab === "application" && (p.dosage || p.applicationMethod) && (
          <section className="pd-section" style={{ marginBottom: "1rem" }}>
            <div className="pd-section-head">
              <span className="pd-section-icon"><Droplet size={20} /></span>
              <h2 className="pd-section-title">{t("detail.dosageApplication")}</h2>
            </div>
            <div className="pd-specs">
              {p.dosage && (
                <div className="pd-spec">
                  <span className="pd-spec-l">{t("detail.dosage")}</span>
                  <strong className="pd-spec-v">{p.dosage}</strong>
                </div>
              )}
              {p.applicationMethod && (
                <div className="pd-spec">
                  <span className="pd-spec-l">{t("detail.applicationMethod")}</span>
                  <strong className="pd-spec-v">{p.applicationMethod}</strong>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Storage ── */}
        {activeTab === "storage" && (p.storage || p.shelfLife) && (
          <section className="pd-section" style={{ marginBottom: "1rem" }}>
            <div className="pd-section-head">
              <span className="pd-section-icon"><Thermometer size={20} /></span>
              <h2 className="pd-section-title">{t("detail.storageShelfLife")}</h2>
            </div>
            <div className="pd-specs">
              {p.storage && (
                <div className="pd-spec">
                  <span className="pd-spec-l">{t("detail.storage")}</span>
                  <strong className="pd-spec-v">{p.storage}</strong>
                </div>
              )}
              {p.shelfLife && (
                <div className="pd-spec">
                  <span className="pd-spec-l">{t("detail.shelfLife")}</span>
                  <strong className="pd-spec-v">{p.shelfLife}</strong>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Safety / Compatibility ── */}
        {activeTab === "safety" && p.compatibility && (
          <section className="pd-section" style={{ marginBottom: "1rem" }}>
            <div className="pd-section-head">
              <span className="pd-section-icon"><Shield size={20} /></span>
              <h2 className="pd-section-title">{t("detail.safety")}</h2>
            </div>
            <div className="pd-specs">
              <div className="pd-spec">
                <span className="pd-spec-l">{t("detail.compatibility")}</span>
                <strong className="pd-spec-v">{p.compatibility}</strong>
              </div>
            </div>
          </section>
        )}

        {/* ── Crops tab ── */}
        {activeTab === "crops" && p.targetCrops?.length > 0 && (
          <>
            <section className="pd-section" style={{ marginBottom: "1rem" }}>
              <div className="pd-section-head">
                <span className="pd-section-icon"><Sprout size={20} /></span>
                <h2 className="pd-section-title">{t("detail.targetCrops")}</h2>
              </div>
              <p className="pd-section-p" style={{ marginBottom: "1rem" }}>{t("detail.recommendedForCrops")}</p>
              <div className="pd-tags">
                {p.targetCrops.map((c, i) => <span key={i} className="pd-tag">{c}</span>)}
              </div>
            </section>
          </>
        )}

        {/* ── Benefits tab ── */}
        {activeTab === "benefits" && p.benefits?.length > 0 && (
          <section className="pd-section" style={{ marginBottom: "1rem" }}>
            <div className="pd-section-head">
              <span className="pd-section-icon"><CheckCircle size={20} /></span>
              <h2 className="pd-section-title">{t("detail.benefits")}</h2>
            </div>
            <div className="pd-benefits-rich">
              {p.benefits.map((b, i) => (
                <div key={i} className="pd-benefit-card">
                  <CheckCircle size={18} className="pd-benefit-icon" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* ===== FAQ ACCORDION ===== */}
      {p.metadata?.faqs && p.metadata.faqs.length > 0 && (
        <section className="pd-section" style={{ marginTop: "1.5rem" }}>
          <div className="pd-section-head">
            <span className="pd-section-icon"><HelpCircle size={20} /></span>
            <h2 className="pd-section-title">{t("detail.frequentlyAskedQuestions") || "Frequently Asked Questions"}</h2>
          </div>
          <div className="pd-faqs">
            {p.metadata.faqs.map((faq, i) => (
              <div key={i} className={`pd-faq ${openFaq === i ? "open" : ""}`}>
                <button className="pd-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.question}</span>
                  <ChevronDown size={18} className="pd-faq-chevron" />
                </button>
                {openFaq === i && (
                  <div className="pd-faq-a">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== VIDEO EMBED ===== */}
      {p.videoUrl && (
        <section className="pd-section" style={{ marginTop: "1.5rem" }}>
          <div className="pd-section-head">
            <span className="pd-section-icon"><Film size={20} /></span>
            <h2 className="pd-section-title">{t("detail.video") || "Product Video"}</h2>
          </div>
          <div className="pd-video-wrap">
            <iframe
              src={p.videoUrl}
              title={t("detail.videoTitle", { name: p.name })}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </section>
      )}

      {/* ===== DOWNLOADS ===== */}
      <section className="pd-section" style={{ marginTop: "1.5rem" }}>
        <div className="pd-section-head">
          <span className="pd-section-icon"><Download size={20} /></span>
          <h2 className="pd-section-title">{t("detail.downloads")}</h2>
        </div>
        <div className="pd-dl">
          <div className="pd-dl-body">
            <Download size={24} className="pd-dl-icon" />
            <div>
              <p className="pd-dl-title">{t("detail.downloadBrochure")}</p>
              <p className="pd-dl-desc">
                {product.brochure ? t("detail.downloadDescription") : t("detail.brochureNotAvailable")}
              </p>
            </div>
          </div>
          {product.brochure ? (
            <a href={product.brochure} target="_blank" rel="noopener noreferrer" className="button-base button-primary">
              <Download size={16} style={{ marginRight: "0.35rem" }} />
              {t("detail.download")}
            </a>
          ) : (
            <button type="button" className="button-base button-secondary" disabled>{t("detail.downloadBrochure")}</button>
          )}
        </div>
      </section>

      {/* ===== RELATED PRODUCTS ===== */}
      {relatedProducts.length > 0 && (
        <section style={{ marginTop: "2.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--brand-strong)", margin: "0 0 1rem" }}>{t("detail.relatedProducts")}</h2>
          <div className="pd-related">
            {relatedProducts.map((rp) => (
              <Link key={rp._id || rp.slug} to={`/products/${rp.slug}`} className="pd-related-card no-underline">
                {rp.images?.[0] && (
                  <div className="pd-related-img">
                    <img src={imageUrl(rp.images[0])} alt={rp.name} loading="lazy" />
                  </div>
                )}
                <div className="pd-related-body">
                  <span className="pd-related-cat">{formatCategory(rp.category, t)}</span>
                  <h3 className="pd-related-name">{rp.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ===== ENQUIRY CTA ===== */}
      <section style={{ marginTop: "2.5rem" }}>
        <div className="prem-cta-card" style={{ padding: "2.5rem" }}>
          <header className="prem-header center">
            <span className="prem-header__label" style={{ color: "rgba(255,255,255,0.6)" }}>{t("detail.ctaLabel")}</span>
            <h2 className="prem-header__title" style={{ fontSize: "1.5rem" }}>{t("detail.ctaTitle")}</h2>
            <p className="prem-header__text">{t("detail.ctaDescription")}</p>
          </header>
          <div className="prem-cta-actions">
            <Link to="/contact" className="button-base button-primary">
              {t("detail.enquireNow")} <ArrowRight size={16} style={{ marginLeft: "0.35rem" }} />
            </Link>
            <Link to="/distributors" className="button-base button-secondary" style={{ borderColor: "rgba(255,255,255,0.3)", color: "var(--text-inverse)" }}>
              {t("detail.findDistributor")}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== STICKY MOBILE CTA ===== */}
      {showSticky && (
        <div className="pd-sticky-cta">
          <Link to="/contact" className="pd-sticky-btn">
            <Phone size={16} />
            {t("detail.stickyEnquireNow")}
          </Link>
          <button className="pd-sticky-close" onClick={() => setShowSticky(false)}><X size={16} /></button>
        </div>
      )}
    </div>
  );
}
