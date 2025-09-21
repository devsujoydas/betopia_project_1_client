import { motion } from "framer-motion";
import { User, LockIcon, LogOut, DollarSign, Camera } from "lucide-react";
import useSignOut from "../../hooks/useSignOut";

const AccountSidebar = ({
  user,
  activeTab,
  setActiveTab,
  setShowUploadModal,
}) => {
  const signOut = useSignOut();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="md:w-4/12 h-fit bg-white rounded-lg shadow flex flex-col items-center space-y-4"
    >
      <div className="flex w-full items-center gap-4 px-6 pt-4">
        <div className=" relative">
          <img
            src={user?.personalInfo?.profilePhotoUrl? user?.personalInfo?.profilePhotoUrl : "/default.jpg"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover "
          />
          <button
            onClick={() => setShowUploadModal(true)}
            className="absolute border border-zinc-200 bottom-1 right-1  p-1 rounded-full cursor-pointer bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-100 duration-300 transition-all"
          >
            <Camera className="w-5 h-5" />
          </button>
        </div>
        <div>
          <h2 className="font-semibold text-xl mb-1">
            {user?.personalInfo?.firstName} {user?.personalInfo?.lastName}
          </h2>
          <p className="text-sm text-zinc-500">{user?.email}</p>
        </div>
      </div>

      <div className="w-full flex flex-col space-y-2 p-6 border-t border-zinc-200">
        <button
          onClick={() => setActiveTab("personal")}
          className={`md:px-4 px-3 py-2 md:py-3 rounded-md text-left flex items-center gap-2 border-2 transition-all cursor-pointer ${
            activeTab === "personal"
              ? "bg-[#EDE9EA] border-[#bebebe]"
              : "hover:bg-zinc-100 border-transparent"
          }`}
        >
          <User /> Personal Information
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`md:px-4 px-3 py-2 md:py-3 rounded-md text-left flex items-center gap-2 border-2 transition-all cursor-pointer ${
            activeTab === "security"
              ? "bg-[#EDE9EA] border-[#bebebe]"
              : "hover:bg-zinc-100 border-transparent"
          }`}
        >
          <LockIcon /> Security
        </button>

        <button
          onClick={() => setActiveTab("loan")}
          className={`md:px-4 px-3 py-2 md:py-3 rounded-md text-left flex items-center gap-2 border-2 transition-all cursor-pointer ${
            activeTab === "loan"
              ? "bg-[#EDE9EA] border-[#bebebe]"
              : "hover:bg-zinc-100 border-transparent"
          }`}
        >
          <DollarSign /> Loan Status
        </button>

        <hr className="text-zinc-200" />

        <button
          onClick={signOut}
          className="md:px-4 px-3 py-2 md:py-3 rounded text-left text-red-500 hover:bg-red-100 flex items-center gap-2 transition-all cursor-pointer"
        >
          <LogOut /> Sign Out
        </button>
      </div>
    </motion.div>
  );
};

export default AccountSidebar;
