import plane from "../../assets/plane.png";

export default function TeacherSection() {
  return (
    <div className="bg-gray-300 pt-16 px-6 font-inter pb-28">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 grid-rows-[auto_auto] lg:grid-rows-[0.3fr_1fr] lg:grid-cols-1 gap-4">
          {/* Top row (Doodle) */}
          <div className="flex justify-center  lg:justify-center ">
            <img
              src={plane}
              className="w-28 h-28 lg:w-44 lg:h-44"
              alt="Plane Doodle"
            />
          </div>

          {/* Bottom row: nested grid with 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-6">
              <p className="text-red-500 text-sm font-medium tracking-wider uppercase">
                Get Started
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Become a Teacher
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomized words which don't look even
                slightly believable.
              </p>
              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Apply Now
              </button>
            </div>

            {/* Right: Cylindrical Images */}
            <div className="relative flex justify-center items-center mt-10 lg:mt-0  lg:flex lg:justify-end">
              <div className="">
                {/* Large circle */}
                <div className="w-[400px] h-[650px] bg-gray-300 rounded-full overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Woman working on laptop"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Small circle */}
                <div className="absolute top-48 left-5 w-[250px] h-[400px] flex justify-center items-center bg-white rounded-full overflow-hidden border-8 border-white shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/8617725/pexels-photo-8617725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Student with headphones and clipboard"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
