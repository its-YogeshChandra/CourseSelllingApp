import React from "react";
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx";
import { Outlet } from "react-router";

export default function BaseLayoutTailwind() {
  return (
    <div className="min-h-screen w-full  grid grid-rows-[auto_1fr_auto]">
      <div className="row-start-1 fixed z-50 w-full">
        <Navbar />
      </div>

      <div className="row-start-2">
        <Outlet />
      </div>
    </div>   
  );
}
