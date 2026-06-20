import { useTranslation } from "react-i18next";
import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import Badge from "../../components/ui/Badge.jsx";

const categories = [
  { title: "Grains", description: "High-yield varieties optimized for diverse climates." },
  { title: "Vegetables", description: "Fresh produce solutions for quality and reliability." },
  { title: "Specialty Crops", description: "Tailored programs for niche and export crops." },
];

export default function CategoriesPage() {
  const { t } = useTranslation("common");
  return (
    <div className="page-container">
      <SectionContainer title={t("page.categories.title")} subtitle={t("page.categories.subtitle")}>
        <div className="card-grid">
          {categories.map((item) => (
            <Card key={item.title} title={item.title} description={item.description}>
              <Badge variant="soft">{t("page.categories.featured")}</Badge>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
