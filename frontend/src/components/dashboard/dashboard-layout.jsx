import * as React from "react";
import { Header } from "./header";
import { Sidebar, MobileTabBar } from "./sidebar";
import { DashboardContent } from "./dashboard-content";
import { UploadNewCourse } from "./upload-course";
import { CoursesTable } from "./course-table";

export function DashboardLayout() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("dashboard");

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "courses":
        return <CoursesTable />;
      case "upload":
        return <UploadNewCourse />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                This section is under development.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="flex min-h-screen">
        {/* Desktop sidebar — hidden below lg */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main content area — full width on mobile, offset on desktop */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
          <Header
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 pb-20 lg:pb-8 overflow-x-hidden">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Mobile bottom tab bar — visible below lg */}
      <MobileTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
