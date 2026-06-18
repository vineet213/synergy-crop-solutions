import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import Button from "../ui/Button.jsx";

export default function ProductFilter({
  searchQuery,
  onSearch,
  categories,
  selectedCategory,
  onSelectCategory,
  onClear,
}) {
  const { t } = useTranslation("products");

  return (
    <div className="product-filter">
      <div className="product-search">
        <Search size={18} />
        <input
          value={searchQuery}
          onChange={(event) => onSearch(event.target.value)}
          placeholder={t("searchPlaceholder")}
          className="search-input"
          aria-label={t("searchAria")}
        />
      </div>
      <div className="product-category-row">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={
              category === selectedCategory
                ? "filter-pill active"
                : "filter-pill"
            }
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
        <Button variant="secondary" className="filter-clear" onClick={onClear}>
          {t("clear")}
        </Button>
      </div>
    </div>
  );
}
