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
          <p>hello@synergycrops.com</p>
          <p>+1 (555) 010-2024</p>
        </div>
        <div>
          <p className="footer-heading">{t("footer.location")}</p>
          <p>172 Greenway Ave.</p>
          <p>Fertilion, CA 94016</p>
        </div>
      </div>
    </footer>
  );
}
