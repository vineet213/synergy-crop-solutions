import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, Package, Users, Truck, MessageSquare, Star, Award } from "lucide-react";
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
    { label: "Certifications", href: "/admin/certifications", icon: Award },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Distributors", href: "/admin/distributors", icon: Truck },
    { label: "Testimonials", href: "/admin/testimonials", icon: Star },
    { label: "Leads", href: "/admin/leads", icon: MessageSquare },
    { label: "Users", href: "/admin/users", icon: Users },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-green-700 text-white transition-all duration-300 overflow-y-auto`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-green-600">
          <h1 className={`font-bold text-xl ${!sidebarOpen && "hidden"}`}>
            Agri Platform
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-green-600 rounded"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center gap-3 px-4 py-3 hover:bg-green-600 transition"
              >
                <Icon size={20} />
                <span className={!sidebarOpen ? "hidden" : ""}>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h2>
            <div className="flex items-center gap-4">
              {user && (
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
