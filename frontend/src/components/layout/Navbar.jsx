import { useState, useEffect, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "../common/LanguageSwitcher.jsx";

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    close();
  }, [location.pathname, close]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape" && open) close();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, close]);

  const links = [
    { to: "/", label: t("links.home") },
    { to: "/products", label: t("links.products") },
    { to: "/about", label: t("links.about") },
    { to: "/categories", label: t("links.categories") },
    { to: "/blog", label: t("links.blog") },
  ];

  return (
    <header className="site-header">
      <div className="nav-inner page-container">
        <NavLink to="/" className="brand">
          <img
            src="/client-assets/logo/official-logo.jpeg"
            alt="Synergy Crop Solutions"
            className="brand-logo"
          />
          <span className="brand-text">{t("brand")}</span>
        </NavLink>

        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-panel"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="site-nav-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/contact" className="nav-link nav-cta">
            {t("cta")}
          </NavLink>
          <LanguageSwitcher />
        </nav>
      </div>

      <div
        className={`mobile-overlay ${open ? "open" : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      <div
        id="mobile-panel"
        className={`mobile-panel ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="mobile-panel-header">
          <NavLink to="/" className="brand" onClick={close} tabIndex={open ? 0 : -1}>
            <img
              src="/client-assets/logo/official-logo.jpeg"
              alt="Synergy Crop Solutions"
              className="brand-logo"
            />
            <span className="brand-text">{t("brand")}</span>
          </NavLink>
          <button
            type="button"
            className="mobile-panel-close"
            onClick={close}
            aria-label="Close navigation"
            tabIndex={open ? 0 : -1}
          >
            <X size={24} />
          </button>
        </div>

        <div className="mobile-nav-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "mobile-nav-link active" : "mobile-nav-link"
              }
              onClick={close}
              tabIndex={open ? 0 : -1}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="mobile-nav-link mobile-nav-cta"
            onClick={close}
            tabIndex={open ? 0 : -1}
          >
            {t("cta")}
          </NavLink>
        </div>

        <div className="mobile-language-wrap">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
