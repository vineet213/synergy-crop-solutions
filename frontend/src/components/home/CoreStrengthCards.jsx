import { Sprout, ShieldCheck, Sparkles, Droplets, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ICONS = {
  "Bio Fertilizers": <Sprout size={24} />,
  "Bio Pesticides": <ShieldCheck size={24} />,
  "Consortia Products": <Sparkles size={24} />,
  "Liquid Nutrition": <Droplets size={24} />,
  "Organic Inputs": <Leaf size={24} />,
};

const slugs = ["Bio Fertilizers", "Bio Pesticides", "Consortia Products", "Liquid Nutrition", "Organic Inputs"];

export default function CoreStrengthCards() {
  const { t } = useTranslation("home");
  const navigate = useNavigate();
  const cards = t("categories.cards", { returnObjects: true });

  return (
    <div className="core-strength-grid">
      {slugs.map((slug, i) => {
        const card = Array.isArray(cards) && cards[i] ? cards[i] : { title: slug, description: "" };
        return (
          <button
            key={slug}
            className="core-strength-card"
            onClick={() => navigate(`/products?category=${encodeURIComponent(slug)}`)}
            aria-label={`View ${card.title} products`}
          >
            <span className="core-strength-icon">{ICONS[slug]}</span>
            <h3 className="core-strength-title">{card.title}</h3>
            <p className="core-strength-desc">{card.description}</p>
          </button>
        );
      })}
    </div>
  );
}
