import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, BrowserRouter } from "react-router";
import "./index.css";
import { Routing } from "./routes/routes.js";
import { store } from "./services/redux.store/store.js";
import { Provider } from "react-redux";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={Routing} />
    </Provider>
  </StrictMode>
);
