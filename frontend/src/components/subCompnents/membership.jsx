import { Palette, Brain, Heart, User } from "lucide-react";

export default function Membership() {
  return (
    <div className="h-[525px] mt-5  flex font-inter max-[769px]:flex max-[769px]:flex-col">
      {/* Left Section - Membership CTA */}
      <div className="flex-1 bg-red-500 flex items-center justify-center p-6 lg:p-8">
        <div className="max-w-xs text-white">
          <div className="text-xs font-medium mb-2 tracking-wider uppercase">
            Membership
          </div>
          <h1 className="text-2xl lg:text-4xl font-bold mb-4 leading-tight">
            Start your Learning Journey Today
          </h1>
          <p className="text-sm mb-5 text-red-100">
            With a free 7-day trial, then$ 15.99/month.
          </p>
          <button className="border-2 border-white text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-white hover:text-red-500 transition-colors duration-200">
            Sign Up Now
          </button>
        </div>
      </div>

      {/* Right Section - Course Categories */}
      <div className="flex-1 bg-gray-900 flex items-center justify-center p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg w-full">
          <CourseCard
            icon={<Palette className="w-6 h-6" />}
            title="Art & Design"
            description="You Pick the Schedule."
            iconColor="text-teal-500"
            iconBg="bg-teal-50"
          />
          <CourseCard
            icon={<Brain className="w-6 h-6" />}
            title="Computer Science"
            description="You Pick the Schedule."
            iconColor="text-purple-500"
            iconBg="bg-purple-50"
          />
          <CourseCard
            icon={<Heart className="w-6 h-6" />}
            title="Health & Fitness"
            description="You Pick the Schedule."
            iconColor="text-pink-500"
            iconBg="bg-pink-50"
          />
          <CourseCard
            icon={<User className="w-6 h-6" />}
            title="Development"
            description="You Pick the Schedule."
            iconColor="text-orange-500"
            iconBg="bg-orange-50"
          />
        </div>
      </div>
    </div>
  );
}

function CourseCard({ icon, title, description, iconColor, iconBg }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
      <div
        className={`inline-flex items-center justify-center w-8 h-8 ${iconBg} rounded-lg mb-3`}
      >
        <div className={iconColor}>{icon}</div>
      </div>
      <h3 className="text-base font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
