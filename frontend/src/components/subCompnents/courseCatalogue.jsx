import {
  Palette,
  TrendingUp,
  Brain,
  Database,
  BarChart3,
  Code,
  Heart,
  Megaphone,
  GraduationCap,
} from "lucide-react";

export default function CourseCatalogue() {
  const courses = [
    { icon: Palette, name: "Art & Design", count: "05" },
    { icon: TrendingUp, name: "Business & Finance", count: "03" },
    { icon: Brain, name: "Computer Science", count: "06" },
    { icon: Database, name: "Data Base", count: "03" },
    { icon: BarChart3, name: "Data Science", count: "05" },
    { icon: Code, name: "Development", count: "04" },
    { icon: Heart, name: "Health & Fitness", count: "05" },
    { icon: Megaphone, name: "Marketing", count: "03" },
    { icon: GraduationCap, name: "Online Courses", count: "04" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Explore
          <br />
          Our Popular Courses
        </h2>
        <p className="text-gray-600 text-lg">
          You don't have to struggle alone, you've got our assistance and help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => {
          const IconComponent = course.icon;
          return (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-gray-700" />
                </div>
                <span className="text-gray-800 font-medium text-lg">
                  {course.name}
                </span>
              </div>
              <span className="text-2xl font-bold text-gray-400">
                {course.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
