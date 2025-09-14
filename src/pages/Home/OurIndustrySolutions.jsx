import React from "react";
import { Hammer, WalletMinimal, Sprout, Music, Cpu, Users } from "lucide-react";
import { motion } from "framer-motion";
import HeadingPart from "./HeadingPart";

// Card Component
const CoreValueCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="border border-zinc-300 transition-all duration-500 hover:shadow-lg space-y-4 py-8 px-6 rounded-md text-center sm:text-left bg-white"
    >
      {/* Icon */}
      <div className="bg-[#EDE9EA] w-fit p-3 rounded-md mx-auto sm:mx-0">
        <Icon className="w-6 h-6 text-[#4B1E2F]" />
      </div>

      {/* Title */}
      <h1 className="text-lg sm:text-xl text-[#4B1E2F] font-semibold">
        {title}
      </h1>

      {/* Description */}
      <p className="font-light text-sm sm:text-base text-gray-700 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

// Main Component
const OurIndustrySolutions = () => {
  const outIndustrySolutionData = [
    {
      icon: Hammer,
      title: "Building & Construction",
      description:
        "Specialized financing solutions for construction projects, equipment purchase, and property development with flexible terms tailored to project timelines.",
    },
    {
      icon: WalletMinimal,
      title: "DeFi & Fintech",
      description:
        "Cutting-edge decentralized finance solutions combining traditional lending models with blockchain technology for faster, more secure transactions.",
    },
    {
      icon: Sprout,
      title: "Agriculture",
      description:
        "Customized financing for farmers and agribusinesses, considering seasonal cash flows and providing loans for equipment, land acquisition, and operational costs.",
    },
    {
      icon: Music,
      title: "Event & Entertainment",
      description:
        "Short-term financing solutions for event organizers and entertainment companies, with quick approval processes and specialized risk assessment models.",
    },
    {
      icon: Cpu,
      title: "Data & Technology",
      description:
        "Innovative financing for tech startups and data-driven companies, with IP-backed loan options and growth-focused lending solutions for scaling operations.",
    },
    {
      icon: Users,
      title: "Social Impact",
      description:
        "We measure our success not just by profits, but by the positive impact we make on individuals, businesses, and communities.",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-5 md:py-20 space-y-6 md:space-y-20">
      {/* Header */}
      <HeadingPart
        title={"Our Industry Solutions"}
        desc={
          "We provide specialized lending solutions across multiple industries,tailored to meet the unique needs of each sector"
        }
      />

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {outIndustrySolutionData.map((item, index) => (
          <CoreValueCard
            key={index}
            index={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default OurIndustrySolutions;
