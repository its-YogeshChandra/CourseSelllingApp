import { createBrowserRouter } from "react-router";
import App from "../App.jsx";
import Layout from "../layout/layout.jsx";
import LoginPage from "../pages/LogIn.page.jsx";
import SignupPage from "../pages/signUp.page.jsx";

const Routing = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "app",
        Component: Layout,
        children: [
          {
            path: "auth",
            children: [
              {
                path: "signup",
                Component: SignupPage,
              },
              {
                path: "login",
                Component: LoginPage,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export { Routing };
