import { Link } from "react-router-dom";

const publicLinks = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/products", label: "Products" },
  { to: "/categories", label: "Categories" },
  { to: "/crops", label: "Crops" },
  { to: "/diseases", label: "Diseases" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="site-nav">
        <Link to="/" className="brand">
          Synergy Crop Solutions
        </Link>
        <div className="nav-links">
          {publicLinks.map((link) => (
            <Link key={link.to} to={link.to} className="nav-link">
              {link.label}
            </Link>
          ))}
          <Link to="/admin" className="nav-link">
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}
