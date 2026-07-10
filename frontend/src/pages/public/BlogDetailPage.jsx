import { useTranslation } from "react-i18next";

export default function BlogDetailPage() {
  const { t } = useTranslation("common");
  return (
    <main className="page-container">
      <h1 className="page-title">{t("page.blogDetailPage.title")}</h1>
      <p className="page-description">{t("page.blogDetailPage.placeholder")}</p>
    </main>
  );
}
