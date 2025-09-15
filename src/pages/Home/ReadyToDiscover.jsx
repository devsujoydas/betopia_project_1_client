import React from "react";
import { motion } from "framer-motion";

const ReadyToDiscover = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[#DBCBB9] max-w-screen-2xl mx-auto rounded-3xl py-20 mt-10 mb-30 text-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="space-y-5"
      > 
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-semibold text-primary"
        >
          Ready to discover your credit potential?
        </motion.h1>
 
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Get your credit score now and see what credit limit you qualify for.{" "}
          <br />
          It's quick, free, and completely transparent.
        </motion.p>
 
        <button className="btn-primary">
          Get Your Credit Score
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ReadyToDiscover;
