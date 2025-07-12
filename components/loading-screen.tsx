"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center font-serif">
      <div className="text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <Image
            src="/images/shinest-logo-main.png"
            alt="SHINEST Logo"
            width={200}
            height={200}
            className="w-40 h-40 md:w-50 md:h-50 mx-auto object-contain"
            priority
          />
        </motion.div>

        {/* Title Animation */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-[#15415b] mb-4 tracking-wide"
        >
          SHINEST
        </motion.h1>

        {/* Subtitle Animation */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-xl md:text-2xl text-gray-600 font-light tracking-wider"
        >
          İç Mimarlık
        </motion.p>

        {/* Loading Spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12"
        >
          <div className="w-10 h-10 border-2 border-[#c4975a] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoadingScreen
