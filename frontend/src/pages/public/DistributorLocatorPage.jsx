import { useState, useMemo } from "react";
import { Search, MapPin } from "lucide-react";
import SectionContainer from "../../components/ui/SectionContainer.jsx";
import DistributorList from "../../components/distributor-locator/DistributorList.jsx";
import { usePublicDistributors } from "../../hooks/useDistributors.js";
import useSEO from "../../hooks/useSEO.js";

const INDIAN_STATES = [
  "All", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export default function DistributorLocatorPage() {
  useSEO({ title: "Distributor Locator", description: "Find certified agricultural distributors and supply partners near you across India. Connect with trusted partners for timely support and reliable inventory.", canonical: "/distributors" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All");

  const { distributors, loading } = usePublicDistributors(
    selectedState !== "All" ? { state: selectedState } : {}
  );

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return distributors;
    return (distributors || []).filter(
      (d) =>
        (d.name && d.name.toLowerCase().includes(q)) ||
        (d.company && d.company.toLowerCase().includes(q)) ||
        (d.address?.city && d.address.city.toLowerCase().includes(q)) ||
        (d.address?.state && d.address.state.toLowerCase().includes(q))
    );
  }, [searchQuery, distributors]);

  return (
    <main className="page-container" style={{ padding: "2rem 0" }}>
      <SectionContainer
        title="Distributor Locator"
        subtitle="Find trusted partners near you"
      >
        <p className="product-intro-copy">
          Locate certified distributors and manage your supply chain with confidence.
          Our network is built for timely support, reliable inventory, and field-ready delivery.
        </p>

        <div className="product-filter">
          <div className="product-search">
            <Search size={20} />
            <input
              className="search-input"
              placeholder="Search by name, company, city, or state…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="product-category-row">
            <MapPin size={18} style={{ color: "var(--text-muted)" }} />
            {INDIAN_STATES.map((state) => (
              <button
                key={state}
                className={`filter-pill ${selectedState === state ? "active" : ""}`}
                onClick={() => setSelectedState(state)}
              >
                {state}
              </button>
            ))}
            {selectedState !== "All" && (
              <button
                className="filter-pill filter-clear"
                onClick={() => { setSelectedState("All"); setSearchQuery(""); }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <DistributorList distributors={filtered} loading={loading} />
      </SectionContainer>
    </main>
  );
}
