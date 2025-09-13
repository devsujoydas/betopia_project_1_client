import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import api from "../../utils/api";
import { Check } from "lucide-react";

export default function CompleteProfile2() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const totalSteps = 3;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        personalInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          dob: data.dob,
          gender: data.gender,
        },
        contactInfo: {
          address: data.address,
          city: data.city,
          state: data.state,
          zip: data.zip,
        },
        financialInfo: {
          income: data.income,
          landValue: data.landValue,
          electricityBill: data.electricityBill,
          mobileMoney: data.mobileMoney,
          existingLoan: data.existingLoan,
          consent: data.consent,
        },
      };

      await api.post("/users/updateProfile", payload);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, label: "Personal" },
    { id: 2, label: "Contact" },
    { id: 3, label: "Financial" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen p-5">
      <Toaster position="top-right" />
      
      <div className="rounded-2xl border border-zinc-200 shadow-md p-10 w-full max-w-[700px] bg-white">
        
        {/* Header */}
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Complete Your Profile
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Please provide accurate information to get the most accurate credit rating
        </p>

          {/* Stepper */}
          <div className="flex items-center justify-between mb-10 relative">
            {steps.map((s, idx) => (
              <div key={s.id} className="flex-1 flex flex-col items-center relative">
                {/* Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${step > s.id ? "bg-[#4B1E2F] text-white" : step === s.id ? "border-2 border-[#4B1E2F] text-[#4B1E2F]" : "border-2 border-gray-300 text-gray-400"}`}
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

        <AnimatePresence mode="wait">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <motion.form
              key="step1"
              onSubmit={handleSubmit(() => setStep(2))}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">First Name</label>
                  <input
                    type="text"
                    className="w-full border p-3 rounded-md"
                    {...register("firstName", { required: "First name is required" })}
                  />
                  {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block font-medium">Last Name</label>
                  <input
                    type="text"
                    className="w-full border p-3 rounded-md"
                    {...register("lastName", { required: "Last name is required" })}
                  />
                  {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName.message}</p>}
                </div>
                <div>
                  <label className="block font-medium">Date of Birth</label>
                  <input
                    type="date"
                    className="w-full border p-3 rounded-md"
                    {...register("dob", { required: "Date of birth is required" })}
                  />
                  {errors.dob && <p className="text-red-600 text-sm">{errors.dob.message}</p>}
                </div>
                <div>
                  <label className="block font-medium">Gender</label>
                  <select
                    className="w-full border p-3 rounded-md"
                    {...register("gender", { required: "Gender is required" })}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-600 text-sm">{errors.gender.message}</p>}
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button type="submit" className="bg-[#4B1E2F] text-white px-6 py-3 rounded-lg">
                  Next
                </button>
              </div>
            </motion.form>
          )}

          {/* Step 2: Contact Info */}
          {step === 2 && (
            <motion.form
              key="step2"
              onSubmit={handleSubmit(() => setStep(3))}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="mb-4">
                <label className="block font-medium">Address</label>
                <input
                  type="text"
                  className="w-full border p-3 rounded-md"
                  {...register("address", { required: "Address is required" })}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium">City</label>
                  <input type="text" className="w-full border p-3 rounded-md" {...register("city")} />
                </div>
                <div>
                  <label className="block font-medium">State</label>
                  <input type="text" className="w-full border p-3 rounded-md" {...register("state")} />
                </div>
                <div>
                  <label className="block font-medium">Zip</label>
                  <input type="text" className="w-full border p-3 rounded-md" {...register("zip")} />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <span onClick={() => setStep(1)} className="text-gray-500 cursor-pointer">
                  &lt; Back
                </span>
                <button type="submit" className="bg-[#4B1E2F] text-white px-6 py-3 rounded-lg">
                  Next
                </button>
              </div>
            </motion.form>
          )}

          {/* Step 3: Financial Info */}
          {step === 3 && (
            <motion.form
              key="step3"
              onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="mb-4">
                <label className="block font-medium">Annual Income (FCFA)</label>
                <input type="number" className="w-full border p-3 rounded-md" {...register("income")} />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Value of Land Ownership (FCFA)</label>
                <input type="number" className="w-full border p-3 rounded-md" {...register("landValue")} />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Electricity Bill (FCFA)</label>
                <input type="number" className="w-full border p-3 rounded-md" {...register("electricityBill")} />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Mobile Money Balance (FCFA)</label>
                <input type="number" className="w-full border p-3 rounded-md" {...register("mobileMoney")} />
              </div>

              <div className="mb-4">
                <label className="block font-medium">Existing Loan</label>
                <div className="flex gap-6 mt-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" value="yes" {...register("existingLoan")} />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" value="no" {...register("existingLoan")} />
                    No
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" {...register("consent", { required: true })} />
                  I agree to share my data to process my credit score
                </label>
                {errors.consent && <p className="text-red-600 text-sm">You must agree to continue</p>}
              </div>

              <div className="flex justify-between">
                <span onClick={() => setStep(2)} className="text-gray-500 cursor-pointer">
                  &lt; Back
                </span>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#4B1E2F] text-white px-6 py-3 rounded-lg disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
