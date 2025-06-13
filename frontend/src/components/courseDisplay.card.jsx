export default function CourseDisplayCard() {
  return (
    <div className="relative h-[458px] md:h-[548px] lg:h-[400px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={
            "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="Woman doing strength training"
          fill
          className=" "
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 font-inter lg:pl-40">
          <div className="max-w-6xl ">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl  font-bold text-white leading-tight mb-2 sm:mb-8">
              Ten Moments Basically Gym Gym Experience.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl lg:text-[1rem] text-gray-200 leading-relaxed mb-2 sm:mb-12 max-w-2xl">
              Master essential strength training techniques to maximize results
              and prevent injuries. Understand correct form, workout structure,
              and effective routines for...
            </p>

            {/* Author Info */}
            <div className="flex  gap-2 sm:gap-4 w-max h-max">
              <div className="relative w-max h-max sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="Sridam Ray"
                  fill
                  className="rounded-full r border-1 w-12 h-12  border-white/20"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <span className="text-white font-light text-sm sm:text-base md:text-lg">
                  Sridam Ray
                </span>
                <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
                <span className="text-gray-300 text-sm sm:text-base">
                  June 3, 2025
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
