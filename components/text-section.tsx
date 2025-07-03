"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useContent } from "@/hooks/use-content"
import { useLanguage } from "@/contexts/language-context"

export function TextSection() {
  const { content, loading } = useContent("home")
  const { currentLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-20 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-16 bg-gray-200 rounded w-2/3 mx-auto"></div>
            <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  const textData = content?.textSection || {
    mainText1: { tr: "MEKANLARINIZ", en: "YOUR SPACES" },
    mainText2: { tr: "YAŞAMINIZA", en: "BRING LIGHT TO" },
    handwritingText: { tr: "ışık tutar!", en: "your life!" },
    description: {
      tr: "SHINEST İç Mimarlık olarak, yaşam alanlarınızı sanat eserine dönüştürüyoruz.",
      en: "As SHINEST Interior Architecture, we transform your living spaces into works of art.",
    },
  }

  const getLocalizedText = (textObj: any) => {
    if (typeof textObj === "string") return textObj
    return textObj?.[currentLanguage.toLowerCase()] || textObj?.tr || textObj?.en || ""
  }

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Text 1 */}
          <motion.h2
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-shinest-blue mb-6 tracking-wider leading-tight"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {getLocalizedText(textData.mainText1)}
          </motion.h2>

          {/* Main Text 2 */}
          <motion.h3
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-shinest-blue mb-8 tracking-wider leading-tight"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {getLocalizedText(textData.mainText2)}
          </motion.h3>

          {/* Handwriting Text */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <span className="font-handwriting text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-shinest-gold inline-block transform -rotate-3">
              {getLocalizedText(textData.handwritingText)}
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            className="font-sans text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {getLocalizedText(textData.description)}
          </motion.p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-shinest-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-shinest-gold/10 rounded-full blur-3xl"></div>
    </section>
  )
}

export default TextSection
