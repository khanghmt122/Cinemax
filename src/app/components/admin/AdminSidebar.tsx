import { Link, useLocation } from "react-router";
import { Film, LayoutDashboard, Calendar, MapPin, CreditCard, BarChart3, LogOut } from "lucide-react";
import { Button } from "../ui/button";

export function AdminSidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Tổng quan" },
    { path: "/admin/movies", icon: Film, label: "Quản lý phim" },
    { path: "/admin/schedules", icon: Calendar, label: "Lịch chiếu" },
    { path: "/admin/theaters", icon: MapPin, label: "Rạp chiếu" },
    { path: "/admin/transactions", icon: CreditCard, label: "Giao dịch" },
    { path: "/admin/statistics", icon: BarChart3, label: "Thống kê" },
  ];
  
  return (
    <aside className="w-64 min-h-screen bg-black border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link to="/admin" className="flex items-center gap-2">
          <Film className="h-8 w-8 text-red-600" />
          <div>
            <p className="text-xl font-bold text-white">CinemaMax</p>
            <p className="text-xs text-white/50">Admin Panel</p>
          </div>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? "bg-red-600 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <Link to="/">
          <Button
            variant="ghost"
            className="w-full justify-start text-white/70 hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Về trang chủ
          </Button>
        </Link>
      </div>
    </aside>
  );
}
