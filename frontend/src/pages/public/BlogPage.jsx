import { useTranslation } from "react-i18next";
import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import useSEO from "../../hooks/useSEO.js";

export default function BlogPage() {
  const { t } = useTranslation("common");
  useSEO({ title: t("page.blog.title"), description: t("page.blog.subtitle"), canonical: "/blog" });
  const entries = t("page.blogPage.entries", { returnObjects: true }) || [];
  return (
    <div className="page-container">
      <SectionContainer title={t("page.blog.title")} subtitle={t("page.blog.subtitle")}>
        <div className="card-grid">
          {entries.map((item) => (
            <Card key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
