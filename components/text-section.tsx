"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/contexts/language-context"

export default function TextSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Mobilde 3 satır için text'leri ayıralım
  const mobileText1 = "MEKANLARINIZ"
  const mobileText2 = "YAŞAMINIZA"
  const mobileText3 = "IŞIK TUTAR!"

  // Desktop için orijinal text'ler
  const mainText1 = t("text.main1").split("")
  const mainText2 = t("text.main2").split("")
  const mainText3 = "IŞIK TUTAR!".split("")

  return (
    <section ref={ref} className="py-20 bg-[#f9f7f4]">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Mobil Layout - 3 Satır - Tam Genişlik */}
          <div className="block md:hidden">
            {/* MEKANLARINIZ - 1. satır */}
            <div className="font-display text-[11vw] text-[#15415b] mb-1 leading-tight tracking-tight">
              {mobileText1.split("").map((letter, index) => (
                <motion.span
                  key={`mobile1-${index}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: -50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.05,
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>

            {/* YAŞAMINIZA - 2. satır */}
            <div className="font-display text-[11vw] text-[#15415b] mb-1 leading-tight tracking-tight">
              {mobileText2.split("").map((letter, index) => (
                <motion.span
                  key={`mobile2-${index}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: -50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + index * 0.05,
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>

            {/* IŞIK TUTAR! - 3. satır */}
            <div className="font-display text-[11vw] text-[#15415b] mb-8 leading-tight tracking-tight">
              {mobileText3.split("").map((letter, index) => (
                <motion.span
                  key={`mobile3-${index}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: -50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + index * 0.05,
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Desktop Layout - Orijinal */}
          <div className="hidden md:block">
            {/* MEKANLARINIZ */}
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

            {/* YAŞAMINIZA */}
            <div className="relative mb-0">
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
            </div>

            {/* IŞIK TUTAR! */}
            <div className="relative mb-8">
              <div className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#15415b] leading-tight tracking-tight flex justify-center flex-wrap">
                {mainText3.map((letter, index) => (
                  <motion.span
                    key={`text3-${index}`}
                    className="inline-block"
                    initial={{ opacity: 0, y: -50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.8 + index * 0.1,
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Description Text */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <p className="font-sans text-lg md:text-xl text-[#2a2a2a] leading-relaxed">{t("text.description")}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
