"use client";
import { Toaster } from "@/components/ui/sonner";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export default function InstructorDashboard() {
  return (
    <>
      <DashboardLayout />
      <Toaster />
    </>
  );
}
