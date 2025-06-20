"use client";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export function MessagesCard() {
  const mockMessages = [
    {
      id: 1,
      student: "Alice Johnson",
      course: "React Fundamentals",
      message: "Could you explain the useEffect hook in more detail?",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      student: "Bob Smith",
      course: "Advanced JavaScript",
      message: "The assignment submission deadline?",
      time: "5 hours ago",
      unread: true,
    },
    {
      id: 3,
      student: "Carol Davis",
      course: "TypeScript Mastery",
      message: "Thank you for the detailed explanation!",
      time: "1 day ago",
      unread: false,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Messages</CardTitle>
        <CardDescription>Latest questions from your students</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockMessages.slice(0, 3).map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg border ${
                message.unread
                  ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                  : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-sm">{message.student}</div>
                <div className="text-xs text-muted-foreground">
                  {message.time}
                </div>
              </div>
              <div className="text-xs text-muted-foreground mb-1">
                {message.course}
              </div>
              <div className="text-sm">{message.message}</div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          <Mail className="mr-2 h-4 w-4" />
          View All Messages
        </Button>
      </CardContent>
    </Card>
  );
}
