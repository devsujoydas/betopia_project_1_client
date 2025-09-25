import React from "react";
import {
  Shield,
  TrendingUp,
  User,
  Globe,
  Award,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";
import { motion } from "framer-motion";
import HeadingPart from "../Home/HeadingPart";

const CoreValueCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="border border-zinc-300 transition-all duration-500 hover:shadow-lg space-y-4 py-8 px-6 rounded-md text-center sm:text-left bg-white"
    >
      <div className="bg-[#EDE9EA] w-fit p-3 rounded-full mx-auto sm:mx-0">
        <Icon className="w-6 h-6 text-[#4B1E2F]" />
      </div>
 
      <h1 className="text-lg sm:text-xl text-[#4B1E2F] font-semibold">
        {title}
      </h1>
 
      <p className="font-light text-sm sm:text-base text-gray-700 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};
 
const OurCoreValues = () => {
  const coreValuesData = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description:
        "We believe in complete transparency in our scoring models and lending processes, building trust with both clients and lenders.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description:
        "We continuously innovate our platform and scoring models to provide the most accurate and fair assessment of creditworthiness.",
    },
    {
      icon: User,
      title: "Client-Centered",
      description:
        "We put our clients' needs first, ensuring they have control over their data and receive fair treatment from lenders.",
    },
    {
      icon: Globe,
      title: "Inclusivity",
      description:
        "We're committed to creating financial opportunities for underserved communities and businesses across diverse industries.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for excellence in all aspects of our platform, from user experience to the accuracy of our credit scoring algorithms.",
    },
    {
      icon: ChartNoAxesColumnIncreasing,
      title: "Social Impact",
      description:
        "We measure our success not just by profits, but by the positive impact we make on individuals, businesses, and communities.",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-5 md:py-20 space-y-6 md:space-y-20">
    
      <HeadingPart
        title={"Our Core Values"}
        desc={"The principles that guide everything we do at GUEHI AND CO"}
      />
 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {coreValuesData.map((item, index) => (
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

export default OurCoreValues;
