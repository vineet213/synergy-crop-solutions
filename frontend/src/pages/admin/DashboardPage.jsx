import { Package, Truck, MessageSquare } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      label: "Total Products",
      value: "1,234",
      icon: Package,
      color: "bg-blue-500",
    },
    {
      label: "Total Distributors",
      value: "56",
      icon: Truck,
      color: "bg-green-500",
    },
    {
      label: "Total Leads",
      value: "892",
      icon: MessageSquare,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name}!</h1>
        <p className="text-gray-600 mt-2">Here's an overview of your platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-lg`}>
                  <Icon className="text-white" size={32} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="text-gray-600 text-center py-8">
          <p>Dashboard features coming soon</p>
        </div>
      </div>
    </div>
  );
}
