"use client";
import { BookOpen, DollarSign, MessageSquare, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCourses, mockMessages } from "@/lib/mock-data";

/**
 * StatsCards component - displays key metrics in card format
 * Shows total courses, active students, earnings, and unread messages
 * Uses responsive grid layout that adapts from 1 column on mobile to 4 columns on large screens
 */
export function StatsCards() {
  // Calculate total students across all courses
  const totalStudents = mockCourses.reduce(
    (sum, course) => sum + course.students,
    0
  );

  // Count published courses
  const publishedCourses = mockCourses.filter(
    (course) => course.status === "Published"
  ).length;

  // Calculate total earnings across all courses
  const totalEarnings = mockCourses.reduce(
    (sum, course) => sum + course.earnings,
    0
  );

  // Define stat cards configuration
  const stats = [
    {
      title: "Total Courses",
      value: mockCourses.length,
      subtitle: `${publishedCourses} published`,
      icon: BookOpen,
    },
    {
      title: "Active Students",
      value: totalStudents,
      subtitle: "+12% from last month",
      icon: Users,
    },
    {
      title: "Total Earnings",
      value: `$${totalEarnings.toLocaleString()}`,
      subtitle: "+8% from last month",
      icon: DollarSign,
    },
    {
      title: "Unread Messages",
      value: mockMessages.filter((m) => m.unread).length,
      subtitle: "Requires attention",
      icon: MessageSquare,
    },
  ];

  return (
    // Responsive grid: 2 columns on mobile, 2 on tablet, 4 on large screens
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-4 md:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium truncate pr-2">
                {stat.title}
              </CardTitle>
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-4 sm:pt-0 md:p-6 md:pt-0">
              <div className="text-lg sm:text-xl md:text-2xl font-bold">{stat.value}</div>
              <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{stat.subtitle}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
