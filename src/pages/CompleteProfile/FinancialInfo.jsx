const FinancialInfo = ({ register, errors }) => (
  <div className="space-y-4 text-sm">
    <h1 className="text-[#4B1E2F] text-md font-semibold mb-4">
      Financial Information
    </h1>

    <div className="grid grid-cols-2 gap-5">
      <div>
        <label className="font-medium">Annual Income (FCFA)</label>
        <input
          type="number"
          {...register("annualIncome", { required: true })}
          className="w-full border-2 border-zinc-300 rounded-md p-3.5 mt-2"
          placeholder="Enter Your Annual Income"
        />
        {errors.annualIncome && <p className="text-red-500">Required</p>}
      </div>

      <div>
        <label className="font-medium">Land Value of Ownership (FCFA)</label>
        <input
          type="number"
          {...register("landValue", { required: true })}
          className="w-full border-2 border-zinc-300 rounded-md p-3.5 mt-2"
          placeholder="Enter Your Land Value"
        />
        {errors.landValue && <p className="text-red-500">Required</p>}
      </div>

      <div>
        <label className="font-medium">Electricity Bill (FCFA)</label>
        <input
          type="number"
          {...register("electricityBill", { required: true })}
          className="w-full border-2 border-zinc-300 rounded-md p-3.5 mt-2"
          placeholder="Enter Your Electricity Bill"
        />
        {errors.electricityBill && <p className="text-red-500">Required</p>}
      </div>

      <div>
        <label className="font-medium">Mobile Money Balance (FCFA)</label>
        <input
          type="number"
          {...register("mobileMoney", { required: true })}
          className="w-full border-2 border-zinc-300 rounded-md p-3.5 mt-2"
          placeholder="Enter Your Mobile Money Balance"
        />
        {errors.mobileMoney && <p className="text-red-500">Required</p>}
      </div>
    </div>

    <div className="flex gap-4 items-center mt-2">
      <label className="font-medium">Existing Loan:</label>
      <label className="cursor-pointer">
        <input type="radio" value="true" {...register("existingLoan")} /> Yes
      </label>
      <label className="cursor-pointer">
        <input type="radio" value="false" {...register("existingLoan")} /> No
      </label>
    </div>

    <div className="flex items-center gap-2 mt-2">
      <input type="checkbox" id="checkbox" {...register("shareData")} />
      <label htmlFor="checkbox" className="text-gray-700 cursor-pointer" >
        I agree to share my data to process my credit score
      </label>
    </div>
  </div>
);

export default FinancialInfo;
