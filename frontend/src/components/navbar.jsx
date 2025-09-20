// import React, { useState } from "react";
// import logo from "../assets/logo.png";
// import avatar from "../assets/rabbit.png";
// import { NavLink } from "react-router";
// import NavSidebar from "./subCompnents/nav.sidebar.jsx";

// function Navbar() {
//   const navArr = ["Home", "Courses", "About Us", "Contact Us"];
//   const [clicked, setClicked] = useState(false);

//   return (
//     <div className="w-full max-h-32 min-h-28 grid items-center relative font-inter">
//       <div className=" w-full min-h-15  flex flex-row flex-wrap justify-between items-center px-5 max-[396px]:px-3 lg:px-10 ">
//         <div className="  min-w-20 max-[396px]:h-10 h-15 flex flex-row items-center gap-x-2">
//           <img className="w-[40%] h-[100%] " src={logo} alt="" />
//           <p className="text-xl max-[396px]:text-lg lg:text-2xl ">Luminate</p>
//         </div>
//         <div className="hidden  lg:w-[40%] lg:text-xl  lg:flex lg:flex-row lg:items-center lg:justify-between  ">
//           {navArr.map((e, key) => {
//             return (
//               <button
//                 key={e}
//                 onClick={() => {
//                   switch (e) {
//                     case "home":
//                       break;
//                     case "Courses":
//                       break;
//                     case "Contact Us":
//                       break;
//                     case "About Us":
//                       break;
//                     default:
//                       break;
//                   }
//                 }}
//               >
//                 {e}
//               </button>
//             );
//           })}
//         </div>
//         <div className=" h-full min-h-15  min-w-20 flex flex-row items-center gap-x-6">
//           <i className="bx  bx-search-big text-2xl "></i>
//           <i className="bx  bx-cart text-2xl"></i>
//           <img src={avatar} className="w-10 h-10" alt="" />
//           <div className="w-max h-max rounded-sm pt-2 lg:hidden">
//             <button
//               onClick={(e) => {
//                 e.preventDefault;
//                 setClicked((prev) => !prev);
//               }}
//             >
//               <i className="bx bg-red-300 bx-menu-wide text-4xl"></i>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* sideBar overlay */}
//       <div
//         className={`fixed inset-0 bg-black/50 z-40 flex justify-end transition-opacity duration-300 ${
//           clicked
//             ? "opacity-100 pointer-events-auto "
//             : "opacity-0 pointer-events-none "
//         }`}
//         // click on overlay closes sidebar
//       >
//         <div
//           className={`w-[430px] h-screen max-[550px]:w-[360px] fixed top-0 right-0 bg-black flex items-center align-middle transform transition-transform duration-700 ease-in-out ${
//             clicked? "translate-x-0": "translate-x-full"
//           }`}
//         >
//           <NavSidebar clickHandler={setClicked} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import avatar from "../assets/rabbit.png";
import NavSidebar from "./subCompnents/nav.sidebar.jsx";
import { useNavigate } from "react-router";

export default function Navbar() {
  const navLinks = ["Home", "Courses", "About Us"];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  //usenavigate for navigation
  const navigate = useNavigate();

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  //adding navigation for different section in the website
  const navigationHandler = (data) => {
    const elementArr = ["aboutus", "coursescategory", "home"];
    elementArr.map((e) => {
      const  n = data.toLowerCase().replace(/\s+/g, "")
      const value = "/app/" + e
      if (e.includes(n)) {
        navigate("/app/" + e);
      }
    });
  };

  return (
    <nav className="w-full max-w-full bg-white shadow-md relative z-50 overflow-hidden font-inter ">
      {/* Top Navbar */}
      <div className="flex justify-between items-center px-4 py-3 lg:px-10 w-full">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          <p className="text-xl lg:text-2xl font-semibold">Luminate</p>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex gap-8 text-base font-medium flex-shrink-0">
          {navLinks.map((link, idx) => (
            <button
              key={idx}
              className="hover:text-purple-600 transition whitespace-nowrap"
              onClick={() => {
                navigationHandler(link);
              }}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <i className="bx bx-search text-2xl"></i>
          <i className="bx bx-cart text-2xl"></i>
          <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />
          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <i className="bx bx-menu text-3xl"></i>
          </button>
        </div>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar - Fixed the width issue */}
      <div
        className={`fixed top-0 right-0 h-full bg-white w-80 sm:w-96 z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ maxWidth: "90%" }} // Fallback for very small screens
      >
        <NavSidebar clickHandler={setSidebarOpen} />
      </div>
    </nav>
  );
}
