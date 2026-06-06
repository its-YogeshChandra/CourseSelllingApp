"use client";

import * as React from "react";
import {
  Download,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { UploadCourseModal } from "./upload-course-modal";
import { courseServices } from "../../services/courseService";

/**
 * CoursesTable component - displays instructor's courses with filtering and pagination
 * Features: status filtering, pagination, course actions (edit, view, delete)
 * Responsive: uses table on desktop, card layout on mobile
 */
export function CoursesTable() {
  // State management for filtering, pagination, and upload modal
  const [courseFilter, setCourseFilter] = React.useState("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch instructor's courses on mount
  React.useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const response = await courseServices.getInstructorCourses();
      if (response?.data) {
        // Map backend shape to table shape
        const mapped = response.data.map((c) => ({
          id: c._id,
          title: c.title || "Untitled",
          thumbnail: c.thumbnail || "",
          status: "Published",
          students: c.students?.length || 0,
          earnings: c.price?.price ? c.price.price * (c.students?.length || 0) : 0,
          category: c.category || "",
        }));
        setCourses(mapped);
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  // Pagination configuration
  const coursesPerPage = 3;

  // Filter courses based on selected status
  const filteredCourses = courses.filter((course) => {
    if (courseFilter === "all") return true;
    return course.status.toLowerCase() === courseFilter.toLowerCase();
  });

  // Calculate pagination values
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  // Course action handlers
  const handleDeleteCourse = (courseId, courseTitle) => {
    toast.success("Course Deleted", {
      description: `"${courseTitle}" has been successfully deleted.`,
    });
  };

  const handleUpdateCourse = (courseTitle) => {
    toast.success("Course Updated", {
      description: `"${courseTitle}" has been successfully updated.`,
    });
  };

  const getBadgeVariant = (status) => {
    switch (status) {
      case "Published":
        return "default";
      case "Draft":
        return "secondary";
      default:
        return "outline";
    }
  };

  // Action menu shared between table and card views
  const CourseActions = ({ course }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleUpdateCourse(course.title)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Eye className="mr-2 h-4 w-4" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download className="mr-2 h-4 w-4" />
          Download
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => handleDeleteCourse(course.id, course.title)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="text-base sm:text-lg">My Courses</CardTitle>
          <div className="flex items-center gap-2">
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-[120px] sm:w-[140px] text-sm">
                <Filter className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => setIsUploadModalOpen(true)}
              size="sm"
              className="text-sm"
            >
              <Plus className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline sm:inline">Upload</span>
              <span className="hidden sm:inline"> Course</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">You haven't created any courses yet.</p>
            <Button onClick={() => setIsUploadModalOpen(true)} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Course
            </Button>
          </div>
        ) : (
        <>
        {/* ---- Mobile Card Layout (below md) ---- */}
        <div className="md:hidden space-y-3">
          {paginatedCourses.map((course) => (
            <div
              key={course.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="h-10 w-14 object-cover rounded flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-medium text-sm truncate">
                      {course.title}
                    </div>
                    <Badge
                      variant={getBadgeVariant(course.status)}
                      className="mt-1 text-xs"
                    >
                      {course.status}
                    </Badge>
                  </div>
                </div>
                <CourseActions course={course} />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground pt-1 border-t border-gray-100 dark:border-gray-700">
                <span>{course.students} students</span>
                <span className="font-medium text-foreground">
                  ${course.earnings}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ---- Desktop Table Layout (md and above) ---- */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="h-12 w-16 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium">{course.title}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(course.status)}>
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{course.students}</TableCell>
                  <TableCell>${course.earnings}</TableCell>
                  <TableCell className="text-right">
                    <CourseActions course={course} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage(Math.max(1, currentPage - 1))
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
        </>
        )}
      </CardContent>
      <UploadCourseModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </Card>
  );
}
