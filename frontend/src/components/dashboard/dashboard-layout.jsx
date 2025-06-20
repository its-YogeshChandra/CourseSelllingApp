"use client";

import * as React from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { DashboardContent } from "./dashboard-content";
import { UploadNewCourse } from "./upload-course";

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
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="lg:pl-64 flex flex-col flex-1">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
}
