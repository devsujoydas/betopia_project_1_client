import React, { useState } from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../../AuthProvider/AuthProvider";

import AccountSidebar from "./AccountSidebar";
import PersonalInfo from "./PersonalInfo";
import SecuritySettings from "./SecuritySettings";
import LoanStatus from "./LoanStatus";

const Account = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] min-h-[80dvh] w-full">
      <Toaster position="top-right" />

      <div className="max-w-screen-2xl mx-auto px-4 py-10 md:py-26">
        <div className="md:pb-14 pb-5">
          <h1 className="md:text-3xl text-xl font-medium">Account Settings</h1>
          <p className="text-zinc-500 mt-2 md:text-[14px] text-sm">
            Manage your account preferences and information
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <AccountSidebar
            user={user}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:w-8/12 bg-white shadow-md flex flex-col gap-4 border border-zinc-200 rounded-lg h-fit"
          >
            {activeTab === "personal" && <PersonalInfo user={user} />}
            {activeTab === "security" && <SecuritySettings />}
            {activeTab === "loan" && <LoanStatus />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Account;
