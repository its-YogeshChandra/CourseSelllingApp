import { useState } from "react";
import { ArrowRightToLine, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import bigcardBackground from "../../assets/bigcardBackground.jpg";
import circleStar from "../../assets/circle-star.png";
import student from "../../assets/student.png";

export default function BigCardHome() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen w-full overflow-hidden font-inter p-4 mt-4 relative ">
      <img
        src={bigcardBackground}
        alt=""
        className="object-cover w-full h-full rounded-2xl z-0"
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2   w-[70%] h-[50%] z-10 p-3 flex gap-x-16">
        <div className=" w-[50%] h-full flex p-2 flex-col justify-center gap-y-2 ">
          <div className="w-[50%] h-14 bg-gray-500 px-2 flex items-center justify-evenly rounded-4xl gap-x-2 hover:text-white transition-transform">
            <Star />
            <p className="text-[18px] ">More Than 10,000+ Students</p>
          </div>
          <p className="text-[65px] font-bold text-black">
            Unlock Your Potential with Online Courses
          </p>
          <p className="text-[20px] text-black">
            Reach a global audience and start earning today. Our platform makes
            course creation and sales simple and effective.
          </p>
          <div className="w-[35%] h-14 mt-6 bg-gray-500 flex tems-center justify-center rounded-4xl">
            <button className="w-full h-full flex flex-row items-center justify-center gap-x-2 hover:scale-105 transition-transform">
              <p className=" text-[18px] text-white uppercase mt-1">Get Started</p>
              <ArrowRightToLine className="text-white" />
            </button>
          </div>
        </div>
        <div className="w-[45%] h-full rounded-3xl p-2 ">
          <img src={student} alt="" className="w-full h-full object-cover rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
