export default function Badge({ children, variant = "brand" }) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}
