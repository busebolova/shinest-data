"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useContent } from "@/hooks/use-content"

export function TextSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { content, loading } = useContent("home")

  if (loading) {
    return (
      <section className="py-20 bg-[#f5f3f0]">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-16 bg-gray-200 rounded w-2/3 mx-auto mb-4"></div>
            <div className="h-16 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  const textData = content?.bigText || {
    line1: "MEKANLARINIZ",
    line2: "YAŞAMINIZA",
    line3: "IŞIK TUTAR!",
  }

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-[#f5f3f0] relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative">
        {/* Decorative elements */}
        <motion.div
          className="absolute top-10 left-10 w-3 h-3 bg-[#c4975a] rounded-full opacity-30"
          animate={
            isInView
              ? {
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.2, 1],
                }
              : { opacity: 0.3, scale: 1 }
          }
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-10 right-10 w-2 h-2 bg-[#d4a76a] rounded-full opacity-40"
          animate={
            isInView
              ? {
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.3, 1],
                }
              : { opacity: 0.4, scale: 1 }
          }
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Main Text */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {/* MEKANLARINIZ */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-[#15415b] leading-none tracking-tight"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            {textData.line1}
          </motion.div>

          {/* YAŞAMINIZA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-[#15415b] leading-none tracking-tight"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            {textData.line2}
          </motion.div>

          {/* IŞIK TUTAR! */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative"
          >
            <div
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-[#c4975a] leading-none tracking-tight italic transform -rotate-1"
              style={{
                fontFamily: "Didot, Georgia, serif",
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {textData.line3}
            </div>

            {/* Decorative underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1.2, delay: 1.8 }}
              className="h-1 bg-gradient-to-r from-[#c4975a] to-[#d4a76a] mx-auto mt-4 rounded-full"
              style={{ maxWidth: "300px" }}
            />
          </motion.div>
        </div>

        {/* Floating decorative text elements */}
        <motion.div
          className="absolute top-1/2 left-4 text-[#c4975a]/20 text-sm font-light transform -rotate-12"
          animate={
            isInView
              ? {
                  y: [-10, 10, -10],
                  opacity: [0.2, 0.4, 0.2],
                }
              : { y: 0, opacity: 0.2 }
          }
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          design
        </motion.div>

        <motion.div
          className="absolute top-1/3 right-8 text-[#15415b]/20 text-sm font-light transform rotate-12"
          animate={
            isInView
              ? {
                  y: [10, -10, 10],
                  opacity: [0.2, 0.4, 0.2],
                }
              : { y: 0, opacity: 0.2 }
          }
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          interior
        </motion.div>
      </div>
    </section>
  )
}

export default TextSection
