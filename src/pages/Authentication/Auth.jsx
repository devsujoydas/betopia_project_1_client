import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="h-[80dvh] flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default Auth;
