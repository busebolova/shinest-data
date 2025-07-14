"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Award, Clock, Heart, ArrowRight, CheckCircle, Star, Target } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function AboutPage() {
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

  const stats = [
    { icon: Users, number: "500+", label: "Mutlu Müşteri" },
    { icon: Award, number: "15+", label: "Yıl Deneyim" },
    { icon: Clock, number: "1000+", label: "Tamamlanan Proje" },
    { icon: Heart, number: "100%", label: "Müşteri Memnuniyeti" },
  ]

  const values = [
    {
      icon: Target,
      title: "Kalite",
      description: "Her projede en yüksek kalite standartlarını hedefliyoruz",
    },
    {
      icon: Star,
      title: "Yaratıcılık",
      description: "Özgün ve yaratıcı tasarım çözümleri sunuyoruz",
    },
    {
      icon: CheckCircle,
      title: "Güvenilirlik",
      description: "Zamanında teslimat ve sözlerimizde durma konusunda kararlıyız",
    },
  ]

  const services = [
    {
      title: "İç Mimarlık Danışmanlığı",
      description: "Profesyonel danışmanlık hizmetleri",
      image: "/images/consulting-service.jpeg",
    },
    {
      title: "Tasarım ve Planlama",
      description: "Detaylı tasarım ve planlama süreçleri",
      image: "/images/design-service.jpeg",
    },
    {
      title: "Uygulama ve Takip",
      description: "Projenin başından sonuna kadar takip",
      image: "/images/implementation-service.jpeg",
    },
  ]

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#f5f3f0]">
        <Header />
        <div className="flex items-center justify-center pt-32">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-shinest-blue"></div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f3f0]">
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

            {/* Hakkımızda Başlığı - Kelime olarak animasyon */}
            <motion.div
              className="text-[#c4975a] text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] xl:text-[3vw] flex justify-center font-display"
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

          {/* About Content */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-shinest-blue mb-6">
                  Yaşam Alanlarınızı Dönüştürüyoruz
                </h2>
                <p className="font-sans text-lg text-[#2a2a2a] opacity-80 mb-6 leading-relaxed">
                  15 yılı aşkın deneyimimizle, yaşam alanlarınızı hayallerinizin ötesine taşıyoruz. Her proje bizim için
                  özel ve eşsizdir.
                </p>
                <p className="font-sans text-lg text-[#2a2a2a] opacity-80 mb-8 leading-relaxed">
                  Modern tasarım anlayışımızı geleneksel değerlerle harmanlayarak, size özel çözümler sunuyoruz. Kalite,
                  yaratıcılık ve güvenilirlik temel değerlerimizdir.
                </p>
                <Button size="lg" className="bg-shinest-blue hover:bg-shinest-blue/90 text-white font-sans">
                  Projelerimizi İnceleyin
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="relative">
                <Image
                  src="/images/about-section-reference.png"
                  alt="Hakkımızda"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5 + index * 0.1, duration: 0.6 }}
                >
                  <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-0">
                      <stat.icon className="w-12 h-12 text-[#c4975a] mx-auto mb-4" />
                      <div className="text-3xl font-display font-bold text-shinest-blue mb-2">{stat.number}</div>
                      <div className="font-sans text-[#2a2a2a] opacity-70">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 2.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-shinest-blue mb-4">Değerlerimiz</h2>
              <p className="font-sans text-lg text-[#2a2a2a] opacity-70 max-w-2xl mx-auto">
                Çalışmalarımızda bizi yönlendiren temel değerler
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.0 + index * 0.2, duration: 0.6 }}
                >
                  <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-0">
                      <value.icon className="w-16 h-16 text-[#c4975a] mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-xl font-display font-bold text-shinest-blue mb-4">{value.title}</h3>
                      <p className="font-sans text-[#2a2a2a] opacity-70 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 3.4 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-shinest-blue mb-4">Hizmetlerimiz</h2>
              <p className="font-sans text-lg text-[#2a2a2a] opacity-70 max-w-2xl mx-auto">
                Size sunduğumuz kapsamlı hizmet yelpazesi
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.6 + index * 0.2, duration: 0.6 }}
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-display font-bold text-shinest-blue mb-3">{service.title}</h3>
                      <p className="font-sans text-[#2a2a2a] opacity-70 leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="py-20 px-8 bg-shinest-blue rounded-3xl text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 4.0 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Hayalinizdeki Mekanı Birlikte Yaratalım
            </h2>
            <p className="text-xl font-sans text-white opacity-90 mb-8 leading-relaxed max-w-2xl mx-auto">
              Uzman ekibimizle tanışın ve projenizi hayata geçirmenin ilk adımını atın.
            </p>
            <Button size="lg" className="bg-[#c4975a] hover:bg-[#b8894d] text-white font-sans px-8 py-4 text-lg">
              İletişime Geçin
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
