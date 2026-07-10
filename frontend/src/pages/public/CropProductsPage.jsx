import { useTranslation } from "react-i18next";

export default function CropProductsPage() {
  const { t } = useTranslation("common");
  return (
    <main className="page-container">
      <h1 className="page-title">{t("page.placeholders.cropProducts.title")}</h1>
      <p className="page-description">{t("page.placeholders.cropProducts.placeholder")}</p>
    </main>
  );
}
