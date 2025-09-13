import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="border-b border-zinc-200">
      <div className="max-w-screen-2xl xl:mx-auto py-5 flex justify-between items-center">
        <Link to={"/"} className="">
          <img src="/logo.png" alt="" />
        </Link>
        <div className="space-x-5">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/auth/reset-password"}>Reset Password</NavLink>
          <NavLink to={"/"}></NavLink>
          <NavLink to={"/"}></NavLink>
        </div>
        <div>
          <NavLink className={"bg-[#4B1E2F] text-white rounded-sm px-4 py-2 text-sm hover:bg-white border border-transparent hover:border-black active:scale-95 hover:text-[#4B1E2F] transition-all duration-300"} to={"/auth/signup"}>Sign Up</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
