import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Signup from "../pages/Authentication/Signup/Signup";
import ResetPassword from "../pages/Authentication/ResetPassword/ResetPassword";
import Auth from "../pages/Authentication/Auth";
import About from "../pages/About/About";
import AccountSettings from "../pages/AccountSettings/AccountSettings";
import Signin from "../pages/Authentication/Signin/Signin";
import CompleteProfile from "../pages/CompleteProfile/CompleteProfile";
import Account from "../pages/Account/Account";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },

      {
        path: "auth",
        element: <Auth />,
        children: [
          { path: "signin", element: <Signin /> },
          { path: "signup", element: <Signup /> },
          { path: "reset-password", element: <ResetPassword /> },
        ],
      },

      {
        path: "account",
        element: (
          <ProtectedRoute>
            <Account />
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
      { path: "account-settings", element: <AccountSettings /> },
      { path: "about", element: <About /> },
    ],
  },
]);

export default router;
