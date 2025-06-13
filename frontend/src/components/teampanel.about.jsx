import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";

export default function TeamMembersSection() {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Our Team Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-gray-600 tracking-wide">
              OUR TEAM
            </span>
            <div className="w-2 h-2 bg-red-500 rounded-full ml-2"></div>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="text-red-500">Team</span>{" "}
            <span className="text-gray-900">Members</span>
          </h2>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-gray-500">
            Sint nascetur facere, delectus conubia consequuntur, nonummy
            distinctio! Non officia, id natus non nisl provident justo.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Team Member 1 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1576558656222-ba66febe3dec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM3fHx8ZW58MHx8fHx8"
                alt="Sony Madison"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative">
              <div className="absolute -top-6 left-0 right-0 mx-auto w-4/5">
                <div className="bg-red-500 text-white text-center py-3 px-4 rounded-full">
                  <h3 className="font-bold text-lg">Sony Madison</h3>
                  <p className="text-sm text-white/90">CEO, Director</p>
                </div>
              </div>
              <div className="pt-16 pb-6 flex justify-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Facebook size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Youtube size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hary Warth"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative">
              <div className="absolute -top-6 left-0 right-0 mx-auto w-4/5">
                <div className="bg-red-500 text-white text-center py-3 px-4 rounded-full">
                  <h3 className="font-bold text-lg">Hary Warth</h3>
                  <p className="text-sm text-white/90">Head Manager</p>
                </div>
              </div>
              <div className="pt-16 pb-6 flex justify-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Facebook size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Youtube size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDYzfHx8ZW58MHx8fHx8"
                alt="Jenny Hobb"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative">
              <div className="absolute -top-6 left-0 right-0 mx-auto w-4/5">
                <div className="bg-red-500 text-white text-center py-3 px-4 rounded-full">
                  <h3 className="font-bold text-lg">Jenny Hobb</h3>
                  <p className="text-sm text-white/90">Branch Manager</p>
                </div>
              </div>
              <div className="pt-16 pb-6 flex justify-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Facebook size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Youtube size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Team Member 4 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img
                src="https://plus.unsplash.com/premium_photo-1732196162523-536f833ca616?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDcyfHx8ZW58MHx8fHx8"
                alt="Johny Smith"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative">
              <div className="absolute -top-6 left-0 right-0 mx-auto w-4/5">
                <div className="bg-red-500 text-white text-center py-3 px-4 rounded-full">
                  <h3 className="font-bold text-lg">Johny Smith</h3>
                  <p className="text-sm text-white/90">Supervisor</p>
                </div>
              </div>
              <div className="pt-16 pb-6 flex justify-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Facebook size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Youtube size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
