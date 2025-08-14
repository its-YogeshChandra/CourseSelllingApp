import { createBrowserRouter } from "react-router";
import App from "../App.jsx";
import Layout from "../layout/layout.jsx";
import LoginPage from "../pages/LogIn.page.jsx";
import SignupPage from "../pages/signUp.page.jsx";
import BaseLayout from "../components/baselayout.jsx";
import Home from "../components/home.jsx";
import CourseDisplay from "../pages/coursedisplay.jsx";
import CoursePlayer from "../pages/courseplayer.jsx";
import AbouUs from "../pages/about.jsx";
import CourseCategory from "../pages/courseCategory.jsx";
import Cart from "../pages/cart.jsx";
import UserProfile from "../components/userprofile.jsx";
import InstructorDashboard from "../pages/instructor.jsx";

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
          {
            path: "",
            Component: BaseLayout,
            children: [
              {
                path: "home",
                Component: Home,
              },
              {
                path: "coursedisplay",
                Component: CourseDisplay,
              },
              {
                path: "courseplayer",
                Component: CoursePlayer,
              },
              {
                path: "aboutus",
                Component: AbouUs,
              },
              {
                path: "coursescategory",
                Component: CourseCategory,
              },
              {
                path: "cart",
                Component: Cart,
              },
              {
                path: "userprofile",
                Component: UserProfile,
              },
            ],
          },
          {
            path: "instructor",
            children: [
              {
                path: "dashboard",
                Component: InstructorDashboard,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export { Routing };
