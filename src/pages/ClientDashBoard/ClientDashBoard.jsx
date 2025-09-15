import React from "react";
import YourCreditScore from "./YourCreditScore";
import SuggestedCreditLimit from "./SuggestedCreditLimit";

const ClientDashBoard = () => {
  return (
    <div className="max-w-screen-2xl mx-auto my-20">
      <div>
        <h1 className="text-3xl text-primary font-medium">
          M. GUEHI – Dashboard
        </h1>
      </div>

      <div className="flex gap-8 mt-16">
        <div className="w-2/3 border border-zinc-200 rounded-lg shadow-lg">
          <YourCreditScore />
        </div>
        <div className="w-1/3 border border-zinc-200  rounded-lg shadow-lg">
          <SuggestedCreditLimit />
        </div>
      </div>

      <div></div>

      <div></div>
    </div>
  );
};

export default ClientDashBoard;
