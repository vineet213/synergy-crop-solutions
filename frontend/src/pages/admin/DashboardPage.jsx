import { useEffect, useState } from "react";
import { Package, Truck, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../services/api.js";

export default function DashboardPage() {
const { t } = useTranslation("admin");
const { user } = useAuth();
const [stats, setStats] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
let mounted = true;

async function load() {
  try {
    setLoading(true);
    const res = await api.get("/admin/stats");

    if (!mounted) return;

    setStats(res.data.data);
  } catch (err) {
  } finally {
    if (mounted) setLoading(false);
  }
}

load();

return () => {
  mounted = false;
};


}, []);

const statCards = stats
? [
{
label: t("dashboard.totalProducts"),
value: String(stats.products),
icon: Package,
},
{
label: t("dashboard.totalDistributors"),
value: String(stats.distributors),
icon: Truck,
},
{
label: t("dashboard.totalLeads"),
value: String(stats.leads),
icon: MessageSquare,
},
]
: [];

return ( <main className="page-container section-block"> <div className="section-header"> <h1 className="page-title">
{t("dashboard.welcome", { name: user?.name || t("dashboard.fallbackName") })} </h1>

    <p className="page-description">
      {t("dashboard.overview")}
    </p>
  </div>

  <div
    className="card-grid"
    style={{ marginBottom: "2rem" }}
  >
    {loading
      ? [1, 2, 3].map((i) => (
          <div key={i} className="card-shell">
            <div className="skeleton-block skeleton-title" />
            <div
              className="skeleton-block skeleton-line short"
              style={{ marginTop: "1rem" }}
            />
          </div>
        ))
      : statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="card-shell"
            >
              <div className="card-header">
                <span className="card-icon">
                  <Icon size={24} />
                </span>

                <div>
                  <p
                    className="page-description"
                    style={{ margin: 0 }}
                  >
                    {stat.label}
                  </p>

                  <h2
                    style={{
                      margin: "0.25rem 0 0",
                      fontSize: "2rem",
                      fontWeight: "700",
                    }}
                  >
                    {stat.value}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
  </div>

  <div className="card-shell">
    <h2
      className="page-title"
      style={{
        fontSize: "1.4rem",
        marginBottom: "1rem",
      }}
    >
      {t("dashboard.recentLeads")}
    </h2>

    {loading ? (
      <div className="loading-placeholder">
        <div className="skeleton-block skeleton-line" />
        <div className="skeleton-block skeleton-line" />
        <div className="skeleton-block skeleton-line short" />
      </div>
    ) : !stats?.recentLeads?.length ? (
      <div className="empty-state">
        <h2>{t("dashboard.noLeadsTitle")}</h2>
        <p>
          {t("dashboard.noLeadsDescription")}
        </p>
      </div>
    ) : (
      <div>
        {stats.recentLeads.map((lead) => (
          <div
            key={lead._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem 0",
              borderBottom:
                "1px solid var(--border)",
            }}
          >
            <div>
              <strong>{lead.name}</strong>

              <p
                className="page-description"
                style={{ marginTop: "0.25rem" }}
              >
                {lead.email} &middot;{" "}
                {lead.company || "—"}
              </p>
            </div>

            <span
              className={`badge badge-${
                lead.status === "new"
                  ? "brand"
                  : "soft"
              }`}
            >
              {lead.status}
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
</main>

);
}
