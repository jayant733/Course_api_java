import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import ProtectedRoute from "./ProtectedRouter";

const Landing = lazy(() => import("../pages/Landing"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const AllCourses = lazy(() => import("../pages/AllCourses"));
const MyCourses = lazy(() => import("../pages/MyCourses"));
const CourseDetail = lazy(() => import("../pages/CourseDetail"));
const Search = lazy(() => import("../pages/Search"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/all-courses",
        element: <AllCourses />,
      },
      {
        path: "/my-courses",
        element: <MyCourses />,
      },
      {
        path: "/courses/:id",
        element: <CourseDetail />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);