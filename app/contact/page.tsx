"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { MapPin, Phone, Mail } from "lucide-react"

export default function ContactPage() {
  const [currentLanguage, setCurrentLanguage] = useState("TR")
  const [isLoaded, setIsLoaded] = useState(false)
  const fullText = "İletişim"

  // SHINEST harfleri için animasyon
  const shinestLetters = "SHINEST".split("")

  useEffect(() => {
    // Sayfa yüklendiğinde scroll'u en üste al
    window.scrollTo(0, 0)

    // State'leri reset et
    setIsLoaded(false)

    // Kısa bir delay sonra animasyonları başlat
    const initialTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(initialTimer)
  }, []) // Sadece component mount olduğunda çalış

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language)
  }

  return (
    <main className="min-h-screen bg-[#f5f3f0]">
      <Header currentLanguage={currentLanguage} onLanguageChange={handleLanguageChange} />

      <section className="pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            {/* SHINEST - Yukarıdan gelen harf animasyonu */}
            <div className="font-display text-[16vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] xl:text-[8vw] text-shinest-blue leading-[0.85] font-normal mb-6 md:mb-8 flex justify-center">
              {shinestLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, y: -50, scale: 0.8 }}
                  animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -50, scale: 0.8 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.3 + index * 0.08,
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

            {/* İletişim Başlığı - Normal font, el yazısı değil */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={isLoaded ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 20 }}
              transition={{
                duration: 1.5,
                delay: 1.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <h1 className="font-display text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] xl:text-[3vw] text-[#c4975a]">
                {fullText}
              </h1>
            </motion.div>
          </motion.div>

          {/* İletişim Bilgileri */}
          <motion.div
            className="space-y-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            {[
              {
                icon: Mail,
                title: "E-posta",
                content: "iletisim@shinesticmimarlik.com",
                link: "mailto:iletisim@shinesticmimarlik.com",
              },
              {
                icon: Phone,
                title: "Telefon",
                content: "0 552 179 87 35",
                link: "tel:+905521798735",
              },
              {
                icon: MapPin,
                title: "Şehir",
                content: "İzmir",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="py-8 border-b border-shinest-blue/20 last:border-b-0"
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 2.0 + index * 0.2 }}
              >
                <div className="flex flex-col items-center space-y-4">
                  <item.icon className="w-8 h-8 text-shinest-blue" />
                  <h3 className="font-display text-xl text-shinest-blue">{item.title}</h3>
                  {item.link ? (
                    <a
                      href={item.link}
                      className="font-sans text-base text-[#2a2a2a] hover:text-shinest-blue transition-colors duration-300 whitespace-pre-line"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="font-sans text-base text-[#2a2a2a] whitespace-pre-line">{item.content}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
