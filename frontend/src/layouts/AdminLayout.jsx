import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, Package, Users, Truck, MessageSquare, Star, Award, Sprout, Bug } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const sidebarLinks = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Crops", href: "/admin/crops", icon: Sprout },
    { label: "Diseases", href: "/admin/diseases", icon: Bug },
    { label: "Certifications", href: "/admin/certifications", icon: Award },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Distributors", href: "/admin/distributors", icon: Truck },
    { label: "Testimonials", href: "/admin/testimonials", icon: Star },
    { label: "Leads", href: "/admin/leads", icon: MessageSquare },
    { label: "Users", href: "/admin/users", icon: Users },
  ];

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        {/* Logo */}
        <div className="admin-sidebar-logo">
          <h1 className={`admin-sidebar-title ${!sidebarOpen && "hidden"}`}>
            Agri Platform
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="admin-sidebar-toggle"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="admin-nav">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                to={link.href}
                className="admin-nav-link"
              >
                <Icon size={20} />
                <span className={`admin-nav-label ${!sidebarOpen && "hidden"}`}>
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-header-inner">
            <h2 className="admin-header-title">Admin Dashboard</h2>
            <div className="admin-header-right">
              {user && (
                <div className="admin-user-info">
                  <p className="admin-user-name">{user.name}</p>
                  <p className="admin-user-email">{user.email}</p>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="admin-logout-btn"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
