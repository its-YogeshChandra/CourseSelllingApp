import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import bigcardBackground from "../../assets/bigcardBackground.jpg";

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
    <div className="min-h-screen w-full overflow-hidden font-inter p-4 mt-4 relative">
      <img
        src={bigcardBackground}
        alt=""
        className="object-cover w-full h-full rounded-2xl z-0"
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-500 w-[70%] h-[60%] z-10 p-3 flex gap-x-3">
        <div className="bg-cyan-300 w-[55%] h-full flex flex-col justify-center gap-y-3">
          <div className="w-[40%] h-12 bg-gray-500"></div>
          <>Unlock Your Potential with Online Courses</h2>
          <p>
            Reach a global audience and start earning today. Our platform makes
            course creation and sales simple and effective.
          </p>
          <div className="w-[60%] h-12 bg-gray-500"></div>
        </div>
        <div className="bg-cyan-300 w-[45%] h-full"></div>
      </div>
    </div>
  );
}
