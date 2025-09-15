import React from "react";
import { CircleCheckBig } from "lucide-react";
import { motion } from "framer-motion";
import HeadingPart from "./HeadingPart";

// Card Component
const CreditTierCard = ({
  title,
  range,
  amount,
  description,
  bulletPoints,
  colors,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="rounded-md shadow-md px-8 py-10 w-full"
      style={{
        background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-medium text-lg">{title}</h1>
        <span
          className="font-medium text-xs px-2 py-1 rounded-full text-gray-800"
          style={{ backgroundColor: colors.highlight }}
        >
          {range}
        </span>
      </div>

      <p className="text-lg font-medium">{amount}</p>
      <p className="text-[16px] font-light text-zinc-700 mt-4">{description}</p>

      <hr className="my-4 border-gray-300" />

      <div className="space-y-3 text-sm text-gray-800">
        {bulletPoints.map((point, i) => (
          <div key={i} className="flex items-start gap-2">
            <CircleCheckBig
              className="w-5 h-5 shrink-0"
              style={{ color: colors.accent }}
            />
            <span>{point}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};


const CreditLimitTiers = () => {
  const creditLimitTiersData = [
    {
      title: "Poor",
      range: "0-39",
      amount: "10,000 FCFA",
      description:
        "Basic credit limit with opportunities to improve your score",
      bulletPoints: ["Limited borrowing capacity", "Higher interest rates"],
      colors: {
        from: "#FEE2E2",
        to: "#FEF2F2",
        highlight: "#FECACA",
        accent: "#DC2626",
      },
    },
    {
      title: "Fair",
      range: "40-59",
      amount: "30,000 FCFA",
      description: "Moderate credit limit with standard terms",
      bulletPoints: [
        "Reasonable borrowing capacity",
        "Standard interest rates",
      ],
      colors: {
        from: "#FFEDD5",
        to: "#FFF7ED",
        highlight: "#FED7AA",
        accent: "#EA580C",
      },
    },
    {
      title: "Good",
      range: "60-79",
      amount: "50,000 FCFA",
      description: "Enhanced credit limit with preferential terms",
      bulletPoints: ["Good borrowing capacity", "Competitive interest rates"],
      colors: {
        from: "#FEF9C3",
        to: "#FEFCE8",
        highlight: "#FEF08A",
        accent: "#CA8A04",
      },
    },
    {
      title: "Excellent",
      range: "80-100",
      amount: "100,000 FCFA",
      description: "Maximum credit limit with premium benefits",
      bulletPoints: ["Maximum borrowing capacity", "Lowest interest rates"],
      colors: {
        from: "#DCFCE7",
        to: "#F0FDF4",
        highlight: "#BBF7D0",
        accent: "#16A34A",
      },
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-10 md:py-20 space-y-10">
      {/* Header */}
      <HeadingPart
        title={"Credit Limit Tiers"}
        desc={
          " Our system suggests credit limits based on your credit score range"
        }
      />

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {creditLimitTiersData.map((tier, index) => (
          <CreditTierCard key={index} {...tier} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CreditLimitTiers;
