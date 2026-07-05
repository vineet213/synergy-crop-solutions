import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "../../components/leads/ContactForm.jsx";
import useSEO from "../../hooks/useSEO.js";

export default function ContactPage() {
  const { t } = useTranslation("common");
  useSEO({ title: t("page.contact.title"), description: t("page.contact.intro"), canonical: "/contact" });

  return (
    <div>
      <section className="prem">
        <div className="prem-container">
          <header className="prem-header">
            <span className="prem-header__label">{t("page.contact.subtitle")}</span>
            <h1 className="prem-header__title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>{t("page.contact.title")}</h1>
            <p className="prem-header__text">{t("page.contact.intro")}</p>
          </header>

          <div className="contact-grid">
            <div className="contact-card">
              <ContactForm />
            </div>

            <div className="contact-card" style={{ alignSelf: "start" }}>
              <h3>{t("page.contact.otherWays")}</h3>
              <div>
                <div className="contact-detail">
                  <span className="contact-detail-icon"><Mail size={16} /></span>
                  <div className="contact-detail-body">
                    <span className="contact-detail-label">{t("page.contact.email")}</span>
                    <span className="contact-detail-value">
                      <a href="mailto:contact@synergycrops.com">contact@synergycrops.com</a>
                    </span>
                  </div>
                </div>
                <div className="contact-detail">
                  <span className="contact-detail-icon"><Phone size={16} /></span>
                  <div className="contact-detail-body">
                    <span className="contact-detail-label">{t("page.contact.phone")}</span>
                    <span className="contact-detail-value">Available on request</span>
                  </div>
                </div>
                <div className="contact-detail">
                  <span className="contact-detail-icon"><MapPin size={16} /></span>
                  <div className="contact-detail-body">
                    <span className="contact-detail-label">{t("page.contact.office")}</span>
                    <span className="contact-detail-value">Available on request</span>
                  </div>
                </div>
                <div className="contact-detail">
                  <span className="contact-detail-icon"><Clock size={16} /></span>
                  <div className="contact-detail-body">
                    <span className="contact-detail-label">Business Hours</span>
                    <span className="contact-detail-value">Mon – Sat, 9:00 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}