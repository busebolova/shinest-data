"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const shinestLetters = "SHINEST".split("")

  // Static hero image
  const heroImage = "/images/hero-main.png"

  useEffect(() => {
    // Component mount olduğunda basit bir delay ile yüklenmiş olarak işaretle
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 800) // Videodaki gibi daha yumuşak başlangıç

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 md:pt-32 lg:pt-40">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[#f5f3f0] z-0" />

      <div className="w-full relative z-10 flex flex-col items-center justify-center px-4">
        {/* Main Layout Container - Perfectly Centered */}
        <div className="relative w-full flex flex-col items-center justify-center">
          {/* Large SHINEST Text - Tek satır, yukarıdan aşağıya harf animasyonu */}
          <div className="relative z-30 flex items-center justify-center mb-2 md:mb-4 w-full">
            <div className="font-display text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw] xl:text-[10vw] text-[#c4975a] leading-[0.7] tracking-[-0.03em] drop-shadow-lg text-center flex justify-center">
              {shinestLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, y: -100, scale: 0.8 }}
                  animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -100, scale: 0.8 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.2 + index * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Single Center Image - Videodaki gibi yumuşak scale animasyon */}
          <motion.div
            className="relative -mt-5 sm:-mt-9 md:-mt-10 lg:-mt-11 xl:-mt-12 flex justify-center w-full"
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={isLoaded ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 50 }}
            transition={{
              duration: 1.8,
              delay: 1.0,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <div className="w-[70vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[35vw] h-[50vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh] xl:h-[80vh] relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src={heroImage || "/placeholder.svg"}
                alt="Luxury Interior Design"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 70vw, (max-width: 768px) 60vw, (max-width: 1024px) 50vw, (max-width: 1280px) 40vw, 35vw"
              />
            </div>
          </motion.div>
        </div>

        {/* Minimal Floating Elements */}
        <motion.div
          className="absolute top-1/4 left-4 sm:left-8 w-1 h-1 bg-[#c4975a] rounded-full opacity-40"
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isLoaded
              ? {
                  opacity: [0, 0.4, 0.8, 0.4],
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
          className="absolute bottom-1/3 right-6 sm:right-12 w-1 h-1 bg-[#8b7355] rounded-full opacity-30"
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
