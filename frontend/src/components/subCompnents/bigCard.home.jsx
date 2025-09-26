import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, ArrowRight } from "lucide-react";
import studentpng from "../../assets/stuident.jpg"

export default function CollegeLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-teal-50 to-gray-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-400">
          <circle cx="20" cy="20" r="2" fill="currentColor" />
          <circle cx="40" cy="30" r="1.5" fill="currentColor" />
          <circle cx="60" cy="15" r="1" fill="currentColor" />
          <circle cx="80" cy="25" r="2" fill="currentColor" />
        </svg>
      </div>

      <div className="absolute bottom-32 left-10 w-24 h-24 opacity-30">
        <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-500">
          <path
            d="M20 50 Q50 20 80 50 Q50 80 20 50"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-emerald-600 border border-emerald-200">
              <Star className="w-4 h-4 fill-current" />
              MORE THAN 26,655+ STUDENTS
            </div>

            {/* Logo */}
            <div className="w-16 h-16 mb-6">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <path
                  d="M32 8 L48 24 L32 40 L16 24 Z"
                  fill="#10b981"
                  opacity="0.8"
                />
                <path d="M32 16 L40 24 L32 32 L24 24 Z" fill="#059669" />
              </svg>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Unlock Your
                <br />
                Potential with
                <br />
                Online Courses" <span className="text-emerald-500">2025</span>
              </h1>

              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Reach a global audience and start earning today. Our platform
                makes course creation and sales simple and effective.
              </p>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2"
              >
                GET STARTED
                <ArrowRight className="w-4 h-4" />
              </Button>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-sm font-semibold">
                    J
                  </div>
                  <div className="w-10 h-10 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-white text-sm font-semibold">
                    M
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-sm font-semibold">
                    S
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">160 +</div>
                  <div className="text-gray-600">Expert Students</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Section */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl mt-3">
              <img
                src={studentpng}
                alt="Student in library with headphones"
                className="w-full h-[500px] md:h-[600px] object-cover"
              />

              {/* Floating Card */}
              <Card className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg border-0">
                <div className="text-3xl font-bold text-emerald-500 mb-1">
                  260
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Artistic Expression
                </div>
              </Card>
            </div>

            {/* Decorative curved line */}
            <div className="absolute -top-8 -right-8 w-32 h-32 opacity-40">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-emerald-400"
              >
                <path
                  d="M10 50 Q30 10 50 50 Q70 90 90 50"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Small decorative dots */}
            <div className="absolute -bottom-4 -right-4 w-8 h-8">
              <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
              <div className="w-2 h-2 bg-emerald-300 rounded-full mt-2 ml-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
