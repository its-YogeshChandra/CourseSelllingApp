"use client";

import { useState } from "react";
import { Search, Grid, List, ChevronDown } from "lucide-react";

export default function CourseFilteringNavbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isInstructorDropdownOpen, setIsInstructorDropdownOpen] =
    useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement your search logic here
  };

  return (
    <div className="w-full px-4 py-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="border rounded-md px-4 py-2 bg-white">
          <span className="text-sm font-medium">All Courses: 48</span>
        </div>

        <div className="w-full md:w-auto flex-1 md:max-w-md">
          <form onSubmit={handleSearch} className="flex w-full">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-r-md"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <button
              className="flex items-center justify-between w-full md:w-auto gap-2 px-4 py-2 border rounded-md bg-white"
              onClick={() =>
                setIsInstructorDropdownOpen(!isInstructorDropdownOpen)
              }
            >
              <span>All Instructors</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {isInstructorDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                <ul className="py-1">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    All Instructors
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    John Doe
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Jane Smith
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Robert Johnson
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* <div className="flex border rounded-md overflow-hidden">
            <button
              className={`p-2 ${
                viewMode === "grid" ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              className={`p-2 ${
                viewMode === "list" ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <List className="h-5 w-5" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
