export default function SectionContainer({ title, subtitle, children, className = "" }) {
  return (
    <section className={`section-block ${className}`.trim()}>
      <div className="section-header">
        <p className="section-subtitle">{subtitle}</p>
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="section-content">{children}</div>
    </section>
  );
}
