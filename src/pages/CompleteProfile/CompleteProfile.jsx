import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Check } from "lucide-react";
import api from "../../utils/api";

const steps = [
  { id: 1, label: "Personal" },
  { id: 2, label: "Contact" },
  { id: 3, label: "Financial" },
];

const CompleteProfile = () => {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = {};
      if (step === 1) {
        payload.personalInfo = {
          firstName: data.firstName,
          lastName: data.lastName,
          dob: data.dob,
          gender: data.gender,
        };
        await api.put("/users/update-profile", payload);
        toast.success("Personal Info updated successfully!");
        setStep(2);
      } else if (step === 2) {
        payload.contactInfo = {
          address: data.address,
          city: data.city,
          state: data.state,
          zip: data.zip,
        };
        await api.put("/users/update-profile", payload);
        toast.success("Contact Info updated successfully!");
        setStep(3);
      } else if (step === 3) {
        payload.financialInfo = {
          annualIncome: data.annualIncome,
          landValue: data.landValue,
          electricityBill: data.electricityBill,
          mobileMoney: data.mobileMoney,
          existingLoan: data.existingLoan,
          shareData: data.shareData,
        };
        await api.put("/users/update-profile", payload);
        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="flex justify-center items-center h-[100dvh]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="rounded-2xl border border-zinc-200 shadow-md p-8 xl:w-[1000px] w-full"
      >
        <Toaster position="top-right" />
        <h1 className="text-2xl font-bold text-[#4B1E2F] mb-2">
          Complete Your Profile
        </h1>
        <p className="text-gray-600 mb-6">
          Please provide accurate information to get the most accurate credit
          rating
        </p>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-10 relative">
          {steps.map((s, idx) => (
            <div
              key={s.id}
              className="flex-1 flex flex-col items-center relative"
            >
              {/* Circle */}
              <div
                className={`w-10 h-10  rounded-full flex items-center justify-center 
                  ${
                    step > s.id
                      ? "bg-[#4B1E2F] text-white"
                      : step === s.id
                      ? "border-2 bg-white border-[#4B1E2F] text-[#4B1E2F]"
                      : "border-2 bg-[#83787c] border-gray-300 text-gray-200"
                  }`}
              >
                {step > s.id ? <Check size={18} /> : s.id}
              </div>

              {/* Label */}
              <p
                className={`text-sm mt-2 ${
                  step >= s.id ? "text-[#4B1E2F]" : "text-gray-400"
                }`}
              >
                {s.label}
              </p>

              {/* Progress line */}
              {idx < steps.length - 1 && (
                <div
                  className={`absolute top-5 left-1/2 w-full h-0.5 -z-10 ${
                    step > s.id ? "bg-[#4B1E2F]" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1 */}
          {step === 1 && (
            <div className="text-sm">
              <h1 className="text-[#4B1E2F] text-md font-semibold mb-4">
                Personal Information
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">First Name</label>
                  <input
                    {...register("firstName", { required: true })}
                    className="border outline-none w-full p-3 rounded-md mt-1"
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>
                <div>
                  <label className="text-sm">Last Name</label>
                  <input
                    {...register("lastName", { required: true })}
                    className="border outline-none w-full p-3 rounded-md mt-1"
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>
                <div>
                  <label className="text-sm">Date of Birth</label>
                  <input
                    {...register("dob", { required: true })}
                    type="date"
                    className="border outline-none w-full p-3 rounded-md mt-1"
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>
                <div>
                  <label className="text-sm">Gender</label>
                  <select
                    {...register("gender", { required: true })}
                    className="border outline-none w-full p-3 rounded-md mt-1"
                  >
                    <option value="">Select</option>
                    <option>male</option>
                    <option>female</option>
                    <option>other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-4 text-sm font-medium">
              <h1 className="text-[#4B1E2F] text-md font-semibold mb-4">
                Contact Information
              </h1>
              <div>
                <label className="">Address</label>
                <input
                  {...register("address", { required: true })}
                  placeholder="Address"
                  className="border w-full p-3 rounded-md mt-1"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-1">
                  <label className="">City</label>
                  <input
                    {...register("city", { required: true })}
                    placeholder="City"
                    className="border p-3 rounded-md"
                  />
                </div>
                <div className="grid gap-1">
                  <label className="">State</label>
                  <input
                    {...register("state", { required: true })}
                    placeholder="State"
                    className="border p-3 rounded-md"
                  />
                </div>
                <div className="grid gap-1">
                  <label className="">Zip</label>
                  <input
                    {...register("zip", { required: true })}
                    placeholder="Zip"
                    className="border p-3 rounded-md"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <h1 className="text-[#4B1E2F] text-md font-semibold mb-4">
                Financial Information
              </h1>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium">Annual Income (FCFA)</label>
                  <input
                    {...register("annualIncome", { required: true })}
                    className="border w-full p-3 rounded-md mt-1"
                  />
                  {errors.annualIncome && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Land Value of Ownership (FCFA)</label>
                  <input
                    {...register("landValue", { required: true })}
                    className="border w-full p-3 rounded-md mt-1"
                  />
                  {errors.landValue && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Electricity Bill (FCFA)</label>
                  <input
                    {...register("electricityBill", { required: true })}
                    className="border w-full p-3 rounded-md mt-1"
                  />
                  {errors.electricityBill && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Mobile Money Balance (FCFA)</label>
                  <input
                    {...register("mobileMoney", { required: true })}
                    className="border w-full p-3 rounded-md mt-1"
                  />
                  {errors.mobileMoney && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>
              </div>

              <div className="flex gap-4 items-center mt-2">
                <label className="text-sm font-medium">Existing Loan:</label>
                <label>
                  <input
                    type="radio"
                    value="Yes"
                    {...register("existingLoan")}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    value="No"
                    {...register("existingLoan")}
                  />{" "}
                  No
                </label>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" {...register("shareData")} />
                <p className="text-sm text-gray-700">
                  I agree to share my data to process my credit score
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <p
                className="text-gray-400 cursor-pointer"
                onClick={() => setStep(step - 1)}
              >
                &lt; Back
              </p>
            )}
            <button
              type="submit"
              className="bg-[#4B1E2F] text-white py-2 px-6 rounded-lg hover:bg-[#3a1826] transition"
            >
              {step === 3 ? "Submit" : "Next"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CompleteProfile;
