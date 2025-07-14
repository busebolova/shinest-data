"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

interface LoadingScreenProps {
  onComplete?: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          if (onComplete) {
            setTimeout(onComplete, 500)
          }
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 bg-[#f5f3f0] flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 0.5, delay: progress >= 100 ? 0.5 : 0 }}
    >
      <div className="text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative w-24 h-24 mx-auto mb-4">
            <Image src="/images/shinest-logo.png" alt="SHINEST" fill className="object-contain" />
          </div>
          <h1 className="font-display text-4xl text-[#c4975a] font-bold">SHINEST</h1>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-[#c4975a] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Progress Text */}
        <motion.p
          className="mt-4 text-[#c4975a] font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {progress}%
        </motion.p>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
