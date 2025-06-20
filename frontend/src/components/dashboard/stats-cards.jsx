"use client";
import { BookOpen, DollarSign, MessageSquare, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCourses, mockMessages } from "@/lib/mock-data";

export function StatsCards() {
  const totalStudents = mockCourses.reduce(
    (sum, course) => sum + course.students,
    0
  );
  const publishedCourses = mockCourses.filter(
    (course) => course.status === "Published"
  ).length;
  const totalEarnings = mockCourses.reduce(
    (sum, course) => sum + course.earnings,
    0
  );

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
