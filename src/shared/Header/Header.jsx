import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; 
import { useAuth } from "../../AuthProvider/AuthProvider"; 
import useSignOut from "../../hooks/useSignOut";

const Header = () => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Admin DashBoard", path: "/admin-dashboard" },
    { name: "Client DashBoard", path: "/client-dashboard" },
  ];
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
                src="/default.jpg"
                alt="User"
                className="h-10 w-10 rounded-full cursor-pointer"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              />
              {profileDropdownOpen && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute mt-2 w-40 bg-white border border-zinc-200 rounded shadow-lg flex flex-col right-0"
                  >
                    <Link
                      to="/account"
                      className="px-4 py-2 text-sm hover:bg-zinc-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      Account
                    </Link>
                    <button
                      onClick={signOut}
                      className="px-4 py-2 text-sm text-left hover:bg-zinc-100"
                    >
                      Sign Out
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
