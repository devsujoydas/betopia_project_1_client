
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

export const OurMission = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-10">
      {/* Image */}
      <motion.div
        className="w-full md:w-1/2"
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <img
          className="rounded-lg shadow-lg object-cover w-full h-full"
          src="https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241259.jpg?t=st=1757849982~exp=1757853582~hmac=7d92c9af8e2d81ffeb74f956de83f05f5b018b270bbab57d940bf9b3b0ea70f7&w=1480"
          alt="Our Mission"
        />
      </motion.div>

      {/* Text */}
      <motion.div
        className="w-full md:w-1/2 grid gap-4"
        variants={fadeIn("right", 0.4)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <p className="bg-[#D6CED2] w-fit rounded-full px-4 py-2 text-xs font-semibold text-zinc-600">
          Our Mission
        </p>
        <h1 className="font-semibold text-2xl md:text-3xl">
          Democratizing Access to Fair Credit
        </h1>
        <p className="text-base md:text-lg font-light text-gray-700">
          At GUEHI AND CO, our mission is to create a more inclusive financial
          ecosystem where everyone has access to fair credit opportunities. We
          believe in breaking down barriers between lenders and borrowers
          through transparent, data-driven solutions that benefit both sides of
          the lending equation.
        </p>
      </motion.div>
    </div>
  );
};
