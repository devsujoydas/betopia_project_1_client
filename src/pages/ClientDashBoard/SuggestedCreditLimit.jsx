import { CircleCheckBig, DollarSign } from "lucide-react";
import React from "react";

const SuggestedCreditLimit = () => {
  return (
    <div className="grid gap-5">
      <div className="bg-white border border-zinc-200 rounded-lg shadow-lg overflow-hidden">
        <div className="flex  items-center rounded-t-lg p-6 bg-[#F5F5F5]">
          <h3 className="font-medium text-[18px]">Suggested Credit Limit</h3>
        </div>

        <div className="md:m-6 m-4 ">
          <div className="flex flex-col justify-center items-center text-center gap-4 md:gap-5">
            <DollarSign className="text-[#4B1E2F] bg-[#EDE9EA] p-2 md:p-4.5 rounded-full w-10 md:w-16 h-10 md:h-16" />
            <h1 className="font-semibold text-xl md:mt-5">FCFA 100,000</h1>
            <p className="md:text-[16px] text-sm">
              Based on your credit score of 95/100
            </p>
          </div>

          <div className="p-5 mt-5 md:mt-14 rounded-2xl space-y-5 border border-zinc-300 bg-[#f5f6f8]">
            <h1 className="font-medium md:text-lg text-sm ">
              Credit Limit Ranges
            </h1>
            <div className="space-y-5 text-xs md:text-[16px]">
              <div className="flex justify-between items-center">
                <p className="font-light">Excellent (80-100):</p>
                <p className="font-medium">FCFA 100,000</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-light">Good (60-79):</p>
                <p className="font-medium">FCFA 50,000</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-light">Fair (40-59):</p>
                <p className="font-medium">FCFA 30,000</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-light">Poor (0-39):</p>
                <p className="font-medium">FCFA 10,000</p>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-5">
            <div>
              <input type="checkbox" name="check" id="check" />
              <label
                htmlFor="check"
                className="md:text-sm text-xs ml-2 cursor-pointer"
              >
                I agree to share my data with partner financial institutions for
                my credit application
              </label>
            </div>

            <form>
              <h1 className="md:text-lg text-sm font-medium ">
                Enter Loan Amount{" "}
              </h1>
              <input
                type="number"
                className="w-full outline-none placeholder:md:text-sm placeholder:text-xs border-2 border-zinc-300 rounded-md p-3 md:p-3.5 mt-2"
                placeholder="Enter your amount"
              />

              <div className="flex justify-center items-center mt-5">
                <button className="btn-primary">Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-lg shadow-lg overflow-hidden">
        <div className="flex  items-center rounded-t-lg p-6 bg-[#F5F5F5]">
          <h3 className="font-medium text-[18px]">Application Status</h3>
        </div>
        <div className="md:m-6 m-4 grid gap-5 ">
          <div className="flex gap-2">
            <CircleCheckBig className="text-green-700 w-5" />
            <div>
              <h1 className="font-medium">Profile Complete</h1>
              <p className="text-sm text-zinc-500">
                Your profile information is complete.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <CircleCheckBig className="text-green-700 w-5" />
            <div>
              <h1 className="font-medium">Score Generated</h1>
              <p className="text-sm text-zinc-500">
                Your credit score has been calculated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedCreditLimit;
