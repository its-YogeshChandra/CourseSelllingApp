"use client";
import { StatsCards } from "./stats-cards";
import { CoursesTable } from "./course-table.jsx";
import { EarningsCard } from "./earnings-card.jsx";
import { MessagesCard } from "./message-card.jsx";

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <StatsCards />
      <CoursesTable />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EarningsCard />
        <MessagesCard />
      </div>
    </div>
  );
}
