import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Leaf, MapPin, Sparkles } from "lucide-react";

const publicLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/categories", label: "Categories" },
  { to: "/crops", label: "Crop Discovery" },
  { to: "/diseases", label: "Disease Discovery" },
  { to: "/distributors", label: "Locator" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="nav-inner page-container">
        <NavLink to="/" className="brand">
          <Leaf className="brand-icon" />
          <span>Synergy Crop Solutions</span>
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
          {publicLinks.map((link) => (
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
            Get in Touch
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
