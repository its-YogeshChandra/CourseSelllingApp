import { Palette, Heart } from "lucide-react";

export default function EducationSection() {
  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Images */}
          <div className="relative">
            <div className="relative">
              {/* Main image */}
              <img
                src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Students learning together"
                className="w-3/4 h-60 object-cover rounded-2xl"
              />

              {/* Overlapping circular image */}
              <div className="absolute top-28 right-8 w-48 h-48 rounded-full overflow-hidden border-8 border-white shadow-lg">
                <img
                  src="https://images.pexels.com/photos/4145032/pexels-photo-4145032.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Student studying"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bottom image */}
            <div className="mt-5 flex justify-end pr-22">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Students in classroom"
                className="w-6/8 h-60 object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <div>
              <p className="text-red-500 text-sm font-medium tracking-wider uppercase mb-4">
                Your Features, Your Way
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Transform Your Life Through Online Education
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humor, of randomized words which don't look even
                slightly believable
              </p>
            </div>

            <div className="space-y-6">
              {/* Art & Design Feature */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Palette className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    Art & Design
                  </h3>
                  <p className="text-gray-600">You Pick the Schedule.</p>
                </div>
              </div>

              {/* Health & Fitness Feature */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    Health & Fitness
                  </h3>
                  <p className="text-gray-600">You Pick the Schedule.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
