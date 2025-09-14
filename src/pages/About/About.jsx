import React from "react";
import OurCoreValues from "./OurCoreValues";
import { OurMission } from "./OurMission";
import { OurVision } from "./OurVision";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div> 
      <div className="bg-[#4B1E2F] md:h-90 h-70 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-3 md:space-y-5 px-4"
        >
          <h1 className="text-2xl md:text-5xl font-medium text-white">
            About GUEHI AND CO
          </h1>
          <p className="text-[#e0dad2] text-sm md:text-lg font-light">
            Transforming the lending industry with transparency, technology, and
            trust
          </p>
        </motion.div>
      </div>

      <OurMission />
      <OurVision />
      <OurCoreValues />
    </div>
  );
};

export default About;
