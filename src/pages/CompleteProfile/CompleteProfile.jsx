import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import api from "../../utils/api";

const steps = ["Personal", "Contact", "Financial"];

const ProfileCompletion = () => {
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
        setStep(2);
      } else if (step === 2) {
        payload.contactInfo = {
          address: data.address,
          city: data.city,
          state: data.state,
          zip: data.zip,
        };
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

        await api.post("/api/users/update", payload);
        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error");
    }
  };

  const renderProgress = () => (
    <div className="flex items-center justify-between mb-8 relative">
      {steps.map((label, index) => {
        const current = index + 1;
        const isCompleted = step > current;
        const isActive = step === current;

        return (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full text-white 
                ${isCompleted ? "bg-green-500" : isActive ? "bg-[#4B1E2F]" : "bg-gray-300"}`}
            >
              {isCompleted ? "✓" : current}
            </div>
            <p
              className={`text-sm mt-2 ${
                isActive ? "text-[#4B1E2F] font-semibold" : "text-gray-500"
              }`}
            >
              {label}
            </p>
            {index < steps.length - 1 && (
              <div
                className={`absolute -z-10 top-5 left-[calc(33.3%*${index + 1})] w-1/3 h-0.5 
                ${step > current ? "bg-green-500" : "bg-gray-300"}`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );

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
          Please provide accurate information to get the most accurate credit rating
        </p>

        {renderProgress()}

        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-sm">First Name</label>
                <input
                  className="border w-full p-3 rounded-md mt-1"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && <p className="text-red-500 text-sm">Required</p>}
              </div>
              <div>
                <label className="font-semibold text-sm">Last Name</label>
                <input
                  className="border w-full p-3 rounded-md mt-1"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && <p className="text-red-500 text-sm">Required</p>}
              </div>
              <div>
                <label className="font-semibold text-sm">Date of Birth</label>
                <input
                  type="date"
                  className="border w-full p-3 rounded-md mt-1"
                  {...register("dob", { required: true })}
                />
                {errors.dob && <p className="text-red-500 text-sm">Required</p>}
              </div>
              <div>
                <label className="font-semibold text-sm">Gender</label>
                <select
                  className="border w-full p-3 rounded-md mt-1"
                  {...register("gender", { required: true })}
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm">Required</p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="font-semibold text-sm">Address</label>
                <input
                  className="border w-full p-3 rounded-md mt-1"
                  {...register("address", { required: true })}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <input
                  placeholder="City"
                  className="border p-3 rounded-md"
                  {...register("city", { required: true })}
                />
                <input
                  placeholder="State"
                  className="border p-3 rounded-md"
                  {...register("state", { required: true })}
                />
                <input
                  placeholder="Zip"
                  className="border p-3 rounded-md"
                  {...register("zip", { required: true })}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[#4B1E2F] mb-4">Financial Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-sm">Annual Income (FCFA)</label>
                  <input
                    className="border w-full p-3 rounded-md mt-1"
                    {...register("annualIncome", { required: true })}
                  />
                  {errors.annualIncome && <p className="text-red-500 text-sm">Required</p>}
                </div>
                <div>
                  <label className="font-semibold text-sm">Value of Land Ownership (FCFA)</label>
                  <input
                    className="border w-full p-3 rounded-md mt-1"
                    {...register("landValue", { required: true })}
                  />
                  {errors.landValue && <p className="text-red-500 text-sm">Required</p>}
                </div>
                <div>
                  <label className="font-semibold text-sm">Electricity Bill (FCFA)</label>
                  <input
                    className="border w-full p-3 rounded-md mt-1"
                    {...register("electricityBill", { required: true })}
                  />
                  {errors.electricityBill && <p className="text-red-500 text-sm">Required</p>}
                </div>
                <div>
                  <label className="font-semibold text-sm">Mobile Money Balance (FCFA)</label>
                  <input
                    className="border w-full p-3 rounded-md mt-1"
                    {...register("mobileMoney", { required: true })}
                  />
                  {errors.mobileMoney && <p className="text-red-500 text-sm">Required</p>}
                </div>
              </div>

              <div className="flex gap-4 items-center mt-2">
                <label className="font-semibold">Existing Loan:</label>
                <label>
                  <input type="radio" value="Yes" {...register("existingLoan")} /> Yes
                </label>
                <label>
                  <input type="radio" value="No" {...register("existingLoan")} /> No
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
              <p className="text-gray-400 cursor-pointer" onClick={() => setStep(step - 1)}>
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

export default ProfileCompletion;
