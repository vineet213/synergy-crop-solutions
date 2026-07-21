import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ChevronRight } from "lucide-react";
import { useWebsiteSettings } from "../../context/WebsiteSettingsContext.jsx";

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

  return (
    <footer className="site-footer">
      <div className="page-container" style={{ paddingTop: "4.5rem", paddingBottom: "0" }}>
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-about">
            <p className="footer-brand" style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.75rem" }}>
              <img
                src={settings?.assets?.logo ? `/${settings.assets.logo}` : "/client-assets/logo/official-logo.jpeg"}
                alt={settings?.company?.name || t("footer.brandName")}
                className="footer-logo"
              />
              {settings?.company?.name || t("footer.brandName")}
            </p>
            <p>{settings?.website?.footerText || t("footer.tagline")}</p>
            <p>{t("about.visionStatement")}</p>
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
              ) : (
                <li>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#9ca3af" }}>
                    <Phone size={14} style={{ opacity: 0.4, flexShrink: 0 }} />
                    <span>{t("footer.phone")}</span>
                  </span>
                </li>
              )}
              {(settings?.company?.address || settings?.company?.city || settings?.company?.state) && (
                <li>
                  <span style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", color: "#9ca3af" }}>
                    <MapPin size={14} style={{ opacity: 0.4, flexShrink: 0, marginTop: "0.2rem" }} />
                    <span>{[settings.company.address, settings.company.city, settings.company.state, settings.company.pinCode].filter(Boolean).join(", ") || t("footer.address")}</span>
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
