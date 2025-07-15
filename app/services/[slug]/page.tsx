"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useQuoteForm } from "@/contexts/quote-form-context"

// Hizmet verileri
const servicesData = {
  consulting: {
    title: "Danışmanlık / Online Danışmanlık",
    description: "Uzaktan ve yüz yüze profesyonel iç mimarlık danışmanlığı hizmetleri.",
    fullDescription: `
      <p>SHINEST İç Mimarlık olarak, uzaktan ve yüz yüze profesyonel iç mimarlık danışmanlığı hizmetleri sunuyoruz. Mekanınızın potansiyelini keşfetmek için uzman görüşü alın.</p>
      <p>Danışmanlık hizmetimiz, mekanınızın mevcut durumunu değerlendirerek başlar. Ardından, ihtiyaçlarınız ve beklentileriniz doğrultusunda size özel çözümler sunarız.</p>
      <p>Online danışmanlık hizmetimiz sayesinde, dünyanın neresinde olursanız olun, profesyonel iç mimarlık desteğimizden faydalanabilirsiniz. Video konferans yoluyla mekanınızı değerlendirir, size özel öneriler sunarız.</p>
    `,
    image: "/placeholder.svg?height=800&width=1200",
    features: [
      "Mekan analizi ve değerlendirme",
      "Konsept danışmanlığı",
      "Renk ve malzeme danışmanlığı",
      "Mobilya ve aksesuar önerileri",
      "Online video konferans ile uzaktan danışmanlık",
      "Detaylı rapor ve öneriler",
    ],
    process: [
      {
        title: "İlk Görüşme",
        description: "İhtiyaçlarınızı ve beklentilerinizi anlamak için detaylı bir görüşme yaparız.",
      },
      {
        title: "Mekan Analizi",
        description: "Mekanınızın mevcut durumunu değerlendirir, potansiyelini ve kısıtlamalarını belirleriz.",
      },
      {
        title: "Konsept Önerileri",
        description: "İhtiyaçlarınıza ve beğenilerinize uygun konsept önerileri sunarız.",
      },
      {
        title: "Detaylı Rapor",
        description: "Tüm önerilerimizi ve değerlendirmelerimizi içeren detaylı bir rapor hazırlarız.",
      },
    ],
  },
  design: {
    title: "Tasarım",
    description: "Yaratıcı ve işlevsel iç mekan tasarım çözümleri.",
    fullDescription: `
      <p>SHINEST İç Mimarlık olarak, yaratıcı ve işlevsel iç mekan tasarım çözümleri sunuyoruz. Konsept geliştirmeden 3D görselleştirmeye kadar kapsamlı tasarım hizmetleri veriyoruz.</p>
      <p>Tasarım sürecimiz, mekanınızın potansiyelini maksimuma çıkarmak ve ihtiyaçlarınıza en uygun çözümleri sunmak üzerine kuruludur. Her projede özgün ve yenilikçi fikirler geliştirmeyi hedefliyoruz.</p>
      <p>3D görselleştirme hizmetimiz sayesinde, tasarımınızı hayata geçirmeden önce nasıl görüneceğini görebilir, gerekli değişiklikleri yapabilirsiniz.</p>
    `,
    image: "/placeholder.svg?height=800&width=1200",
    features: [
      "Konsept tasarım",
      "Mekan planlama",
      "3D görselleştirme",
      "Malzeme ve renk seçimi",
      "Mobilya ve aksesuar seçimi",
      "Aydınlatma tasarımı",
    ],
    process: [
      {
        title: "Konsept Geliştirme",
        description: "İhtiyaçlarınız ve beğenileriniz doğrultusunda özgün konseptler geliştiririz.",
      },
      {
        title: "Mekan Planlama",
        description: "Mekanınızın en verimli şekilde kullanılması için detaylı planlar hazırlarız.",
      },
      {
        title: "3D Görselleştirme",
        description:
          "Tasarımınızı hayata geçirmeden önce nasıl görüneceğini görebilmeniz için 3D görseller hazırlarız.",
      },
      {
        title: "Detaylı Çizimler",
        description: "Uygulama aşamasında kullanılacak detaylı teknik çizimler hazırlarız.",
      },
    ],
  },
  implementation: {
    title: "Uygulama",
    description: "Tasarımdan gerçeğe dönüşüm süreci.",
    fullDescription: `
      <p>SHINEST İç Mimarlık olarak, tasarımdan gerçeğe dönüşüm sürecinde yanınızdayız. Proje yönetimi, koordinasyon ve kaliteli işçilikle hayalinizdeki mekanı yaratıyoruz.</p>
      <p>Uygulama sürecimiz, tasarım aşamasında belirlenen tüm detayların hayata geçirilmesini kapsar. Profesyonel ekibimiz, projenizin her aşamasında kalite kontrolü sağlar.</p>
      <p>Proje yönetimi hizmetimiz sayesinde, tüm süreci sizin adınıza takip eder, sorunsuz bir uygulama süreci yaşamanızı sağlarız.</p>
    `,
    image: "/placeholder.svg?height=800&width=1200",
    features: [
      "Proje yönetimi",
      "Kalite kontrolü",
      "Tedarikçi koordinasyonu",
      "Bütçe yönetimi",
      "Zaman planlaması",
      "Teslim sonrası destek",
    ],
    process: [
      {
        title: "Planlama",
        description: "Uygulama sürecinin tüm aşamalarını detaylı bir şekilde planlarız.",
      },
      {
        title: "Tedarik",
        description: "Projede kullanılacak tüm malzeme ve ürünlerin tedarik sürecini yönetiriz.",
      },
      {
        title: "Uygulama",
        description: "Profesyonel ekibimizle tasarımınızı hayata geçiririz.",
      },
      {
        title: "Kalite Kontrolü",
        description: "Uygulama sürecinin her aşamasında kalite kontrolü yaparız.",
      },
      {
        title: "Teslim",
        description: "Projeyi tamamladıktan sonra size teslim eder, gerekli bilgilendirmeleri yaparız.",
      },
    ],
  },
}

