import { useTranslation } from "react-i18next";
import DistributorCard from "./DistributorCard.jsx";
import Card from "../ui/Card.jsx";

export default function DistributorList({ distributors, loading }) {
  const { t } = useTranslation("common");

  if (loading) {
    return (
      <div className="discover-grid">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="product-skeleton">
            <div className="skeleton-block skeleton-title" />
            <div className="skeleton-block skeleton-line" />
            <div className="skeleton-block skeleton-line short" />
          </Card>
        ))}
      </div>
    );
  }

  if (!distributors || distributors.length === 0) {
    return (
      <div className="empty-state card-shell">
        <h2>{t("page.distributor.empty")}</h2>
        <p>{t("page.distributor.emptyMessage")}</p>
      </div>
    );
  }

  return (
    <div className="discover-grid">
      {distributors.map((d) => (
        <DistributorCard key={d._id} distributor={d} />
      ))}
    </div>
  );
}
