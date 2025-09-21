import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useSignOut from "../../hooks/useSignOut";

const Admin = () => {
  const signOut = useSignOut();

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 p-3 rounded-md transition-all duration-300 ${
      isActive ? "bg-[#200D14]" : "hover:bg-[#3a1a2b]"
    }`;

  return (
    <div className="grid grid-cols-12  min-h-screen">
      {/* Sidebar */}
      <div className="h-[100dvh] col-span-2 bg-[#4B1E2F] rounded-r-[50px] text-white p-5 flex flex-col justify-between box-border">
        <div>
          {/* Logo */}
          <div className="flex justify-center items-center mb-8">
            <div className="bg-white w-fit px-4 py-3 rounded-md">
              <img src="/logo.png" alt="Guehi and Co Logo" />
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-2">
            <NavLink to="/admin/dashboard" className={linkClasses}>
              <LayoutDashboard /> Dashboard
            </NavLink>
            <NavLink to="/admin/settings" className={linkClasses}>
              <Settings /> Settings
            </NavLink>
          </nav>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={signOut}
          className="flex w-full cursor-pointer items-center gap-2 p-3 rounded-md
            text-red-400 hover:bg-[#200D14] transition-all duration-300 mt-5"
        >
          <LogOut /> Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="col-span-10 p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