export default function ServiceDetailPage() {
  const { t } = useLanguage()
  const { openQuoteForm } = useQuoteForm()
  const params = useParams()
  const slug = params.slug as string
  const [isLoaded, setIsLoaded] = useState(false)
  const [displayText, setDisplayText] = useState("")

  // Geçerli hizmet verisini al
  const serviceData = servicesData[slug as keyof typeof servicesData]
  const fullText = serviceData?.title || ""

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

  if (!serviceData) {
    return (
      <div className="min-h-screen bg-[#f5f3f0] flex items-center justify-center">
        <p className="text-2xl text-shinest-blue">Hizmet bulunamadı.</p>
      </div>
    )
  }

  // SHINEST harfleri için animasyon
  const shinestLetters = "SHINEST".split("")

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

            {/* Hizmet Başlığı */}
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

          {/* Ana İçerik */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            {/* Görsel */}
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={serviceData.image || "/placeholder.svg"}
                alt={serviceData.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Açıklama */}
            <div className="space-y-6">
              <p className="font-sans text-lg text-[#2a2a2a] leading-relaxed">{serviceData.description}</p>
              <div
                className="font-sans text-base text-[#2a2a2a] leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: serviceData.fullDescription }}
              />

              <h3 className="font-display text-2xl text-shinest-blue mt-8">Hizmet Özellikleri</h3>
              <ul className="list-disc pl-6 space-y-2">
                {serviceData.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    className="font-sans text-[#2a2a2a]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 2.0 + index * 0.1 }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Süreç */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            <h3 className="font-display text-3xl text-shinest-blue mb-8 text-center">Süreç</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceData.process.map((step, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 2.4 + index * 0.2 }}
                >
                  <div className="w-12 h-12 bg-shinest-blue text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                    {index + 1}
                  </div>
                  <h4 className="font-display text-xl text-shinest-blue mb-2">{step.title}</h4>
                  <p className="font-sans text-sm text-[#2a2a2a]">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 3.0 }}
          >
            <p className="font-sans text-lg text-[#2a2a2a] mb-6 max-w-3xl mx-auto">
              Bu hizmetimiz hakkında daha fazla bilgi almak veya projeniz için teklif almak ister misiniz?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openQuoteForm}
                className="inline-flex items-center justify-center gap-2 bg-shinest-blue text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-shinest-blue/80 transition-colors duration-300"
              >
                <span>{t("services.getQuote")}</span>
                <span>→</span>
              </button>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 border border-shinest-blue text-shinest-blue px-8 py-4 rounded-full font-sans font-medium hover:bg-shinest-blue/10 transition-colors duration-300"
              >
                <span>Diğer Hizmetler</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
