import React from "react";

const CoreValueCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="border border-zinc-300 transition-all duration-500 hover:shadow-lg space-y-4 py-8 px-6 rounded-md text-center sm:text-left">
      {/* Dynamic Icon */}
      <div className="bg-[#EDE9EA] w-fit p-3 rounded-full mx-auto sm:mx-0">
        <Icon className="w-6 h-6 text-[#4B1E2F]" />
      </div>

      {/* Dynamic Title */}
      <h1 className="text-lg sm:text-xl text-[#4B1E2F] font-semibold">
        {title}
      </h1>

      {/* Dynamic Description */}
      <p className="font-light text-sm sm:text-base text-gray-700 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default CoreValueCard;
