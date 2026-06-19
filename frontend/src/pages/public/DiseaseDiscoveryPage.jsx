import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import diseaseService from "../../services/diseaseService.js";
import useSEO from "../../hooks/useSEO.js";

export default function DiseaseDiscoveryPage() {
  useSEO({ title: "Disease Discovery", description: "Browse our disease catalog to identify crop problems and discover relevant treatments and agricultural products.", canonical: "/diseases" });
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    diseaseService.getPublicDiseases()
      .then(setDiseases)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <SectionContainer title="Disease Discovery" subtitle="Prevent crop loss before it spreads">
        <p className="card-description">
          Browse our disease catalog to identify problems and discover relevant treatments and products.
        </p>
        {loading ? (
          <p>Loading&hellip;</p>
        ) : diseases.length === 0 ? (
          <p>No diseases available yet.</p>
        ) : (
          <div className="discover-grid" style={{ marginTop: "1.5rem" }}>
            {diseases.map((disease) => (
              <Link key={disease._id} to={`/diseases/${disease._id}`} className="no-underline">
                <Card
                  title={disease.name}
                  description={disease.description || "Learn more about this disease and its treatments."}
                />
              </Link>
            ))}
          </div>
        )}
      </SectionContainer>
    </div>
  );
}
