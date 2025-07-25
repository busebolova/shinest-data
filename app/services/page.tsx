"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useQuoteForm } from "@/contexts/quote-form-context"

export default function ServicesPage() {
  const { t } = useLanguage()
  const { openQuoteForm } = useQuoteForm()
  const [isLoaded, setIsLoaded] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const fullText = t("services.title")

  // SHINEST harfleri için animasyon
  const shinestLetters = "SHINEST".split("")

  const services = [
    {
      id: "consulting",
      title: t("services.consulting"),
      description: t("services.consulting.desc"),
      image: "/images/consulting-service.png",
      slug: "consulting",
    },
    {
      id: "design",
      title: t("services.design"),
      description: t("services.design.desc"),
      image: "/images/design-service-new.png",
      slug: "design",
    },
    {
      id: "implementation",
      title: t("services.implementation"),
      description: t("services.implementation.desc"),
      image: "/images/implementation-service.png",
      slug: "implementation",
    },
  ]

  useEffect(() => {
    // Sayfa yüklendiğinde scroll'u en üste al
    window.scrollTo(0, 0)

    // State'leri reset et
    setDisplayText("")
    setIsLoaded(false)

    // Kısa bir delay sonra animasyonları başlat
    const initialTimer = setTimeout(() => {
      setIsLoaded(true)

      const timer = setTimeout(() => {
        let index = 0
        const typingTimer = setInterval(() => {
          if (index <= fullText.length) {
            setDisplayText(fullText.slice(0, index))
            index++
          } else {
            clearInterval(typingTimer)
          }
        }, 120)
        return () => clearInterval(typingTimer)
      }, 800)

      return () => clearTimeout(timer)
    }, 100)

    return () => clearTimeout(initialTimer)
  }, [fullText])

  return (
    <main className="min-h-screen bg-[#f5f3f0]">
      <Header />

      <section className="pt-32 sm:pt-36 md:pt-40 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Header - Mobile Responsive */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
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

            {/* Hizmetler Başlığı */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 1.5,
                delay: 1.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <h1 className="text-[#c4975a] text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] xl:text-[3vw]">
                {displayText}
                {displayText.length < fullText.length && (
                  <motion.span
                    className="inline-block w-0.5 h-[6vw] sm:h-[4vw] md:h-[3vw] lg:h-[2.5vw] xl:h-[2vw] bg-[#c4975a] ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1.0, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </h1>
            </motion.div>
          </motion.div>

          {/* Hizmetler Listesi */}
          <div className="grid grid-cols-1 gap-16 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 1.8 + index * 0.2 }}
              >
                {/* Görsel */}
                <div
                  className={`relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden shadow-lg ${
                    index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* İçerik */}
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                  <h2 className="font-display text-3xl text-shinest-blue">{service.title}</h2>
                  <p className="font-sans text-lg text-[#2a2a2a] leading-relaxed">{service.description}</p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 bg-shinest-blue text-white px-6 py-3 rounded-full font-sans font-medium hover:bg-shinest-blue/80 transition-colors duration-300"
                  >
                    <span>Detaylı Bilgi</span>
                    <span>→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center bg-white p-8 sm:p-12 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 2.6 }}
          >
            <h3 className="font-display text-2xl sm:text-3xl text-shinest-blue mb-4">Özel Projeniz İçin Teklif Alın</h3>
            <p className="font-sans text-lg text-[#2a2a2a] mb-6 max-w-3xl mx-auto">
              SHINEST İç Mimarlık olarak, her projeye özel çözümler sunuyoruz. Hayalinizdeki mekanı birlikte yaratalım.
            </p>
            <button
              onClick={openQuoteForm}
              className="inline-flex items-center gap-2 bg-shinest-blue text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-shinest-blue/80 transition-colors duration-300"
            >
              <span>{t("services.getQuote")}</span>
              <span>→</span>
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
