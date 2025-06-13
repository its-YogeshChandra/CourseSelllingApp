import { useState } from "react";

export default function RightSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative h-screen">
      {/* Open Button */}
      <button
        onClick={() => setOpen(true)}
        className="m-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Open Sidebar
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 flex justify-end ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      >
        {/* Sidebar sliding from right */}
        <div
          className={`w-[300px] h-screen bg-white p-6 shadow-lg z-50 transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside sidebar
        >
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-black text-lg"
          >
            ❌
          </button>

          {/* Sidebar Content */}
          <h2 className="text-xl font-bold mb-4">Luminate Sidebar</h2>
          <p>Place your navigation, categories, or anything here.</p>
        </div>
      </div>
    </div>
  );
}
