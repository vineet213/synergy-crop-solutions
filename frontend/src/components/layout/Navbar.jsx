import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Leaf } from "lucide-react";
import LanguageSwitcher from "../common/LanguageSwitcher.jsx";

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("links.home") },
    { to: "/products", label: t("links.products") },
    { to: "/categories", label: t("links.categories") },
    { to: "/crops", label: t("links.cropDiscovery") },
    { to: "/diseases", label: t("links.diseaseDiscovery") },
    { to: "/distributors", label: t("links.locator") },
    { to: "/blog", label: t("links.blog") },
    { to: "/contact", label: t("links.contact") },
  ];

  return (
    <header className="site-header">
      <div className="nav-inner page-container">
        <NavLink to="/" className="brand">
          <Leaf className="brand-icon" />
          <span>{t("brand")}</span>
        </NavLink>

        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`site-nav-links ${open ? "active" : ""}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="nav-link nav-cta"
            onClick={() => setOpen(false)}
          >
            {t("cta")}
          </NavLink>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
