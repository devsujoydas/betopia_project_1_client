import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="bg-[#4B1E2F] h-[80dvh] flex items-center">
      <div className="max-w-screen-2xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 px-5">
        {/* Text Section */}
        <motion.div
          className="text-white w-full md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="bg-[#5A2F3C] text-[14px] w-fit px-3 py-1 rounded-full font-medium">
            Trusted by 10,000+ clients and lenders
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Revolutionizing{" "}
            <span className="text-[#DBCBB9]">
              Lending <br /> Solutions
            </span>
          </h1>
          <p className="text-lg sm:text-[18px] font-light text-gray-200">
            Our platform helps clients get fair credit ratings and connects them
            with trusted lenders for faster, more transparent lending decisions
            across multiple industries.
          </p>
          <button className="flex items-center gap-2 bg-[#DBCBB9] text-black px-5 py-3 rounded-md font-medium border border-transparent hover:bg-transparent hover:text-[#DBCBB9] hover:border-[#DBCBB9] transition-all duration-300">
            Get Started as Client <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            className="w-full rounded-xl shadow-xl object-cover aspect-[4/3] max-h-[500px] sm:max-h-[600px]"
            src="https://images.pexels.com/photos/5935739/pexels-photo-5935739.jpeg"
            alt="Lending Solutions"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
