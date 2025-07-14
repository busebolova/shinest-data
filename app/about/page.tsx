"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { useQuoteForm } from "@/contexts/quote-form-context"

export default function AboutPage() {
  const { openQuoteForm } = useQuoteForm()
  const [isLoaded, setIsLoaded] = useState(false)
  const shinestLetters = "SHINEST".split("")

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsLoaded(false)
    const initialTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(initialTimer)
  }, [])

  return (
    <main className="min-h-screen bg-[#f5f3f0]">
      <Header />

      <section className="pt-32 sm:pt-36 md:pt-40 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Header - Blog sayfası ile aynı animasyon */}
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

            {/* Hakkımızda başlığı - Kelime olarak animasyon */}
            <motion.div
              className="text-[#c4975a] text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] xl:text-[3vw] flex justify-center"
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -30, scale: 0.8 }}
              transition={{
                duration: 1.2,
                delay: 1.3,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100,
                damping: 12,
              }}
            >
              Hakkımızda
            </motion.div>
          </motion.div>

          {/* Ana İçerik - Tek Bölüm */}
          <div className="grid grid-cols-1 gap-16 mb-16">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              {/* Görsel */}
              <div className="relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden shadow-lg lg:order-1">
                <Image
                  src="/images/shinest-interior.jpg"
                  alt="SHINEST İç Mimarlık"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* İçerik */}
              <div className="space-y-6 lg:order-2">
                <h2 className="font-display text-3xl text-shinest-blue">SHINEST İç Mimarlık</h2>
                <div className="space-y-4 font-sans text-lg text-[#2a2a2a] leading-relaxed">
                  <p>
                    SHINEST İç Mimarlık olarak, yenilikçi ve fonksiyonel iç mekan çözümleri sunarak danışanlarımızın
                    yaşam alanlarına değer katmayı hedefleyen bir tasarım firmasıyız. Uzman ekibimiz ile her projede
                    özgün ve yaratıcı çözümler sunarak, mekanlarınızı işlevsel ve konforlu hale getiriyoruz.
                  </p>
                  <p>
                    Mekanların ruhunu ve kullanıcıların ihtiyaçlarını analiz ederek, her projede kişiye özel tasarımlar
                    oluşturuyoruz. Amacımız, sizlere hem göz alıcı hem de uzun ömürlü yaşam alanları sunmaktır.
                  </p>
                  <p>
                    Her adımda sizin isteklerinizi ve beklentilerinizi dikkate alarak, hayalinizdeki mekanı gerçeğe
                    dönüştürmek için çalışıyoruz. Yenilikçi yaklaşımımız, kaliteli işçiliğimiz ve müşteri odaklı hizmet
                    anlayışımızla iç mekan tasarımında fark yaratıyoruz.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            className="text-center bg-white p-8 sm:p-12 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 2.6 }}
          >
            <h3 className="font-display text-2xl sm:text-3xl text-shinest-blue mb-4">Projeniz İçin Teklif Alın</h3>
            <p className="font-sans text-lg text-[#2a2a2a] mb-6 max-w-3xl mx-auto">
              SHINEST İç Mimarlık olarak, her projeye özel çözümler sunuyoruz. Hayalinizdeki mekanı birlikte yaratalım.
            </p>
            <button
              onClick={openQuoteForm}
              className="inline-flex items-center gap-2 bg-shinest-blue text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-shinest-blue/80 transition-colors duration-300"
            >
              <span>Teklif Al</span>
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
