import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Sprout, Mail, MapPin, Phone, ChevronRight } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation("common");
  const year = new Date().getFullYear();

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/categories", label: "Categories" },
    { to: "/about", label: "About Us" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  const productLinks = [
    { to: "/products?category=Bio+Fertilizers", label: "Bio Fertilizers" },
    { to: "/products?category=Bio+Pesticides", label: "Bio Pesticides" },
    { to: "/products?category=Consortia", label: "Consortia Products" },
    { to: "/products?category=Liquid+Nutrition", label: "Liquid Nutrition" },
    { to: "/products?category=Organic+Inputs", label: "Organic Inputs" },
  ];

  return (
    <footer className="site-footer">
      <div className="page-container" style={{ paddingTop: "4.5rem", paddingBottom: "0" }}>
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-about">
            <p className="footer-brand" style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.75rem" }}>
              <span style={{ display: "inline-flex", padding: "0.4rem", borderRadius: "8px", background: "linear-gradient(135deg, #1b4332 0%, #0d2818 100%)", color: "#ffffff" }}>
                <Sprout size={18} />
              </span>
              Synergy Crop Solutions
            </p>
            <p>{t("footer.tagline")}</p>
            <p>{t("about.visionStatement")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="footer-heading">Quick Links</p>
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
            <p className="footer-heading">Products</p>
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
                  <span>contact@synergycrops.com</span>
                </a>
              </li>
              <li>
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#9ca3af" }}>
                  <Phone size={14} style={{ opacity: 0.4, flexShrink: 0 }} />
                  <span>Available on request</span>
                </span>
              </li>
              <li>
                <span style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", color: "#9ca3af" }}>
                  <MapPin size={14} style={{ opacity: 0.4, flexShrink: 0, marginTop: "0.2rem" }} />
                  <span>Pune, Maharashtra, India</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {year} Synergy Crop Solutions. All rights reserved.</span>
          <span style={{ opacity: 0.6 }}>Residue-Free Agriculture</span>
        </div>
      </div>
    </footer>
  );
}