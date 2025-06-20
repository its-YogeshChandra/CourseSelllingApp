import React from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="w-screen h-full">
      <Outlet />
      <Toaster
        position="bottom-left"
        theme="light"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#111",
            color: "#fff",
            borderRadius: "8px",
          },
        }}
      />
    </div>
  );
}

export default App;
