import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import ProtectedRoute from "./ProtectedRouter";

const Landing = lazy(() => import("../pages/Landing"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const AllCourses = lazy(() => import("../pages/AllCourses"));
const MyCourses = lazy(() => import("../pages/MyCourses"));
const CourseDetail = lazy(() => import("../pages/CourseDetail"));
const Search = lazy(() => import("../pages/Search"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
const AccountSettings = lazy(() => import("../pages/AccountSettings"));

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
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
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
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/settings",
        element: <AccountSettings />,
      },
    ],
  },
]);
