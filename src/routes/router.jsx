import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Signup from "../pages/Authentication/Signup/Signup";
import ResetPassword from "../pages/Authentication/ResetPassword/ResetPassword";
import Auth from "../pages/Authentication/Auth";
import About from "../pages/About/About";
import Signin from "../pages/Authentication/Signin/Signin";
import CompleteProfile from "../pages/CompleteProfile/CompleteProfile";
import ProtectedRoute from "./ProtectedRoute";
import Account from "../pages/AccountSettings/Account";
import ClientDashBoard from "../pages/ClientDashBoard/ClientDashBoard";
import AdminDashBoard from "../pages/AdminDashBoard/AdminDashBoard";
import MainLayout from "../layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
      },
      {
        path: "client-dashboard",
        element: (
          <ProtectedRoute>
            <ClientDashBoard />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin-dashboard",
        element: (
          <ProtectedRoute>
            <AdminDashBoard />
          </ProtectedRoute>
        ),
      },
      { path: "about", element: <About /> },
    ],
  },
  {
    path: "auth",
    element: <Auth />,
    children: [
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "complete-profile",
        element: (
          <ProtectedRoute>
            <CompleteProfile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
