import React from "react";
import { User, Lightbulb, ClipboardCheck, Handshake } from "lucide-react";
import { motion } from "framer-motion";
import HeadingPart from "./HeadingPart";

// Card Component
const StepCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="border border-zinc-300 transition-all duration-500 hover:shadow-lg space-y-4 py-8 px-6 rounded-md text-center sm:text-left bg-white"
    >
      {/* Icon */}
      <div className="bg-[#EDE9EA] w-fit p-3 rounded-full mx-auto sm:mx-0">
        <Icon className="w-6 h-6 text-[#4B1E2F]" />
      </div>

      {/* Title */}
      <h1 className="text-lg sm:text-xl text-[#4B1E2F] font-semibold">{title}</h1>

      {/* Description */}
      <p className="font-light text-sm sm:text-base text-gray-700 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

// Main Component
const HowItWorks = () => {
  // Icon mapping based on step
  const iconMap = {
    "Create Account": User,
    "Fill Data Form": Lightbulb,
    "Get Score & Limit": ClipboardCheck,
    "Connect with Lenders": Handshake,
  };

  const stepsData = [
    {
      title: "Create Account",
      description:
        "Sign up with your basic information to get started on your credit journey.",
    },
    {
      title: "Fill Data Form",
      description:
        "Provide your financial information securely to calculate your credit score.",
    },
    {
      title: "Get Score & Limit",
      description:
        "Receive your credit score and suggested credit limit instantly.",
    },
    {
      title: "Connect with Lenders",
      description:
        "Consent to share your score with trusted lenders to receive loan offers.",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-5 md:py-20 space-y-6 md:space-y-20">
      {/* Header */}
      <HeadingPart title={"How It Works"} desc={"Get your credit score and suggested credit limit in just four simple steps"}/>

      {/* Steps Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stepsData.map((step, index) => {
          const Icon = iconMap[step.title] || User; // fallback
          return <StepCard key={index} index={index} icon={Icon} {...step} />;
        })}
      </div>
    </div>
  );
};

export default HowItWorks;
