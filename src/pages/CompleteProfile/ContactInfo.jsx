import React from "react";

const ContactInfo = ({ register, errors }) => (
  <div className="space-y-4 text-sm font-medium">
    <h1 className="text-[#4B1E2F] text-md font-semibold mb-4">Contact Information</h1>
    <div>
      <label>Address</label>
      <input
        {...register("address", { required: true })}
        placeholder="Address"
        className="w-full border-2 border-zinc-300 rounded-md p-3.5 mt-2"
      />
      {errors.address && <p className="text-red-500 text-sm">Required</p>}
    </div>
    <div className="grid grid-cols-3 gap-4">
      <div className="grid gap-1">
        <label>City</label>
        <input
          {...register("city", { required: true })}
          placeholder="City"
          className="w-full border-2 border-zinc-300 rounded-md p-3.5 mt-2"
        />
        {errors.city && <p className="text-red-500 text-sm">Required</p>}
      </div>
      <div className="grid gap-1">
        <label>State</label>
        <input
          {...register("state", { required: true })}
          placeholder="State"
          className="w-full border-2 border-zinc-300 rounded-md p-3.5 mt-2"
        />
        {errors.state && <p className="text-red-500 text-sm">Required</p>}
      </div>
      <div className="grid gap-1">
        <label>Zip</label>
        <input
          {...register("zipCode", { required: true })}
          placeholder="Zip Code"
          className="w-full border-2 border-zinc-300 rounded-md p-3.5 mt-2"
        />
        {errors.zipCode && <p className="text-red-500 text-sm">Required</p>}
      </div>
    </div>
  </div>
);

export default ContactInfo;
