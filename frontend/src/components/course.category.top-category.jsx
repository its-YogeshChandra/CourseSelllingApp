import {
  BookOpen,
  Code,
  Database,
  LineChart,
  ChevronRight,
} from "lucide-react";


export default function TopCategoriesSection() {
  const categories = [
    {
      icon: <Code className="h-8 w-8 text-pink-500" />,
      name: "Web Development",
      courses: 42,
    },
    {
      icon: <Database className="h-8 w-8 text-blue-500" />,
      name: "Data Science",
      courses: 36,
    },
    {
      icon: <LineChart className="h-8 w-8 text-purple-500" />,
      name: "Business Analytics",
      courses: 28,
    },
    {
      icon: <BookOpen className="h-8 w-8 text-green-500" />,
      name: "UX Design",
      courses: 25,
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 ml-2">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-700 mb-3">
              Featured Course
            </span>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-3">
              Top Category
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore our most popular course categories and find the perfect
              learning path for your career goals.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center mt-4 md:mt-0 px-4 py-2 text-sm font-medium text-pink-700 hover:text-pink-800 transition-colors"
          >
            All Categories
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
              <p className="text-sm text-muted-foreground">
                {category.courses} Courses
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
