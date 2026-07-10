import { useTranslation } from "react-i18next";

export default function DiseaseProductsPage() {
  const { t } = useTranslation("common");
  return (
    <main className="page-container">
      <h1 className="page-title">{t("page.placeholders.diseaseProducts.title")}</h1>
      <p className="page-description">{t("page.placeholders.diseaseProducts.placeholder")}</p>
    </main>
  );
}
