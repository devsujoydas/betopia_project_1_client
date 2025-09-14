import React from 'react'
import { motion } from "framer-motion";

const HeadingPart = ({title, desc}) => {
  return (
     <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center w-full"
      >
        <h1 className="text-2xl md:text-5xl font-semibold">{title}</h1>
        <p className="font-light text-sm md:text-lg mt-2 md:mt-4">
          {desc}
        </p>
      </motion.div>
  )
}

export default HeadingPart