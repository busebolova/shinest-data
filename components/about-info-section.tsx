"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export function AboutInfoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl lg:text-5xl font-bold text-[#15415b] leading-tight"
            >
              SHINEST İç Mimarlık
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-sans text-lg text-gray-600 leading-relaxed"
            >
              SHINEST olarak, yaşam alanlarınızı dönüştüren, size özel tasarım çözümleri sunuyoruz. Her proje,
              müşterilerimizin hayallerini gerçeğe dönüştüren bir yolculuktur.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-sans text-lg text-gray-600 leading-relaxed"
            >
              Deneyimli ekibimiz, modern tasarım anlayışını fonksiyonellikle birleştirerek, yaşam alanlarınıza ışık
              tutar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-4"
            >
              <button className="bg-[#15415b] text-white px-8 py-3 rounded-full hover:bg-[#0f2d3f] transition-colors duration-300 font-sans font-medium">
                Daha Fazla Bilgi
              </button>
            </motion.div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about-section-reference.png"
                alt="SHINEST Hakkımızda"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-[#15415b] rounded-full opacity-80"
              animate={
                isInView
                  ? {
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8],
                    }
                  : { scale: 1, opacity: 0.8 }
              }
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute -bottom-6 -left-6 w-6 h-6 bg-gray-400 rounded-full opacity-60"
              animate={
                isInView
                  ? {
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 0.9, 0.6],
                    }
                  : { scale: 1, opacity: 0.6 }
              }
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutInfoSection
