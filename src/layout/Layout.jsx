import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../shared/Header/Header";
import Footer from "../shared/Footer/Footer";

const Layout = () => {
  return (
    <div className="font-poppins">
      <Header />
      <div className="min-h-[80dvh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
