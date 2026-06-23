import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer className="site-footer">
      <div className="page-container footer-grid">
        <div>
          <p className="footer-brand">Synergy Crop Solutions</p>
          <p>{t("footer.tagline")}</p>
          <p className="footer-vision">{t("about.visionStatement")}</p>
        </div>
        <div>
          <p className="footer-heading">{t("footer.contact")}</p>
          <p><a href="mailto:contact@synergycrops.com" style={{ color: "var(--brand)", textDecoration: "none" }}>contact@synergycrops.com</a></p>
          <p>Phone Number – To Be Updated</p>
        </div>
        <div>
          <p className="footer-heading">{t("footer.location")}</p>
          <p>Office Address – To Be Updated</p>
        </div>
      </div>
    </footer>
  );
}
