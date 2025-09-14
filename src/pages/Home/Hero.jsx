import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="border-2 border-green-500">
      <div className="bg-[#4B1E2F] h-[76dvh] flex items-center">
        <div className="max-w-screen-2xl mx-auto flex flex-col-reverse md:flex-row items-center gap-14 px-5">
          {/* Text Section */}
          <motion.div
            className="text-white w-full md:w-3/5 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="bg-[#5A2F3C] text-[14px] w-fit px-3 py-1 rounded-full font-">
              Trusted by 10,000+ clients and lenders
            </p>
            <h1 className="text-6xl font-semibold leading-tight">
              Revolutionizing{" "}
              <span className="text-[#DBCBB9]">
                Lending <br /> Solutions
              </span>
            </h1>
            <p className="text-lg sm:text-[18px] font-light text-gray-200">
              Our platform helps clients get fair credit ratings and connects
              them with trusted lenders for faster, more transparent lending
              decisions across multiple industries.
            </p>
            <button className="flex items-center gap-2 bg-[#DBCBB9] text-black px-5 py-2 rounded-md  cursor-pointer border border-transparent hover:bg-transparent hover:text-[#DBCBB9] hover:border-[#DBCBB9] transition-all duration-300">
              Get Started as Client <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="w-full md:w-2/5"
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
      <div className="h-[14dvh] bg-white relative">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white max-w-screen-2xl mx-auto border border-zinc-200 p-8 rounded-xl flex justify-center items-center gap-4 shadow-lg"
          >

            {
              [
                {"number":"10K+","text":"Active Users"},
                {"number":"","text":""},
                {"number":"","text":""},
                {"number":"","text":""},
              ]
            }
            <div className="border-r w-full text-center">
              <h1 className="font-semibold text-2xl"></h1>
              <h1 className="text-sm mt-1"></h1>
            </div>
            <div className="border-r w-full text-center">
              <h1 className="font-semibold text-2xl">$2500+</h1>
              <h1 className="text-sm mt-1">Loans Facilitated</h1>
            </div>
            <div className="border-r w-full text-center">
              <h1 className="font-semibold text-2xl">98%+</h1>
              <h1 className="text-sm mt-1">Client Satisfaction</h1>
            </div>
            <div className=" w-full text-center">
              <h1 className="font-semibold text-2xl">5+</h1>
              <h1 className="text-sm mt-1">Industry Verticals</h1>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
