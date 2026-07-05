import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer className="site-footer">
      <div className="page-container" style={{ paddingTop: "4.5rem", paddingBottom: "0" }}>
        <div className="footer-grid">
          <div className="footer-about">
            <p className="footer-brand" style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <Leaf size={20} /> Synergy Crop Solutions
            </p>
            <p>{t("footer.tagline")}</p>
            <p>{t("about.visionStatement")}</p>
          </div>
          <div>
            <p className="footer-heading">Quick Links</p>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="footer-heading">{t("footer.contact")}</p>
            <p><a href="mailto:contact@synergycrops.com" style={{ color: "var(--brand)", textDecoration: "none" }}>contact@synergycrops.com</a></p>
            <p>Phone available on request</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Synergy Crop Solutions. All rights reserved.</span>
          <span style={{ opacity: 0.6 }}>Residue-Free Agriculture</span>
        </div>
      </div>
    </footer>
  );
}