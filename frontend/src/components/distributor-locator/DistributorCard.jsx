import { MapPin, Phone, Mail, Building2 } from "lucide-react";
import Badge from "../ui/Badge.jsx";

export default function DistributorCard({ distributor }) {
  const { name, company, email, phone, address, serviceableStates, certifications, description } = distributor;

  return (
    <article className="card-shell" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div className="card-header">
        <div className="card-icon" style={{ padding: "0.65rem" }}>
          <Building2 size={22} />
        </div>
        <div>
          <h3 className="card-title" style={{ margin: 0 }}>{name}</h3>
          <p style={{ margin: "0.15rem 0 0", fontSize: "0.9rem", color: "var(--brand)" }}>{company}</p>
        </div>
      </div>

      {description && <p className="card-description">{description}</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.95rem" }}>
        {address && (
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)" }}>
            <MapPin size={16} />
            {[address.city, address.state, address.country].filter(Boolean).join(", ")}
          </span>
        )}
        {phone && (
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)" }}>
            <Phone size={16} />
            {phone}
          </span>
        )}
        {email && (
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)" }}>
            <Mail size={16} />
            {email}
          </span>
        )}
      </div>

      {serviceableStates && serviceableStates.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {serviceableStates.map((s) => (
            <Badge key={s} variant="soft">{s}</Badge>
          ))}
        </div>
      )}

      {certifications && certifications.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {certifications.map((c) => (
            <Badge key={c} variant="brand">{c}</Badge>
          ))}
        </div>
      )}
    </article>
  );
}
