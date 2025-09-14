
import { motion } from "framer-motion";

const fadeIn = (direction = "up", delay = 0) => {
  return {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, delay },
    },
  };
};


export const OurVision = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-5 md:py-20 flex flex-col-reverse md:flex-row items-center gap-10">
      {/* Text */}
      <motion.div
        className="w-full md:w-1/2 grid gap-4"
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <p className="bg-[#D6CED2] w-fit rounded-full px-4 py-2 text-xs font-semibold text-zinc-600">
          Our Vision
        </p>
        <h1 className="font-semibold text-2xl md:text-3xl">
          Reimagining Financial Relationships
        </h1>
        <p className="text-base md:text-lg font-light text-gray-700">
          We envision a world where lending decisions are based on
          comprehensive, fair assessments rather than limited credit histories.
          Our platform aims to be the global standard for connecting qualified
          borrowers with the right lenders across multiple industries, creating
          mutual value and trust.
        </p>
      </motion.div>

      {/* Image */}
      <motion.div
        className="w-full md:w-1/2"
        variants={fadeIn("right", 0.4)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <img
          className="rounded-lg shadow-lg object-cover w-full h-full"
          src="https://img.freepik.com/free-photo/two-businesspeople-shaking-hands-indoors_1423-209.jpg?t=st=1757853321~exp=1757856921~hmac=3e12ce30925db5c1f7cfbe0f1ad520f608cd7d44741945089727b126652ed720&w=1480"
          alt="Our Vision"
        />
      </motion.div>
    </div>
  );
};
