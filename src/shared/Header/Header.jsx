import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react"; 
import { useAuth } from "../../AuthProvider/authProvider.jsx";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Account", path: "/account" },
    { name: "Complete Profile", path: "/complete-profile" },
    { name: "Reset Password", path: "/auth/reset-password" },
  ]; 

  return (
    <header className="border-b border-zinc-200 relative z-50">
      <div className="max-w-screen-2xl mx-auto py-4 px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src="/logo.png" alt="Logo" className="h-8 md:h-10" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-center space-x-8 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-zinc-700 hover:text-[#4B1E2F] transition-colors ${
                  isActive ? "font-semibold" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Side: Signup or User Profile */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {!user ? (
            <NavLink
              to="/auth/signup"
              className="bg-[#4B1E2F] text-white rounded-sm px-4 py-2 text-sm hover:bg-white border border-transparent hover:border-black active:scale-95 hover:text-[#4B1E2F] transition-all duration-300"
            >
              Sign Up
            </NavLink>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 bg-[#4B1E2F] text-white rounded-sm px-4 py-2 text-sm hover:bg-white border border-transparent hover:border-black hover:text-[#4B1E2F] transition-all duration-300"
              >
                {user.name}
                <ChevronDown size={16} />
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-40 bg-white border border-zinc-200 rounded shadow-lg flex flex-col"
                  >
                    <Link
                      to="/profile"
                      className="px-4 py-2 text-sm hover:bg-zinc-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="px-4 py-2 text-sm hover:bg-zinc-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      className="px-4 py-2 text-sm text-left hover:bg-zinc-100"
                      onClick={() => {
                        localStorage.removeItem("token"); // or your logout logic
                        window.location.reload();
                      }}
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-zinc-200 bg-white"
          >
            <ul className="flex flex-col p-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    onClick={() => setMobileMenuOpen(false)}
                    to={link.path}
                    className="block w-full"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
              {!user ? (
                <NavLink
                  onClick={() => setMobileMenuOpen(false)}
                  to="/auth/signup"
                  className="block bg-[#4B1E2F] text-white rounded-sm px-4 py-2 text-sm text-center hover:bg-white border border-transparent hover:border-black hover:text-[#4B1E2F] transition-all duration-300"
                >
                  Sign Up
                </NavLink>
              ) : (
                <div className="flex flex-col space-y-2 mt-2 border-t pt-2">
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/profile"
                    className="px-4 py-2 text-sm hover:bg-zinc-100"
                  >
                    Profile
                  </Link>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/settings"
                    className="px-4 py-2 text-sm hover:bg-zinc-100"
                  >
                    Settings
                  </Link>
                  <button
                    className="px-4 py-2 text-left text-sm hover:bg-zinc-100"
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.reload();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
