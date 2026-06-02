"use client";
import { StatsCards } from "./stats-cards";
import { CoursesTable } from "./course-table.jsx";
import { EarningsCard } from "./earnings-card.jsx";
import { MessagesCard } from "./message-card.jsx";
import { MobileTabBar } from "./sidebar";

export function DashboardContent() {
  return (
    <>
      <div className="space-y-4 sm:space-y-6 pb-16 lg:pb-0">
        <StatsCards />
        <CoursesTable />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <EarningsCard />
          <MessagesCard />
        </div>
      </div>
    </>
  );
}
