import { CircleCheckBig, DollarSign } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { motion } from "framer-motion";

const SuggestedCreditLimit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post(
        `/users/loans/apply`,
        { amountRequested: Number(data.amountRequested) },
        { withCredentials: true }
      );

      console.log(res.data);
      toast.success(res.data.message || "Loan application submitted!");
      reset();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <motion.div
      className="grid gap-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Suggested Credit Limit */}
      <motion.div
        className="bg-white border border-zinc-200 rounded-lg shadow-lg overflow-hidden"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center rounded-t-lg p-6 bg-[#F5F5F5]">
          <h3 className="font-medium text-[18px]">Suggested Credit Limit</h3>
        </div>

        <div className="md:m-6 m-4">
          {/* Icon + Score */}
          <div className="flex flex-col justify-center items-center text-center gap-4 md:gap-5">
            <DollarSign className="text-[#4B1E2F] bg-[#EDE9EA] p-2 md:p-4.5 rounded-full w-10 md:w-16 h-10 md:h-16" />
            <h1 className="font-semibold text-xl md:mt-5">FCFA 100,000</h1>
            <p className="md:text-[16px] text-sm">
              Based on your credit score of 95/100
            </p>
          </div>

          {/* Credit Limit Ranges */}
          <div className="p-5 mt-5 md:mt-14 rounded-2xl space-y-5 border border-zinc-300 bg-[#f5f6f8]">
            <h1 className="font-medium md:text-lg text-sm">
              Credit Limit Ranges
            </h1>
            <div className="space-y-5 text-xs md:text-[16px]">
              {[
                { title: "Excellent (80-100):", amount: "FCFA 100,000" },
                { title: "Good (60-79):", amount: "FCFA 50,000" },
                { title: "Fair (40-59):", amount: "FCFA 30,000" },
                { title: "Poor (0-39):", amount: "FCFA 10,000" },
              ].map((data, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <p className="font-light">{data.title}</p>
                  <p className="font-medium">{data.amount}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Loan Application Form */}
          <motion.div
            className="mt-5 space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="checkbox"
                  id="check"
                  {...register("consent", { required: true })}
                />
                <label
                  htmlFor="check"
                  className="md:text-sm text-xs ml-2 cursor-pointer"
                >
                  I agree to share my data with partner financial institutions
                  for my credit application
                </label>
                {errors.consent && (
                  <p className="text-red-500 text-xs mt-1">
                    You must agree before applying
                  </p>
                )}
              </div>

              <div>
                <h1 className="md:text-lg text-sm font-medium">
                  Enter Loan Amount
                </h1>
                <input
                  type="number"
                  placeholder="Enter your amount"
                  className="w-full outline-none placeholder:md:text-sm placeholder:text-xs border-2 border-zinc-300 rounded-md p-3 md:p-3.5 mt-2"
                  {...register("amountRequested", {
                    required: "Loan amount is required",
                    min: {
                      value: 1,
                      message: "Amount must be greater than 0",
                    },
                  })}
                />
                {errors.amountRequested && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.amountRequested.message}
                  </p>
                )}
              </div>

              <div className="flex justify-center items-center mt-5">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* Application Status */}
      <motion.div
        className="bg-white border border-zinc-200 rounded-lg shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="flex items-center rounded-t-lg p-6 bg-[#F5F5F5]">
          <h3 className="font-medium text-[18px]">Application Status</h3>
        </div>
        <div className="md:m-6 m-4 grid gap-5">
          {[
            {
              title: "Profile Complete",
              desc: "Your profile information is complete.",
            },
            {
              title: "Score Generated",
              desc: "Your credit score has been calculated.",
            },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              className="flex gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.3, duration: 0.5 }}
            >
              <CircleCheckBig className="text-green-700 w-5" />
              <div>
                <h1 className="font-medium">{step.title}</h1>
                <p className="text-sm text-zinc-500">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SuggestedCreditLimit;
