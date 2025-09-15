import React from "react";

const ProgressBar = ({ value, max, color }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        className="h-3 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%`, backgroundColor: color }}
      />
    </div>
  );
};

const YourCreditScore = () => {
  const factors = [
    { label: "Annual Income (FCFA)", value: 30, max: 30, color: "#16A34A" }, // green-600
    { label: "Electricity Bill (FCFA)", value: 25, max: 30, color: "#2563EB" }, // blue-600
    { label: "Mobile Money Balance (FCFA)", value: 20, max: 30, color: "#4B1E2F" }, // custom brand color
  ];

  return (
    <div className=" rounded-lg overflow-hidden bg-white shadow">
      {/* Header */}
      <div className="flex justify-between items-center rounded-t-lg p-6 bg-[#F5F5F5]">
        <h3 className="font-medium text-[18px]">Your Credit Score</h3>
        <p className="text-sm text-zinc-600">Updated today</p>
      </div>

      {/* Body */}
      <div className="p-10">
        {/* Score Section */}
        <div className="text-center">
          <span className="text-green-800 bg-emerald-300 px-4 py-1 rounded-full font-medium mb-5 inline-block">
            Excellent
          </span>
          <h1 className="font-medium text-5xl">95</h1>
          <p className="mt-10 text-gray-700">
            Your credit score is in the excellent range. This indicates
            excellent creditworthiness.
          </p>
        </div>

        <hr className="my-14" />

        {/* Factors */}
        <div className="text-primary">
          <h1 className="text-center text-xl font-medium mb-10">
            Factors affecting your score
          </h1>

          <div className="space-y-6">
            {factors.map((factor, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-700">
                    {factor.label}
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {factor.value}/{factor.max}
                  </p>
                </div>
                <ProgressBar
                  value={factor.value}
                  max={factor.max}
                  color={factor.color}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourCreditScore;
