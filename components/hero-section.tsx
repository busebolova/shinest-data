"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useContent } from "@/hooks/use-content"

export function HeroSection() {
  const { content, loading } = useContent("home")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#f5f3f0]">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded w-96 mb-4"></div>
        </div>
      </section>
    )
  }

  const heroData = content?.hero || {
    title: "SHINEST",
    image: "/images/hero-image.png",
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#f5f3f0] pt-20">
      {/* Container for the layout */}
      <div className="relative w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
        {/* Large SHINEST Letters */}
        <div className="relative z-30 flex items-center justify-center w-full mb-8">
          <motion.div
            className="font-display text-[25vw] sm:text-[22vw] md:text-[18vw] lg:text-[15vw] xl:text-[12vw] leading-[0.75] tracking-[0.02em] flex justify-center items-center text-[#c4975a] font-bold"
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -100, scale: 0.8 }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 100,
              damping: 12,
            }}
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              fontFamily: "Didot, serif",
            }}
          >
            {heroData.title || "SHINEST"}
          </motion.div>
        </div>

        {/* Interior Image - Positioned below and covering about half of the letters */}
        <motion.div
          className="relative -mt-[12vw] sm:-mt-[10vw] md:-mt-[8vw] lg:-mt-[6vw] xl:-mt-[5vw] z-20 flex justify-center w-full"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={isLoaded ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 50 }}
          transition={{
            duration: 1.8,
            delay: 1.0,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <div className="w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[45vw] h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] relative rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={heroData.image || "/images/hero-image.png"}
              alt="SHINEST Interior Design"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 80vw, (max-width: 768px) 70vw, (max-width: 1024px) 60vw, (max-width: 1280px) 50vw, 45vw"
            />
            {/* Subtle overlay for better integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </motion.div>

        {/* Minimal decorative elements */}
        <motion.div
          className="absolute top-1/4 left-8 w-2 h-2 bg-[#c4975a] rounded-full opacity-40"
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isLoaded
              ? {
                  opacity: [0, 0.4, 0.7, 0.4],
                  scale: [0, 1, 1.2, 1],
                }
              : { opacity: 0, scale: 0 }
          }
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-12 w-1.5 h-1.5 bg-[#d4a76a] rounded-full opacity-30"
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isLoaded
              ? {
                  opacity: [0, 0.3, 0.6, 0.3],
                  scale: [0, 1, 1.3, 1],
                }
              : { opacity: 0, scale: 0 }
          }
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2.5,
          }}
        />
      </div>
    </section>
  )
}

export default HeroSection
