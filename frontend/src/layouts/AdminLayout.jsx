import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, Package, Truck, MessageSquare, Star, Award, Bug, Users, Settings, Globe } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useWebsiteSettings } from "../context/WebsiteSettingsContext.jsx";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const { settings } = useWebsiteSettings();
  const navigate = useNavigate();
  const { t } = useTranslation("admin");

  const handleLogout = () => {
    logout();
    toast.success(t("sidebar.loggedOut"));
    navigate("/admin/login");
  };

  const sidebarLinks = [
    { label: t("sidebar.dashboard"), href: "/admin/dashboard", icon: LayoutDashboard },
    { label: t("sidebar.crops"), href: "/admin/crops", icon: Award },
    { label: t("sidebar.diseases"), href: "/admin/diseases", icon: Bug },
    { label: t("sidebar.certifications"), href: "/admin/certifications", icon: Award },
    { label: t("sidebar.products"), href: "/admin/products", icon: Package },
    { label: t("sidebar.distributors"), href: "/admin/distributors", icon: Truck },
    { label: t("sidebar.testimonials"), href: "/admin/testimonials", icon: Star },
    { label: t("sidebar.leads"), href: "/admin/leads", icon: MessageSquare },
    { label: t("sidebar.websiteSettings"), href: "/admin/website-settings", icon: Globe },
    ...(user?.role === "superadmin" ? [{ label: t("sidebar.admins"), href: "/admin/admins", icon: Users }] : []),
    { label: t("sidebar.settings"), href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        {/* Logo */}
        <div className="admin-sidebar-logo">
          <img
            src={settings?.assets?.logo ? `/${settings.assets.logo}` : "/client-assets/logo/official-logo.jpeg"}
            alt={settings?.company?.name || "Synergy Crop Solutions"}
            className={`admin-logo-img ${!sidebarOpen && "hidden"}`}
          />
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
            <h2 className="admin-header-title">{t("sidebar.adminDashboard")}</h2>
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
                {t("sidebar.logout")}
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
