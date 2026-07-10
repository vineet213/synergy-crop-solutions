import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ChevronRight } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation("common");
  const year = new Date().getFullYear();

  const quickLinks = [
    { to: "/", label: t("footer.home") },
    { to: "/products", label: t("footer.products") },
    { to: "/categories", label: t("footer.categories") },
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
                src="/client-assets/logo/official-logo.jpeg"
                alt="Synergy Crop Solutions"
                className="footer-logo"
              />
              Synergy Crop Solutions
            </p>
            <p>{t("footer.tagline")}</p>
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
              <li>
                <a href="mailto:contact@synergycrops.com" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Mail size={14} style={{ opacity: 0.4, flexShrink: 0 }} />
                  <span>{t("footer.email")}</span>
                </a>
              </li>
              <li>
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#9ca3af" }}>
                  <Phone size={14} style={{ opacity: 0.4, flexShrink: 0 }} />
                  <span>{t("footer.phone")}</span>
                </span>
              </li>
              <li>
                <span style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", color: "#9ca3af" }}>
                  <MapPin size={14} style={{ opacity: 0.4, flexShrink: 0, marginTop: "0.2rem" }} />
                  <span>{t("footer.address")}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {year} Synergy Crop Solutions. {t("footer.copyright")}</span>
          <span style={{ opacity: 0.6 }}>{t("footer.taglineShort")}</span>
        </div>
      </div>
    </footer>
  );
}
