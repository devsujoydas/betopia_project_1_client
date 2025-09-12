import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="h-[100dvh] flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default Auth;
