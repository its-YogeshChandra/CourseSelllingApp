import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BigCardHome() {
  const [searchQuery, setSearchQuery] = useState("");

  const trendingTags = ["Canteen", "Education", "Hostel", "Learning"];

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Course Card 1 */}
        <div className="absolute top-20 left-10 w-64 h-40 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl backdrop-blur-sm border border-white/10 transform rotate-12 opacity-60" />

        {/* Course Card 2 */}
        <div className="absolute top-40 right-20 w-48 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl backdrop-blur-sm border border-white/10 transform -rotate-6 opacity-50" />

        {/* Course Card 3 */}
        <div className="absolute bottom-32 left-20 w-56 h-36 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl backdrop-blur-sm border border-white/10 transform rotate-6 opacity-40" />

        {/* Course Card 4 */}
        <div className="absolute bottom-20 right-10 w-52 h-34 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-xl backdrop-blur-sm border border-white/10 transform -rotate-12 opacity-50" />

        {/* Course Card 5 */}
        <div className="absolute top-60 left-1/3 w-44 h-28 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl backdrop-blur-sm border border-white/10 transform rotate-3 opacity-30" />

        {/* Course Card 6 */}
        <div className="absolute bottom-60 right-1/3 w-60 h-38 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-xl backdrop-blur-sm border border-white/10 transform -rotate-8 opacity-35" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-4xl text-center">
          {/* Main Heading */}
          <h1 className="mb-12 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            Experience a learning
            <br />
            platform level
          </h1>

          {/* Search Bar */}
          <div className="mx-auto mb-8 flex max-w-2xl overflow-hidden rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
            <Input
              type="text"
              placeholder="Find Your Courses"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border-0 bg-transparent px-6 py-4 text-lg text-white placeholder:text-white/70 focus:ring-0 focus-visible:ring-0"
            />
            <Button
              onClick={handleSearch}
              className="bg-red-500 px-8 py-4 text-lg font-medium text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>

          {/* Trending Tags */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-lg font-medium text-white/90">
              Trending Tag:
            </span>
            <div className="flex flex-wrap gap-3">
              {trendingTags.map((tag, index) => (
                <button
                  key={index}
                  className="rounded-full border border-white/30 bg-white/10 px-6 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50 hover:scale-105"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-700" />
      </div>
    </div>
  );
}
