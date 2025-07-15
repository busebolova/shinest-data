"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { useQuoteForm } from "@/contexts/quote-form-context"

export default function AboutPage() {
  const { t } = useLanguage()
  const { openQuoteForm } = useQuoteForm()
  const [isLoaded, setIsLoaded] = useState(false)
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
  }, [])

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
            {/* SHINEST - Videodaki gibi yumuşak fade-in animasyon */}
            <div className="font-display text-[16vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] xl:text-[8vw] text-shinest-blue leading-[0.85] font-normal mb-6 md:mb-8 flex justify-center">
              {shinestLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.8 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.3 + index * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94], // Videodaki gibi yumuşak easing
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Normal başlık - El yazısı değil */}
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
                {t("about.title")}
              </h1>
            </motion.div>
          </motion.div>

          {/* Ana İçerik - Videodaki gibi yumuşak fade-up */}
          <motion.div
            className="space-y-16 md:space-y-20"
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
              duration: 1.5,
              delay: 2.0,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {/* Ana Açıklama - Mobile Responsive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
                <p className="font-sans font-normal text-sm md:text-base text-[#2a2a2a] leading-relaxed">
                  Shinest İç Mimarlık olarak yenilikçi ve fonksiyonel iç mekan çözümleri sunarak, danışanlarımızın yaşam
                  alanlarınıza değer katmayı hedefleyen bir tasarım firmasıyız. Uzman ekibimiz ile her projede özgün ve
                  yaratıcı çözümler sunarak, mekanlarınızı işlevsel ve konforlu hale getiriyoruz.
                </p>
                <p className="font-sans font-normal text-sm md:text-base text-[#2a2a2a] leading-relaxed">
                  Mekanların ruhunu ve kullanıcıların ihtiyaçlarını analiz ederek, her projede kişiye özel tasarımlar
                  oluşturuyoruz. Amacımız, sizlere hem göz alıcı hem de uzun ömürlü yaşam alanları sunmaktır.
                </p>
                <p className="font-sans font-normal text-sm md:text-base text-[#2a2a2a] leading-relaxed">
                  Her adımda sizin isteklerinizi ve beklentilerinizi dikkate alarak, hayalinizdeki mekanı gerçeğe
                  dönüştürmek için çalışıyoruz. Yenilikçi yaklaşımımız, kaliteli işçiliğimiz ve müşteri odaklı hizmet
                  anlayışımızla iç mekan tasarımında fark yaratıyoruz.
                </p>
              </div>

              <div className="relative h-64 sm:h-80 md:h-96 order-1 lg:order-2">
                <Image
                  src="https://plus.unsplash.com/premium_photo-1671269943771-63db2ab54bf2?q=80&w=2574&auto=format&fit=crop"
                  alt="SHINEST Studio"
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={true}
                />
              </div>
            </div>

            {/* Vizyon ve Misyon - Mobile Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
              {/* Vizyon */}
              <motion.div
                className="bg-white p-6 md:p-8 rounded-lg shadow-lg"
                initial={{ opacity: 0, x: -30 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.8, delay: 2.5 }}
              >
                <h3 className="font-display text-xl md:text-2xl text-shinest-blue mb-4">{t("about.vision")}</h3>
                <p className="font-sans text-sm md:text-base text-[#2a2a2a] leading-relaxed">
                  İç mimarlık alanında yenilikçi ve sürdürülebilir çözümlerle öncü olmak, her projede mükemmelliği
                  hedefleyerek sektörde fark yaratan bir marka olmak.
                </p>
              </motion.div>

              {/* Misyon */}
              <motion.div
                className="bg-white p-6 md:p-8 rounded-lg shadow-lg"
                initial={{ opacity: 0, x: 30 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.8, delay: 2.7 }}
              >
                <h3 className="font-display text-xl md:text-2xl text-shinest-blue mb-4">{t("about.mission")}</h3>
                <p className="font-sans text-sm md:text-base text-[#2a2a2a] leading-relaxed">
                  Müşterilerimizin hayallerini gerçeğe dönüştürmek, yaşam kalitelerini artıran fonksiyonel ve estetik
                  mekanlar tasarlamak, her projede kişiye özel çözümler sunmak.
                </p>
              </motion.div>
            </div>

            {/* Değerlerimiz */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 2.9 }}
            >
              <h3 className="font-display text-2xl md:text-3xl text-shinest-blue mb-8">{t("about.values")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                  {
                    title: t("about.innovation"),
                    description:
                      "Sürekli gelişen teknoloji ve tasarım trendlerini takip ederek yenilikçi çözümler sunuyoruz.",
                  },
                  {
                    title: t("about.quality"),
                    description:
                      "Her projede en yüksek kalite standartlarını uygulayarak mükemmel sonuçlar elde ediyoruz.",
                  },
                  {
                    title: t("about.sustainability"),
                    description: "Çevre dostu malzemeler ve sürdürülebilir tasarım anlayışıyla geleceği düşünüyoruz.",
                  },
                ].map((value, index) => (
                  <motion.div
                    key={value.title}
                    className="bg-white p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 3.1 + index * 0.2 }}
                  >
                    <h4 className="font-display text-lg text-shinest-blue mb-3">{value.title}</h4>
                    <p className="font-sans text-sm text-[#2a2a2a] leading-relaxed">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              className="text-center bg-white p-8 md:p-12 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 3.5 }}
            >
              <h3 className="font-display text-2xl md:text-3xl text-shinest-blue mb-4">Birlikte Çalışalım</h3>
              <p className="font-sans text-base md:text-lg text-[#2a2a2a] mb-6 max-w-3xl mx-auto">
                Hayalinizdeki mekanı birlikte tasarlayalım. SHINEST İç Mimarlık olarak, size özel çözümler sunmak için
                buradayız.
              </p>
              <button
                onClick={openQuoteForm}
                className="inline-flex items-center gap-2 bg-shinest-blue text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-shinest-blue/80 transition-colors duration-300"
              >
                <span>Teklif Al</span>
                <span>→</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
