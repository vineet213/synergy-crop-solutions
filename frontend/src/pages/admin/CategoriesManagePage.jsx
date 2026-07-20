import { useTranslation } from "react-i18next";

export default function CategoriesManagePage() {
  const { t } = useTranslation("admin");
  return (
    <main className="page-container">
      <h1 className="page-title">{t("categories.title")}</h1>
      <p className="page-description">{t("categories.description")}</p>
    </main>
  );
}
