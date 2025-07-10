"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useQuoteForm } from "@/contexts/quote-form-context"
import Image from "next/image"

// Animated text component for letter-by-letter animation
function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
  const letters = text.split("")

  return (
    <span className="inline-block">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -90, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.05,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  )
}

export function TextSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { openQuoteForm } = useQuoteForm()

  return (
    <section ref={ref} className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Handwriting Style Text */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 1.0, delay: 0.2 }}
        >
          <div className="relative">
            <Image
              src="/images/mekanlariniz-text.png"
              alt="Mekanlarınız Yaşamınıza Işık Tutar"
              width={300}
              height={120}
              className="opacity-80"
            />
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl">
          {/* Large Animated Text */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#15415b] leading-tight mb-6">
              <AnimatedText text="Hayallerinizle" delay={0.9} />
              <br />
              <AnimatedText text="Buluşturalım" delay={1.4} />
            </h2>
          </motion.div>

          {/* Description */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 2.0 }}
          >
            <p className="font-sans text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              Her proje, benzersiz bir hikaye anlatır. Biz de sizin hikayanizi en güzel şekilde yaşam alanlarınıza
              yansıtıyoruz.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 2.4 }}
          >
            <button
              onClick={openQuoteForm}
              className="font-display bg-[#4285f4] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#3367d6] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Teklif Al
            </button>
          </motion.div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 right-8 w-32 h-32 bg-[#c4975a] rounded-full opacity-5" />
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-[#15415b] rounded-full opacity-5" />
      </div>
    </section>
  )
}

export default TextSection
