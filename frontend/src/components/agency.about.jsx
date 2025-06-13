import { Download, Settings, Users } from "lucide-react";

export default function AgencySection() {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-7xl mx-auto">
        {/* About Us Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-gray-600 tracking-wide">
              ABOUT US
            </span>
            <div className="w-2 h-2 bg-red-500 rounded-full ml-2"></div>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-red-500">Introduction</span>{" "}
            <span className="text-gray-900">To Best</span>
            <br />
            <span className="text-gray-900">Digital Agency!</span>
          </h1>
        </div>

        {/* Description Text */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          <div className="text-gray-600 leading-relaxed">
            <p>
              Harum quisquam amet debitis pariatur quas? Nemo excepturi duis
              minim nostrud officia dolorem fugit itaque, fugiat excepturi modi,
              porta.
            </p>
          </div>
          <div className="text-gray-600 leading-relaxed">
            <p>
              Odio velit, odit, est, suscimod aliquid luctus pharetra vero,
              condimentum, nostrum mi venenatis, mollit odio mi, unde tempor
              adipiscing aut.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Best Price Guaranteed */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <Download className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Best Price Guaranteed
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>

          {/* Finance Analysis */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Finance Analysis
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>

          {/* Professional Team */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Professional Team
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
