// Admin.jsx
import { LayoutDashboard, LogOut, Settings, Menu } from "lucide-react";
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useSignOut from "../../hooks/useSignOut";

const Admin = () => {
  const signOut = useSignOut();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 p-3 rounded-md transition-all duration-300 ${
      isActive ? "bg-[#200D14]" : "hover:bg-[#3a1a2b]"
    }`;

  return (
    <div className="min-h-screen relative md:grid md:grid-cols-12 bg-[#F9FAFB]">
      {/* Mobile Header */}
      <div className="flex items-center justify-between md:hidden p-4 bg-[#4B1E2F] text-white">
        <div className="flex items-center gap-2">
          <div className="bg-white w-fit px-3 py-2 rounded-md">
            <img src="/logo.png" alt="Logo" className="w-20 sm:w-24" />
          </div>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 transform bg-[#4B1E2F] text-white  p-5 flex flex-col justify-between transition-transform duration-300
          md:relative md:col-span-2 md:translate-x-0 rounded-r-4xl
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div>
          <div className="hidden md:flex justify-center items-center mb-8">
            <div className="bg-white w-fit px-4 py-3 rounded-md">
              <img src="/logo.png" alt="Logo" />
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <NavLink to="/admin/dashboard" className={linkClasses}>
              <LayoutDashboard /> Dashboard
            </NavLink>
            <NavLink to="/admin/settings" className={linkClasses}>
              <Settings /> Settings
            </NavLink>
          </nav>
        </div>

        <button
          onClick={signOut}
          className="flex w-full items-center gap-2 p-3 rounded-md text-red-400 hover:bg-[#200D14] transition-all duration-300 mt-5"
        >
          <LogOut /> Sign Out
        </button>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="md:col-span-10 p-4 sm:p-6 lg:p-10 ml-0 md:ml-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
