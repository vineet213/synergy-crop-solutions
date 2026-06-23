import { useTranslation } from "react-i18next";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import ContactForm from "../../components/leads/ContactForm.jsx";
import useSEO from "../../hooks/useSEO.js";

export default function ContactPage() {
  const { t } = useTranslation("common");
  useSEO({ title: t("page.contact.title"), description: t("page.contact.intro"), canonical: "/contact" });
  return (
    <main className="page-container" style={{ padding: "2rem 0" }}>
      <SectionContainer title={t("page.contact.title")} subtitle={t("page.contact.subtitle")}>
        <p className="product-intro-copy">
          {t("page.contact.intro")}
        </p>
        <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          <ContactForm />
          <div className="card-shell" style={{ padding: "2rem", alignSelf: "start" }}>
            <h3 style={{ margin: "0 0 1rem" }}>{t("page.contact.otherWays")}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <p style={{ margin: 0 }}><strong>{t("page.contact.email")}</strong>{" "}
                <a href="mailto:contact@synergycrops.com" style={{ color: "var(--brand)" }}>contact@synergycrops.com</a>
              </p>
              <p style={{ margin: 0 }}><strong>{t("page.contact.phone")}</strong> Phone Number – To Be Updated</p>
              <p style={{ margin: 0 }}><strong>{t("page.contact.office")}</strong> Office Address – To Be Updated</p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
