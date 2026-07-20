import { textValue } from "../../utils/productHelpers.js";

export default function Card({ title, description, icon, children, className = "" }) {
  const resolvedTitle = textValue(title);
  const resolvedDesc = textValue(description);

  return (
    <article className={`card-shell ${className}`.trim()}>
      <div className="card-header">
        {icon && <span className="card-icon">{icon}</span>}
        {resolvedTitle && <h3 className="card-title">{resolvedTitle}</h3>}
      </div>
      {resolvedDesc && <p className="card-description">{resolvedDesc}</p>}
      {children}
    </article>
  );
}
