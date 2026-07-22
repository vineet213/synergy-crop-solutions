import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ChevronRight } from "lucide-react";
import { useWebsiteSettings } from "../../context/WebsiteSettingsContext.jsx";

const SOCIAL_ICONS = {
  facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  youtube: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  twitter: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  whatsapp: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
};

const SOCIAL_LABELS = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  twitter: "X (Twitter)",
  whatsapp: "WhatsApp",
};

function SocialLink({ platform, url }) {
  if (!url) return null;

  const linkStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "rgba(255,255,255,0.7)",
    transition: "all 0.2s",
    textDecoration: "none",
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={SOCIAL_LABELS[platform] || platform}
      title={SOCIAL_LABELS[platform] || platform}
      style={linkStyle}
      onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
    >
      {SOCIAL_ICONS[platform]}
    </a>
  );
}

export default function Footer() {
  const { t } = useTranslation("common");
  const { settings } = useWebsiteSettings();
  const year = new Date().getFullYear();

  const quickLinks = [
    { to: "/", label: t("footer.home") },
    { to: "/products", label: t("footer.products") },
    { to: "/about", label: t("footer.aboutUs") },
    { to: "/blog", label: t("footer.blog") },
    { to: "/contact", label: t("footer.contactUs") },
  ];

  const productLinks = [
    { to: "/products?category=Bio+Fertilizers", label: t("footer.bioFertilizers") },
    { to: "/products?category=Bio+Pesticides", label: t("footer.bioPesticides") },
    { to: "/products?category=Consortia", label: t("footer.consortiaProducts") },
    { to: "/products?category=Liquid+Nutrition", label: t("footer.liquidNutrition") },
    { to: "/products?category=Organic+Inputs", label: t("footer.organicInputs") },
  ];

  const socialLinks = [
    { platform: "facebook", url: settings?.socialMedia?.facebook },
    { platform: "instagram", url: settings?.socialMedia?.instagram },
    { platform: "linkedin", url: settings?.socialMedia?.linkedin },
    { platform: "youtube", url: settings?.socialMedia?.youtube },
    { platform: "twitter", url: settings?.socialMedia?.twitter },
  ].filter((s) => s.url);

  const hasWhatsApp = settings?.contact?.whatsappNumber;
  const whatsappUrl = hasWhatsApp
    ? `https://wa.me/${settings.contact.whatsappNumber.replace(/[^0-9]/g, "")}`
    : "";
  const hasSocialMedia = socialLinks.length > 0 || hasWhatsApp;

  return (
    <footer className="site-footer">
      <div className="page-container" style={{ paddingTop: "4.5rem", paddingBottom: "0" }}>
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-about">
            <p className="footer-brand" style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.75rem" }}>
              {settings?.assets?.logo ? (
                <img
                  src={`/${settings.assets.logo}`}
                  alt={settings?.company?.name || t("footer.brandName")}
                  className="footer-logo"
                />
              ) : null}
              {settings?.company?.name || t("footer.brandName")}
            </p>
            {settings?.website?.footerText ? (
              <p>{settings.website.footerText}</p>
            ) : (
              <p>{t("footer.tagline")}</p>
            )}

            {/* Social Media Icons */}
            {hasSocialMedia && (
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
                {socialLinks.map((s) => (
                  <SocialLink key={s.platform} platform={s.platform} url={s.url} />
                ))}
                {hasWhatsApp && (
                  <SocialLink platform="whatsapp" url={whatsappUrl} />
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <p className="footer-heading">{t("footer.quickLinks")}</p>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>
                    <ChevronRight size={12} style={{ opacity: 0.4, flexShrink: 0 }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <p className="footer-heading">{t("footer.productCategories")}</p>
            <ul className="footer-links">
              {productLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>
                    <ChevronRight size={12} style={{ opacity: 0.4, flexShrink: 0 }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="footer-heading">{t("footer.contact")}</p>
            <ul className="footer-links" style={{ gap: "0.8rem" }}>
              {settings?.contact?.email && (
                <li>
                  <a href={`mailto:${settings.contact.email}`} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Mail size={14} style={{ opacity: 0.4, flexShrink: 0 }} />
                    <span>{settings.contact.email}</span>
                  </a>
                </li>
              )}
              {settings?.contact?.phoneNumbers?.filter(Boolean).length > 0 ? (
                settings.contact.phoneNumbers.filter(Boolean).map((phone, idx) => (
                  <li key={idx}>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Phone size={14} style={{ opacity: 0.4, flexShrink: 0 }} />
                      <span>{phone}</span>
                    </a>
                  </li>
                ))
              ) : null}
              {(settings?.company?.address || settings?.company?.city || settings?.company?.state) && (
                <li>
                  <span style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", color: "#9ca3af" }}>
                    <MapPin size={14} style={{ opacity: 0.4, flexShrink: 0, marginTop: "0.2rem" }} />
                    <span>{[settings.company.address, settings.company.city, settings.company.state, settings.company.pinCode].filter(Boolean).join(", ")}</span>
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {year} {settings?.company?.name || t("footer.brandName")}. {settings?.website?.copyrightText || t("footer.copyright")}</span>
          <span style={{ opacity: 0.6 }}>{settings?.company?.tagline || t("footer.taglineShort")}</span>
        </div>
      </div>
    </footer>
  );
}
