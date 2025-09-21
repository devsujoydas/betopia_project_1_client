import React from "react";
import YourCreditScore from "./YourCreditScore";
import SuggestedCreditLimit from "./SuggestedCreditLimit";
import { useAuth } from "../../AuthProvider/AuthProvider";
import RecentActivity from "./RecentActivity";
import FinancialSummary from "./FinancialSummary";
import { motion } from "framer-motion";
const ClientDashBoard = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="bg-[#F9FAFB]">
      <div className="max-w-screen-2xl mx-5 xl:mx-auto py-10 md:py-20">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl text-primary font-medium"
        >
          {`${user.personalInfo.firstName} ${user.personalInfo.lastName}`} –
          Dashboard
        </motion.h1>

        <div className="grid gap-8">
          <div className="flex md:flex-row flex-col gap-8 mt-16">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="md:w-2/3 border border-zinc-200 rounded-lg shadow-lg overflow-hidden bg-white "
            >
              <YourCreditScore />
            </motion.div>
            <div className="md:w-1/3 ">
              <SuggestedCreditLimit />
            </div>
          </div>

          <FinancialSummary />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default ClientDashBoard;
