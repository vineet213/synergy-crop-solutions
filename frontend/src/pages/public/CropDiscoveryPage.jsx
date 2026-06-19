import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card.jsx";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import cropService from "../../services/cropService.js";
import useSEO from "../../hooks/useSEO.js";

export default function CropDiscoveryPage() {
  useSEO({ title: "Crop Discovery", description: "Browse our crop catalog to find information and discover relevant agricultural products for each crop type.", canonical: "/crops" });
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cropService.getPublicCrops()
      .then(setCrops)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <SectionContainer title="Crop Discovery" subtitle="Responsive crop planning for growers">
        <p className="card-description">
          Browse our crop catalog to find information and discover relevant products for each crop type.
        </p>
        {loading ? (
          <p>Loading&hellip;</p>
        ) : crops.length === 0 ? (
          <p>No crops available yet.</p>
        ) : (
          <div className="discover-grid" style={{ marginTop: "1.5rem" }}>
            {crops.map((crop) => (
              <Link key={crop._id} to={`/crops/${crop._id}`} className="no-underline">
                <Card
                  title={crop.name}
                  description={crop.description || "Learn more about this crop and its products."}
                />
              </Link>
            ))}
          </div>
        )}
      </SectionContainer>
    </div>
  );
}
