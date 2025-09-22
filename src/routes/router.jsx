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
import AdminDashBoard from "../pages/Admin/AdminDashBoard";
import MainLayout from "../layout/MainLayout";
import AuthProtectedRoute from "./AuthProtectedRoute";
import Admin from "../pages/Admin/Admin";
import AdminSettings from "../pages/Admin/AdminSettings";
import AdminProtectedRoute from "./AdminProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
      },
      {
        path: "client/dashboard",
        element: (
          <ProtectedRoute>
            <ClientDashBoard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "auth",
    element: <Auth />,
    children: [
      {
        path: "signin",
        element: (
          <AuthProtectedRoute>
            {" "}
            <Signin />
          </AuthProtectedRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthProtectedRoute>
            <Signup />
          </AuthProtectedRoute>
        ),
      },
      {
        path: "reset-password",
        element: (
          <AuthProtectedRoute>
            <ResetPassword />
          </AuthProtectedRoute>
        ),
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
  {
    path: "admin",
    element: (
      <AdminProtectedRoute>
        <Admin />
      </AdminProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashBoard />,
      },
      {
        path: "settings",
        element: <AdminSettings />,
      },
    ],
  },
]);

export default router;
