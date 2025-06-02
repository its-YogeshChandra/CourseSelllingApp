import React from "react";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="w-screen h-screen">
      <Outlet />
    </div>
  );
}

export default App;
