"use client"
import { BookOpen, DollarSign, Home, MessageSquare, Settings, Upload } from "lucide-react"


export function Sidebar({ activeTab, setActiveTab }) {
  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "upload", label: "Upload New Course", icon: Upload },
    { id: "earnings", label: "Earnings", icon: DollarSign },
    { id: "messages", label: "Student Messages", icon: MessageSquare },
    { id: "settings", label: "Profile Settings", icon: Settings },
  ]

  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center flex-shrink-0 px-4 py-6">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">EduPlatform</span>
        </div>
        <nav className="flex-1 px-4 pb-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
