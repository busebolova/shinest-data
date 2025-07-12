"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f5f3f0] dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <Image
          src="/images/shinest-logo-main.png"
          alt="Shinest Logo"
          width={150}
          height={150}
          className="mb-4 animate-pulse"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="h-1 bg-[#c4975a] rounded-full overflow-hidden"
          style={{ maxWidth: "200px" }}
        />
      </motion.div>
    </div>
  )
}
