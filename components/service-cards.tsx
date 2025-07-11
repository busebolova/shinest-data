"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
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

export function ServiceCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleQuoteClick = () => {
    alert("Teklif formu yakında eklenecek!")
  }

  const services = [
    {
      id: 1,
      title: "Danışmanlık",
      description: "Profesyonel iç mimarlık danışmanlığı ile hayalinizdeki mekanı planlayın.",
      image: "/images/consulting-service.png",
      features: ["Mekan Analizi", "Konsept Geliştirme", "Bütçe Planlama"],
    },
    {
      id: 2,
      title: "Tasarım",
      description: "Yaratıcı ve işlevsel tasarım çözümleri ile mekanlarınızı dönüştürün.",
      image: "/images/design-service.png",
      features: ["3D Görselleştirme", "Teknik Çizimler", "Malzeme Seçimi"],
    },
    {
      id: 3,
      title: "Uygulama",
      description: "Tasarımdan uygulamaya kadar tüm süreçleri profesyonelce yönetiyoruz.",
      image: "/images/implementation-service.png",
      features: ["Proje Yönetimi", "Kalite Kontrolü", "Zamanında Teslimat"],
    },
  ]

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Services Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#15415b] mb-8">Hizmetlerimiz</h2>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="font-display text-2xl text-[#15415b] mb-3">{service.title}</h3>
                <p className="font-sans text-gray-600 mb-4 leading-relaxed">{service.description}</p>

                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="font-sans text-sm text-gray-500 flex items-center">
                      <span className="w-2 h-2 bg-[#c4975a] rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Large Animated Text */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#15415b] leading-tight tracking-tight flex justify-center flex-wrap">
            <div className="w-full">
              <AnimatedText text="MEKANLARINIZ" delay={1.6} />
            </div>
            <div className="w-full">
              <AnimatedText text="YAŞAMINIZA" delay={2.2} />
            </div>
            <div className="w-full">
              <AnimatedText text="IŞIK" delay={2.8} />
              <span className="mx-4"></span>
              <AnimatedText text="TUTAR!" delay={3.0} />
            </div>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 3.5 }}
        >
          <p className="font-sans text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            SHINEST İç Mimarlık, tam kapsamlı lüks iç mekan tasarım hizmetleri sunar — ilk konsept ve estetik
            danışmanlıktan koordinasyon, uygulama ve dergiye layık son dokunuşlara kadar.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 4.0 }}
        >
          <button
            onClick={handleQuoteClick}
            className="font-display bg-[#15415b] text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-[#1a4a66] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Teklif Al
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceCards
