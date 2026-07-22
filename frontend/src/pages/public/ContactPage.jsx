import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Clock, Sprout, ChevronRight } from "lucide-react";
import ContactForm from "../../components/leads/ContactForm.jsx";
import useSEO from "../../hooks/useSEO.js";
import { useWebsiteSettings } from "../../context/WebsiteSettingsContext.jsx";

export default function ContactPage() {
  const { t } = useTranslation("common");
  const { settings } = useWebsiteSettings();
  useSEO({ title: t("page.contact.title"), description: t("page.contact.intro"), canonical: "/contact" });

  const displayEmail = settings?.contact?.email;
  const displayPhone = settings?.contact?.phoneNumbers?.filter(Boolean)?.[0];
  const displayAddress = [settings?.company?.address, settings?.company?.city, settings?.company?.state, settings?.company?.pinCode].filter(Boolean).join(", ") || null;
  const displayHours = settings?.contact?.officeHours;
  const mapsEmbedUrl = settings?.location?.googleMapsEmbedUrl;
  const partnerEmail = t("page.contact.partnerEmailValue");

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="prem-hero" style={{ padding: "5rem 0 4rem" }}>
        <div className="prem-container prem-hero-content">
          <div className="prem-hero-text">
            <span className="prem-hero-badge">
              <Sprout size={14} />
              {t("page.contact.subtitle")}
            </span>
            <h1 className="prem-hero-title">{t("page.contact.title")}</h1>
            <p className="prem-hero-sub">{t("page.contact.intro")}</p>
          </div>
          <div className="prem-hero-visual">
            <img
              src="/client-assets/contact/contact-hero.jpeg"
              alt="Agricultural expert consulting with farmers in a crop field"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
            />
          </div>
        </div>
      </section>

      {/* ============ CONTENT ============ */}
      <section className="prem prem-alt" style={{ paddingTop: "3rem" }}>
        <div className="prem-container">
          <div className="prem-contact-grid">
            {/* Form */}
            <div>
              <div className="prem-contact-form">
                <h3 style={{ margin: "0 0 1.25rem", fontSize: "1.15rem", fontWeight: 700, color: "var(--brand-strong)" }}>{t("page.contactPage.sendMessage")}</h3>
                <ContactForm />
              </div>
            </div>

            {/* Info */}
            <div className="prem-contact-info">
              <div className="prem-contact-card">
                <h3>{t("page.contact.otherWays")}</h3>
                {displayEmail && (
                  <div className="prem-contact-row">
                    <span className="prem-contact-row-icon"><Mail size={16} /></span>
                    <div className="prem-contact-row-body">
                      <span className="prem-contact-row-label">{t("page.contact.email")}</span>
                      <span className="prem-contact-row-value">
                        <a href={`mailto:${displayEmail}`}>{displayEmail}</a>
                      </span>
                    </div>
                  </div>
                )}
                {displayPhone && (
                  <div className="prem-contact-row">
                    <span className="prem-contact-row-icon"><Phone size={16} /></span>
                    <div className="prem-contact-row-body">
                      <span className="prem-contact-row-label">{t("page.contact.phone")}</span>
                      <span className="prem-contact-row-value">{displayPhone}</span>
                    </div>
                  </div>
                )}
                {displayAddress && (
                  <div className="prem-contact-row">
                    <span className="prem-contact-row-icon"><MapPin size={16} /></span>
                    <div className="prem-contact-row-body">
                      <span className="prem-contact-row-label">{t("page.contact.office")}</span>
                      <span className="prem-contact-row-value">{displayAddress}</span>
                    </div>
                  </div>
                )}
                {displayHours && (
                  <div className="prem-contact-row">
                    <span className="prem-contact-row-icon"><Clock size={16} /></span>
                    <div className="prem-contact-row-body">
                      <span className="prem-contact-row-label">{t("page.contactPage.businessHours")}</span>
                      <span className="prem-contact-row-value">{displayHours}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="prem-contact-card">
                <h3>{t("page.contactPage.distributorInquiries")}</h3>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
                  {t("page.contactPage.distributorDescription")}
                </p>
                <a href={`mailto:${t("page.contact.partnerEmailValue")}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "var(--brand)", fontWeight: 600, fontSize: "0.9rem", marginTop: "0.5rem" }}>
                  {t("page.contact.partnerEmailValue")} <ChevronRight size={14} />
                </a>
              </div>

              {mapsEmbedUrl && (
                <div className="prem-contact-card" style={{ padding: 0, overflow: "hidden" }}>
                  <iframe
                    src={mapsEmbedUrl}
                    title="Office Location"
                    width="100%"
                    height="300"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}