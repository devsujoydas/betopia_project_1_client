import Lottie from "lottie-react";
import React from "react";
import errorlogo from "../../../public/404 planet animation.json";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <Lottie className="w-1/2" animationData={errorlogo} loop={true} />
      <h1 className="text-3xl mb-4">Page Not Found</h1>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="btn-primary"
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
