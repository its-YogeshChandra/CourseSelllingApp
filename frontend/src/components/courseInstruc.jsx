export default function CourseInstSection() {
  return (
    <div className="w-full max-w-sm mx-auto md:max-w-none sm:max-w-none lg:max-w-sm bg-gray-50 rounded-lg border-2  p-6 md:p-8 mt-3">
      {/* Course By Section */}
      <div className="mb-8">
        <h2 className="text-lg md:text-xl font-medium text-gray-900 mb-6">
          A course by
        </h2>

        {/* Instructors */}
        <div className="space-y-4 md:space-y-6">
          {/* Richard David */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0">
              <img
                src="https://images.pexels.com/photos/5905483/pexels-photo-5905483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Richard David"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                Richard David
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Marketing Expert
              </p>
            </div>
          </div>

          {/* Sridam Ray */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0">
              <img
                src="https://images.pexels.com/photos/8617757/pexels-photo-8617757.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="Sridam Ray"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                Sridam Ray
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                WordPress Developer
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-200 mb-8" />

      {/* Tags Section */}
      <div>
        <h2 className="text-lg md:text-xl font-medium text-gray-900 mb-6">
          Tags
        </h2>

        <div className="flex flex-wrap gap-3 md:gap-4">
          <button className="px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base text-gray-700 border border-gray-300 rounded-full hover:border-gray-400 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
            Education
          </button>
          <button className="px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base text-gray-700 border border-gray-300 rounded-full hover:border-gray-400 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
            Learning
          </button>
          <button className="px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base text-gray-700 border border-gray-300 rounded-full hover:border-gray-400 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
            student
          </button>
          <button className="px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base text-gray-700 border border-gray-300 rounded-full hover:border-gray-400 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
            Study
          </button>
        </div>
      </div>
    </div>
  );
}
