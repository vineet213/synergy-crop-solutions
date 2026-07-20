import { textValue } from "../../utils/productHelpers.js";

export default function SectionContainer({ title, subtitle, children, className = "" }) {
  const resolvedTitle = textValue(title);
  const resolvedSubtitle = textValue(subtitle);

  return (
    <section className={`section-block ${className}`.trim()}>
      <div className="section-header">
        {resolvedSubtitle && <p className="section-subtitle">{resolvedSubtitle}</p>}
        {resolvedTitle && <h2 className="section-title">{resolvedTitle}</h2>}
      </div>
      <div className="section-content">{children}</div>
    </section>
  );
}
