import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="h-[100dvh] font-poppins flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default Auth;
