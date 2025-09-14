import { motion } from "framer-motion";
import { User, LockIcon, LogOut, DollarSign } from "lucide-react";
import useSignOut from "../../hooks/useSignOut";

const AccountSidebar = ({ user, activeTab, setActiveTab }) => {
  const signOut = useSignOut();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="md:w-4/12 h-fit bg-white rounded-lg shadow flex flex-col items-center space-y-4"
    >
      <div className="flex w-full items-center gap-4 px-6 pt-4">
        <img
          src={"/default.jpg"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold text-xl mb-1">
            {user?.personalInfo.firstName} {user?.personalInfo.lastName}
          </h2>
          <p className="text-sm text-zinc-500">{user?.email}</p>
        </div>
      </div>

      <div className="w-full flex flex-col space-y-2 p-6 border-t border-zinc-200">
        <button
          onClick={() => setActiveTab("personal")}
          className={`px-4 py-3 rounded-md text-left flex items-center gap-2 border-2 transition-all ${
            activeTab === "personal"
              ? "bg-[#EDE9EA] border-[#bebebe]"
              : "hover:bg-zinc-100 border-transparent"
          }`}
        >
          <User /> Personal Information
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`px-4 py-3 rounded-md text-left flex items-center gap-2 border-2 transition-all ${
            activeTab === "security"
              ? "bg-[#EDE9EA] border-[#bebebe]"
              : "hover:bg-zinc-100 border-transparent"
          }`}
        >
          <LockIcon /> Security
        </button>

        <button
          onClick={() => setActiveTab("loan")}
          className={`px-4 py-3 rounded-md text-left flex items-center gap-2 border-2 transition-all ${
            activeTab === "loan"
              ? "bg-[#EDE9EA] border-[#bebebe]"
              : "hover:bg-zinc-100 border-transparent"
          }`}
        >
          <DollarSign/> Loan Status
        </button>

        <hr className="text-zinc-200" />

        <button
          onClick={signOut}
          className="px-4 py-3 rounded text-left text-red-500 hover:bg-red-100 flex items-center gap-2 transition-all"
        >
          <LogOut /> Sign Out
        </button>
      </div>
    </motion.div>
  );
};

export default AccountSidebar;
