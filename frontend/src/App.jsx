import React from "react";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="w-screen h-full">
      <Outlet />
    </div>
  );
}

export default App;
