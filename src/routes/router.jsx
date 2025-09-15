import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
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
import AuthProtectedRoute from "./AuthProtectedRoute";
import ClientDashBoard from "../pages/ClientDashBoard/ClientDashBoard";
import AdminDashBoard from "../pages/AdminDashBoard/AdminDashBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
      {
        path: "complete-profile",
        element: (
          <ProtectedRoute>
            <CompleteProfile />
          </ProtectedRoute>
        ),
      },
      { path: "about", element: <About /> },

      {
        path: "auth",
        element: <Auth />,
        children: [
          {
            path: "signin",
            element: (
              <AuthProtectedRoute>
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
        ],
      },
    ],
  },
]);

export default router;
