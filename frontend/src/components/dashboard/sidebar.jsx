import {
  BookOpen,
  DollarSign,
  Home,
  MessageSquare,
  Settings,
  Upload,
} from "lucide-react";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router";

// Navigation items configuration for the dashboard sidebar
const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "courses", label: "My Courses", icon: BookOpen },
  { id: "upload", label: "Upload New Course", icon: Upload },
  { id: "earnings", label: "Earnings", icon: DollarSign },
  { id: "messages", label: "Student Messages", icon: MessageSquare },
  { id: "settings", label: "Profile Settings", icon: Settings },
];

// Reusable sidebar content component - used in both desktop and mobile views
export function DashboardSidebarContent({
  activeTab,
  setActiveTab,
  onItemClick,
}) {
  return (
    <>
      {/* Sidebar header with platform branding */}
      <Link to="/" className="flex items-center flex-shrink-0 px-4 py-6 hover:opacity-80 transition-opacity">
        <img src={Logo} alt="Logo" className="w-10 h-10 object-contain" />
        <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
          Learnverge
        </span>
      </Link>

      {/* Navigation menu */}
      <nav className="flex-1 px-4 pb-4 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                // Optional callback for additional actions like closing mobile menu
                onItemClick?.();
              }}
              className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

// Mobile bottom tab bar — visible only below lg breakpoint
export function MobileTabBar({ activeTab, setActiveTab }) {
  // Show a subset of nav items in the bottom bar for quick access
  const mobileItems = sidebarItems.slice(0, 4);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 lg:hidden">
      <div className="flex items-center justify-around h-14">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full px-1 transition-colors ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] mt-0.5 font-medium truncate max-w-[64px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Desktop sidebar - hidden on mobile (< lg breakpoint)
export function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-30">
      <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <DashboardSidebarContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
}
