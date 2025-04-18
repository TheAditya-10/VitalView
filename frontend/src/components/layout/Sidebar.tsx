
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Heart, 
  Calculator, 
  Search, 
  UserRound, 
  Menu, 
  X, 
  Settings,
  Flame 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type NavItem = {
  name: string;
  path: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Live Heart Detection", path: "/live-ecg", icon: Heart },
  { name: "BMI Calculator", path: "/bmi-calculator", icon: Calculator },
  { name: "Calorie Calculator", path: "/calorie-calculator", icon: Flame },
  { name: "Symptom Checker", path: "/symptom-checker", icon: Search },
  { name: "Profile", path: "/profile", icon: UserRound },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed z-50 top-4 left-4 p-2 rounded-full bg-health-primary text-white lg:hidden"
        aria-label="Toggle Menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 lg:hidden" 
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-white border-r border-health-border transition-all duration-300 shadow-md flex flex-col",
          collapsed ? "w-20" : "w-64",
          isMobile && "lg:relative",
          isMobile ? (mobileOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0",
          "lg:translate-x-0"
        )}
      >
        {/* Logo and collapse button */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-health-border">
          <div className="flex items-center">
            <Heart className="text-health-primary" />
            {!collapsed && (
              <span className="ml-2 font-semibold text-lg text-health-primary">VitalView</span>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md text-gray-500 hover:bg-gray-100 hidden lg:block"
            aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-grow py-6 overflow-y-auto">
          <ul className="space-y-2 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center py-3 px-4 rounded-lg text-gray-600 hover:bg-health-secondary hover:text-health-primary transition-colors",
                    "hover:shadow-soft",
                    window.location.pathname === item.path && "bg-health-secondary text-health-primary font-medium"
                  )}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-health-border">
          <Link
            to="/settings"
            className="flex items-center py-2 px-4 rounded-lg text-gray-600 hover:bg-health-secondary hover:text-health-primary transition-colors"
          >
            <Settings size={20} className="flex-shrink-0" />
            {!collapsed && <span className="ml-3">Settings</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
