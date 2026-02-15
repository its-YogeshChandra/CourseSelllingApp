"use client";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * EarningsCard component - displays revenue summary for the instructor
 * Shows total earnings, current month earnings, and pending payouts
 * Includes a download report button for detailed financial records
 */
export function EarningsCard() {
  // Mock course data for earnings calculation
  const mockCourses = [
    {
      id: 1,
      title: "React Fundamentals",
      status: "Published",
      students: 245,
      earnings: 4900,
      thumbnail: "/placeholder.svg?height=60&width=80",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      status: "Published",
      students: 189,
      earnings: 3780,
      thumbnail: "/placeholder.svg?height=60&width=80",
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      status: "Draft",
      students: 0,
      earnings: 0,
      thumbnail: "/placeholder.svg?height=60&width=80",
    },
    {
      id: 4,
      title: "TypeScript Mastery",
      status: "Published",
      students: 156,
      earnings: 3120,
      thumbnail: "/placeholder.svg?height=60&width=80",
    },
    {
      id: 5,
      title: "Database Design",
      status: "Archived",
      students: 89,
      earnings: 1780,
      thumbnail: "/placeholder.svg?height=60&width=80",
    },
  ];

  // Calculate total earnings from all courses
  const totalEarnings = mockCourses.reduce(
    (sum, course) => sum + course.earnings,
    0
  );
  const thisMonthEarnings = 2450;
  const pendingPayouts = 890;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings Summary</CardTitle>
        <CardDescription>Your revenue overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Total earnings display */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Total Earnings</span>
          <span className="text-2xl font-bold">
            ${totalEarnings.toLocaleString()}
          </span>
        </div>

        {/* Current month earnings */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">This Month</span>
          <span className="text-lg font-semibold text-green-600">
            ${thisMonthEarnings.toLocaleString()}
          </span>
        </div>

        {/* Pending payouts */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Pending Payouts</span>
          <span className="text-lg font-semibold text-orange-600">
            ${pendingPayouts.toLocaleString()}
          </span>
        </div>

        {/* Download report action */}
        <Button className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </CardContent>
    </Card>
  );
}
