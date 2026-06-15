import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import Badge from "../../components/ui/Badge.jsx";

const categories = [
  { title: "Grains", description: "High-yield varieties optimized for diverse climates." },
  { title: "Vegetables", description: "Fresh produce solutions for quality and reliability." },
  { title: "Specialty Crops", description: "Tailored programs for niche and export crops." },
];

export default function CategoriesPage() {
  return (
    <div className="page-container">
      <SectionContainer title="Categories" subtitle="Crop categories we support">
        <div className="card-grid">
          {categories.map((item) => (
            <Card key={item.title} title={item.title} description={item.description}>
              <Badge variant="soft">Featured</Badge>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
