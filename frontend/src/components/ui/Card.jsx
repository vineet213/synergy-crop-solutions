export default function Card({ title, description, icon, children, className = "" }) {
  return (
    <article className={`card-shell ${className}`.trim()}>
      <div className="card-header">
        {icon && <span className="card-icon">{icon}</span>}
        {title && <h3 className="card-title">{title}</h3>}
      </div>
      {description && <p className="card-description">{description}</p>}
      {children}
    </article>
  );
}
