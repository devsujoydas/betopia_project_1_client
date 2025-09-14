import React from "react";

const FinancialInfo = ({ register, errors }) => (
  <div className="space-y-4 text-sm">
    <h1 className="text-[#4B1E2F] text-md font-semibold mb-4">Financial Information</h1>
    <div className="grid grid-cols-2 gap-5">
      <div>
        <label className=" font-medium">Annual Income (FCFA)</label>
        <input
          {...register("annualIncome", { required: true })}
          className="w-full border-2 border-zinc-300 rounded-md p-3.5 mt-2 "
           placeholder="Enter Your Annual Income (FCFA)"
        />
        {errors.annualIncome && <p className="text-red-500 ">Required</p>}
      </div>
      <div>
        <label className=" font-medium">Land Value of Ownership (FCFA)</label>
        <input
          {...register("landValue", { required: true })}
          className="w-full border-2 border-zinc-300 rounded-md p-3.5 mt-2 "
           placeholder="Enter Your Land Value of Ownership (FCFA)"
        />
        {errors.landValue && <p className="text-red-500 ">Required</p>}
      </div>
      <div>
        <label className=" font-medium">Electricity Bill (FCFA)</label>
        <input
          {...register("electricityBill", { required: true })}
          className="w-full border-2 border-zinc-300 rounded-md p-3.5 mt-2 "
           placeholder="Enter Your Electricity Bill (FCFA)"
        />
        {errors.electricityBill && <p className="text-red-500 ">Required</p>}
      </div>
      <div>
        <label className=" font-medium">Mobile Money Balance (FCFA)</label>
        <input
          {...register("mobileMoney", { required: true })}
          className="w-full border-2 border-zinc-300 rounded-md p-3.5 mt-2 "
           placeholder="Enter Your Mobile Money Balance (FCFA)"
        />
        {errors.mobileMoney && <p className="text-red-500 ">Required</p>}
      </div>
    </div>

    <div className="flex gap-4 items-center mt-2">
      <label className=" font-medium">Existing Loan:</label>
      <label>
        <input type="radio" value="Yes" {...register("existingLoan")} /> Yes
      </label>
      <label>
        <input type="radio" value="No" {...register("existingLoan")} /> No
      </label>
    </div>

    <div className="flex items-center gap-2 mt-2">
      <input type="checkbox" {...register("shareData")} />
      <p className=" text-gray-700">
        I agree to share my data to process my credit score
      </p>
    </div>
  </div>
);

export default FinancialInfo;
