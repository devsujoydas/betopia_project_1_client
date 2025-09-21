import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CircleUser, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../AuthProvider/AuthProvider";
import useSignOut from "../../hooks/useSignOut";

const Header = () => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();


  const signOut = useSignOut();

  return (
    <header className="border-b border-zinc-200 relative z-50">
      <div className="max-w-screen-2xl mx-auto py-6 px-4 md:px-8 flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-8 md:h-10 cursor-pointer"
            />
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 justify-center space-x-8 items-center">

          <NavLink to={"/"} className={({ isActive }) => `text-zinc-700 hover:text-[#4B1E2F] transition-colors ${isActive ? "font-semibold" : ""}`}>Home</NavLink>

          <NavLink to={"/about"} className={({ isActive }) => `text-zinc-700 hover:text-[#4B1E2F] transition-colors ${isActive ? "font-semibold" : ""}`}>About</NavLink>

       </nav>

        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <NavLink
              to="/auth/signin"
              className="btn-signin"
            >
              Sign In
            </NavLink>
          ) : (
            <div className="relative">
              <img
                src={user?.personalInfo?.profilePhotoUrl? user?.personalInfo?.profilePhotoUrl : "/default.jpg"}
                alt="User"
                className="h-10 w-10 rounded-full cursor-pointer object-cover shadow-md"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              />
              {profileDropdownOpen && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute mt-2 w-fit   bg-white border border-zinc-200 rounded-xl p-3 shadow-lg flex flex-col right-0 "
                  >
                    <Link
                      to="/account"
                      className="px-4 py-2 text-sm hover:bg-zinc-100 flex items-center gap-2 rounded-md"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <CircleUser className="w-5" />Account
                    </Link>
                    <Link
                      to="/admin/dashboard"
                      className="px-4 py-2 text-sm hover:bg-zinc-100 flex items-center gap-2 rounded-md"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <LayoutDashboard className="w-5" />A.Dashboard
                    </Link>
                    <Link
                      to="/client/dashboard"
                      className="px-4 py-2 text-sm hover:bg-zinc-100 flex items-center gap-2 rounded-md"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <LayoutDashboard className="w-5" />C.Dashboard
                    </Link>
                    <button
                      onClick={signOut}
                      className="px-4 py-2 text-sm text-left hover:bg-red-100 text-red-500 cursor-pointer flex items-center gap-2 rounded-md"
                    >
                      <LogOut className="w-5" />Sign Out
                    </button>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-zinc-200 bg-white"
          >
            <ul className="flex flex-col p-4 space-y-3">
            
              <NavLink
                onClick={() => setMobileMenuOpen(false)} to={"/"} className="block w-full">Home</NavLink>

              <NavLink
                onClick={() => setMobileMenuOpen(false)} to={"/about"} className="block w-full">About</NavLink>

              {!user ? (
                <NavLink
                  onClick={() => setMobileMenuOpen(false)}
                  to="/auth/signin"
                  className="block bg-[#4B1E2F] text-white rounded-sm px-4 py-2 text-sm text-center hover:bg-white border border-transparent hover:border-black hover:text-[#4B1E2F] transition-all duration-300"
                >
                  Sign In
                </NavLink>
              ) : (
                <li className="border-t mt-2 pt-2">
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="btn-primary"
                  >
                    Sign Out
                  </button>
                </li>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
