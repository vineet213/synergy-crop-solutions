import { useTranslation } from "react-i18next";

export default function StateProductsPage() {
  const { t } = useTranslation("common");
  return (
    <main className="page-container">
      <h1 className="page-title">{t("page.placeholders.stateProducts.title")}</h1>
      <p className="page-description">{t("page.placeholders.stateProducts.placeholder")}</p>
    </main>
  );
}
