import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import api from "../../utils/api";

import Stepper from "./Stepper";
import PersonalInfo from "./PersonalInfo";
import ContactInfo from "./ContactInfo";
import FinancialInfo from "./FinancialInfo";

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
          zipCode: data.zipCode,
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
    <div className="flex justify-center items-center h-[95dvh]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="rounded-2xl border border-zinc-200 shadow-md p-8 xl:w-[1000px] w-full"
      >
        <Toaster position="top-right" />

     <div className="md:pb-14 pb-5">
          <h1 className="md:text-3xl text-xl font-medium">Complete Your Profile</h1>
          <p className="text-zinc-500 mt-2 md:text-[14px] text-sm">
            Please provide accurate information to get the most accurate credit rating
          </p>
        </div>

        <Stepper steps={steps} currentStep={step} />

        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && <PersonalInfo register={register} errors={errors} />}
          {step === 2 && <ContactInfo register={register} errors={errors} />}
          {step === 3 && <FinancialInfo register={register} errors={errors} />}

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
              className="bg-[#4B1E2F] text-white px-8 py-3 rounded-md hover:bg-white hover:text-[#4B1E2F] border hover:border-black transition-all cursor-pointer"
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
