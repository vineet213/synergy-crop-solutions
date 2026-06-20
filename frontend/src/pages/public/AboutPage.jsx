import { useTranslation } from "react-i18next";
import useSEO from "../../hooks/useSEO.js";
import SectionContainer from "../../components/ui/SectionContainer.jsx";

export default function AboutPage() {
  useSEO({ title: "About Us", canonical: "/about" });
  const { t } = useTranslation(["home", "common"]);

  return (
    <div>
      <SectionContainer title={t("home:vision.title")}>
        <div className="card-shell">
          <p>{t("home:vision.statement")}</p>
        </div>
      </SectionContainer>

      <SectionContainer title={t("home:mission.title")}>
        <div className="card-shell">
          <p>{t("home:mission.statement")}</p>
        </div>
      </SectionContainer>

      <SectionContainer title="Our Commitment">
        <div className="card-shell">
          <p>{t("common:about.visionStatement")}</p>
        </div>
      </SectionContainer>
    </div>
  );
}
