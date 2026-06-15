import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";

const entries = [
  { title: "Harvest planning for a resilient season", description: "Practical strategies to reduce risk and improve outcomes." },
  { title: "Sustainable field protection methods", description: "How integrated approaches preserve yield and soil health." },
  { title: "Building distribution partnerships", description: "Grow your supply network with trusted logistics partners." },
];

export default function BlogPage() {
  return (
    <div className="page-container">
      <SectionContainer title="Blog" subtitle="Insights for modern agriculture">
        <div className="card-grid">
          {entries.map((item) => (
            <Card key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
