import React from "react";
import { Check } from "lucide-react";

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between mb-10 relative">
      {steps.map((s, idx) => (
        <div key={s.id} className="flex-1 flex flex-col items-center relative">
          {/* Circle */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center 
              ${currentStep > s.id
                ? "bg-[#4B1E2F] text-white"
                : currentStep === s.id
                ? "border-2 bg-white border-[#4B1E2F] text-[#4B1E2F]"
                : "border-2 bg-[#83787c] border-gray-300 text-gray-200"
              }`}
          >
            {currentStep > s.id ? <Check size={18} /> : s.id}
          </div>

          {/* Label */}
          <p className={`text-sm mt-2 ${currentStep >= s.id ? "text-[#4B1E2F]" : "text-gray-400"}`}>
            {s.label}
          </p>

          {/* Progress line */}
          {idx < steps.length - 1 && (
            <div
              className={`absolute top-5 left-1/2 w-full h-0.5 -z-10 ${
                currentStep > s.id ? "bg-[#4B1E2F]" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
