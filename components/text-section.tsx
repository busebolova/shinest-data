"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/contexts/language-context"

export default function TextSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // SHINEST harfleri için animasyon
  const mainText1 = t("text.main1").split("")
  const mainText2 = t("text.main2").split("")
  const handwritingText = t("text.handwriting").split("")

  return (
    <section ref={ref} className="py-20 bg-[#f9f7f4]">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Text - MEKANLARINIZ YAŞAMINIZA - Yukarıdan gelen harf animasyonu */}
          <motion.div className="mb-0">
            <div className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#15415b] mb-0 leading-tight tracking-tight flex justify-center flex-wrap">
              {mainText1.map((letter, index) => (
                <motion.span
                  key={`text1-${index}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: -50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>
            <div className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#15415b] leading-tight tracking-tight flex justify-center flex-wrap">
              {mainText2.map((letter, index) => (
                <motion.span
                  key={`text2-${index}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: -50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* "IŞIK TUTAR!" text - Directly rendered with fade-in */}
          <motion.div className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#c4975a] leading-none uppercase mt-0 mb-8 md:mb-12 flex justify-center flex-wrap">
            {handwritingText.map((letter, index) => (
              <motion.span
                key={`handwriting-${index}`}
                className="inline-block"
                initial={{ opacity: 0, y: -50, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -50, scale: 0.8 }}
                transition={{
                  duration: 0.6,
                  delay: 1.2 + index * 0.1, // Önceki metinlerden sonra başlaması için gecikme artırıldı
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Description Text */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <p className="font-sans text-lg md:text-xl text-[#2a2a2a] leading-relaxed">{t("text.description")}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
