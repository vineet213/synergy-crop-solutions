import { useTranslation } from "react-i18next";

export default function BlogManagePage() {
  const { t } = useTranslation("admin");
  return (
    <main className="page-container">
      <h1 className="page-title">{t("blog.title")}</h1>
      <p className="page-description">{t("blog.description")}</p>
    </main>
  );
}
