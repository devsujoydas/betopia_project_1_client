import React from "react"; 
import OurCoreValues from "./OurCoreValues";
import { OurMission } from "./OurMission";
import { OurVision } from "./OurVision";

const About = () => {
  return (
    <div>
      <div className="bg-[#4B1E2F] h-90 flex justify-center items-center">
        <div className=" text-center space-y-5">
          <h1 className="text-5xl font-medium text-white">
            About GUEHI AND CO
          </h1>
          <p className="text-[#e0dad2] text-lg font-light">
            Transforming the lending industry with transparency, technology, and
            trust
          </p>
        </div>
      </div>

      <OurMission />
      <OurVision />
      <OurCoreValues />
    </div>
  );
};

export default About;
