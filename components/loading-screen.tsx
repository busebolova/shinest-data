"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { t } = useLanguage()
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [showThickText, setShowThickText] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setShowThickText(true)
            setTimeout(() => {
              setIsExiting(true)
              setTimeout(() => {
                onComplete()
              }, 800)
            }, 1000)
          }, 300)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 bg-[#f5f3f0] flex flex-col items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{
        opacity: isExiting ? 0 : 1,
        y: isExiting ? "-100%" : 0,
      }}
      transition={{
        duration: isExiting ? 0.8 : 1.2,
        ease: isExiting ? [0.22, 1, 0.36, 1] : "easeInOut",
      }}
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo */}
        <motion.div
          className="w-32 h-32 mb-8 mx-auto relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 1.5,
            delay: 0.2,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: {
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
              scale: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
          >
            <Image src="/images/logo1.png" alt="Shinest Logo" fill className="object-contain" priority />
          </motion.div>
        </motion.div>

        {/* Company Name */}
        <motion.h1
          className="font-display text-3xl md:text-4xl text-[#c4975a] text-center mb-2"
          initial={{
            opacity: 0,
            y: 20,
            fontWeight: 100,
          }}
          animate={{
            opacity: 1,
            y: 0,
            fontWeight: showThickText ? 900 : 100,
            textShadow: showThickText ? "0 0 20px rgba(196, 151, 90, 0.3)" : "none",
          }}
          transition={{
            duration: 1,
            delay: 1,
            fontWeight: {
              duration: showThickText ? 2 : 0,
              ease: "easeInOut",
            },
          }}
        >
          {t("hero.company")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-sans font-normal text-xs md:text-sm text-[#8b7355] tracking-[0.2em] uppercase mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Progress Bar */}
        <div className="w-48 h-0.5 bg-[#e8e2d9] rounded-full mx-auto mb-4">
          <motion.div
            className="h-full bg-[#c4975a] rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${progress}%`,
              boxShadow: progress === 100 ? "0 0 10px rgba(196, 151, 90, 0.5)" : "none",
            }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Progress Text */}
        <motion.p
          className="font-sans font-normal text-xs text-[#8b7355]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            fontWeight: showThickText ? 600 : 400,
          }}
          transition={{
            duration: 1,
            delay: 1.5,
            fontWeight: {
              duration: showThickText ? 1.5 : 0,
              ease: "easeInOut",
            },
          }}
        >
          {progress}%
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
