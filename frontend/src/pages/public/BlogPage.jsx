import { useTranslation } from "react-i18next";
import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import useSEO from "../../hooks/useSEO.js";

const entries = [
  { title: "Harvest planning for a resilient season", description: "Practical strategies to reduce risk and improve outcomes." },
  { title: "Sustainable field protection methods", description: "How integrated approaches preserve yield and soil health." },
  { title: "Building distribution partnerships", description: "Grow your supply network with trusted logistics partners." },
];

export default function BlogPage() {
  const { t } = useTranslation("common");
  useSEO({ title: t("page.blog.title"), description: t("page.blog.subtitle"), canonical: "/blog" });
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
