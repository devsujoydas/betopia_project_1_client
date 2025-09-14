import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-[#4B1E2F] min-h-[76vh] flex items-center">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14 px-5 md:px-10 pt-10 pb-20">
          {/* Text Section */}
          <motion.div
            className="text-white w-full lg:w-3/5 space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="bg-[#5A2F3C] text-xs sm:text-sm md:text-[14px] w-fit mx-auto lg:mx-0 px-3 py-1 rounded-full">
              Trusted by 10,000+ clients and lenders
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-snug lg:leading-tight">
              Revolutionizing{" "}
              <span className="text-[#DBCBB9]">
                Lending <br className="hidden sm:block" /> Solutions
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-[18px] font-light text-gray-200 max-w-xl mx-auto lg:mx-0">
              Our platform helps clients get fair credit ratings and connects
              them with trusted lenders for faster, more transparent lending
              decisions across multiple industries.
            </p>
            <div className="flex justify-center lg:justify-start">
              <button className="flex items-center gap-2 bg-[#DBCBB9] text-black px-4 sm:px-5 py-2 rounded-md cursor-pointer border border-transparent hover:bg-transparent hover:text-[#DBCBB9] hover:border-[#DBCBB9] transition-all duration-300">
                Get Started as Client <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="w-full lg:w-2/5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              className="w-full rounded-xl shadow-xl object-cover aspect-[4/3] max-h-[350px] sm:max-h-[450px] md:max-h-[500px] lg:max-h-[600px]"
              src="https://images.pexels.com/photos/5935739/pexels-photo-5935739.jpeg"
              alt="Lending Solutions"
            />
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="h-[14dvh] bg-white relative">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-full px-5 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white max-w-screen-2xl mx-auto border border-zinc-200 p-6 sm:p-8 rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-6 shadow-lg"
          >
            <div className="text-center">
              <h1 className="font-semibold text-xl sm:text-2xl">10K+</h1>
              <h1 className="text-xs sm:text-sm mt-1">Active Users</h1>
            </div>
            <div className="text-center">
              <h1 className="font-semibold text-xl sm:text-2xl">$2500+</h1>
              <h1 className="text-xs sm:text-sm mt-1">Loans Facilitated</h1>
            </div>
            <div className="text-center">
              <h1 className="font-semibold text-xl sm:text-2xl">98%+</h1>
              <h1 className="text-xs sm:text-sm mt-1">Client Satisfaction</h1>
            </div>
            <div className="text-center">
              <h1 className="font-semibold text-xl sm:text-2xl">5+</h1>
              <h1 className="text-xs sm:text-sm mt-1">Industry Verticals</h1>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
