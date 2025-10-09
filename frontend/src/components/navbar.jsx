import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import avatar from "../assets/rabbit.png";
import NavSidebar from "./subCompnents/nav.sidebar.jsx";
import { useNavigate } from "react-router";
import authService from "../services/auth.js";
import Logo from "../assets/Logo.png"

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
      const n = data.toLowerCase().replace(/\s+/g, "");
      if (e.includes(n)) {
        if (n == "home") {
          navigate("/");
        } else {
          navigate("/" + e);
        }
      }
    });
  };

  // navigate to the profile
  const navigateToProfile = async () => {
    //  check for the auth me
    const response = await authService.authMehandler();
    if (response.success == true) {
      // const meta = {
      //   data: response.data._id || "",
      // };
      const meta1 = response.data._id
      // const query = new URLSearchParams(meta).toString(); 
      navigate(`/testingprofile/:${meta1}`);
    } else {
      const meta = {
        location: "home",
        data: "",
      };
      const query = new URLSearchParams(meta).toString();
      navigate(`/auth/signup?${query}`);
    }
  };

  return (
    <nav className="w-full max-w-full bg-white shadow-md relative z-50 overflow-hidden font-inter ">
      {/* Top Navbar */}
      <div className="flex justify-between items-center px-4 py-3 lg:px-10 w-full">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <img src={Logo} alt="Logo" className="w-10 h-10 object-contain" />
          <p className="text-xl lg:text-2xl font-semibold">LearnVerge</p>
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
          <button onClick={navigateToProfile}>
            <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />
          </button>
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
