import * as React from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DashboardSidebarContent } from "./sidebar";

export function Header({ darkMode, setDarkMode, activeTab, setActiveTab }) {
  // State to control mobile sidebar open/close
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <div className="flex items-center gap-2 min-w-0">
            {/* Mobile menu button - visible only on mobile (< lg) */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden flex-shrink-0"
                  aria-label="Toggle menu"
                >
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                {/* Mobile sidebar content - reuses DashboardSidebarContent */}
                <div className="flex flex-col h-full bg-white dark:bg-gray-800">
                  <DashboardSidebarContent
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onItemClick={() => setMobileMenuOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>

            {/* Page title — truncates on small screens */}
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate">
              Teacher Dashboard
            </h1>
          </div>

          {/* Right side header actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 flex-shrink-0">
            {/* Dark mode toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 h-8 w-8 sm:h-9 sm:w-9"
            >
              {darkMode ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>

            {/* Notifications button with badge */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 sm:h-9 sm:w-9"
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </Button>

            {/* User profile dropdown menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-1 sm:space-x-2 px-1 sm:px-2"
                >
                  <div className="h-7 w-7 sm:h-8 sm:w-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <span className="hidden md:block text-gray-700 dark:text-gray-300 text-sm truncate max-w-[120px]">
                    Dr. Sarah Wilson
                  </span>
                  <ChevronDown className="h-4 w-4 hidden sm:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
