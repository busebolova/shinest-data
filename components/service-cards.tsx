"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { useQuoteForm } from "@/contexts/quote-form-context"
import Image from "next/image"

export default function ServiceCards() {
  const { t } = useLanguage()
  const { openQuoteForm } = useQuoteForm()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const services = [
    {
      id: "consulting",
      title: t("services.consulting"),
      description: t("services.consulting.desc"),
      slug: "consulting",
      image: "/images/consulting-service.png", // .jpeg'den .png'ye değiştirildi
    },
    {
      id: "design",
      title: t("services.design"),
      description: t("services.design.desc"),
      slug: "design",
      image: "/images/design-service.png", // .jpeg'den .png'ye değiştirildi
    },
    {
      id: "implementation",
      title: t("services.implementation"),
      description: t("services.implementation.desc"),
      slug: "implementation",
      image: "/images/implementation-service.png", // .jpeg'den .png'ye değiştirildi
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="font-display text-3xl sm:text-4xl md:text-5xl text-shinest-blue mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("services.title")}
          </motion.h2>
          <motion.p
            className="font-sans text-base sm:text-lg text-[#2a2a2a] max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            SHINEST İç Mimarlık olarak müşterilerimize özel, yenilikçi ve fonksiyonel tasarım çözümleri sunuyoruz.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="group flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              {/* Görsel */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                <h3 className="absolute bottom-4 left-4 right-4 font-display text-xl sm:text-2xl text-white">
                  {service.title}
                </h3>
              </div>

              {/* İçerik */}
              <div className="flex flex-col flex-grow p-6 bg-white">
                <p className="font-sans text-[#2a2a2a] mb-6 leading-relaxed text-sm md:text-base flex-grow">
                  {service.description}
                </p>

                {/* Link */}
                <div className="mt-auto">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 bg-transparent border-2 border-shinest-blue text-shinest-blue px-6 py-3 rounded-full font-sans font-medium transition-colors duration-200 hover:bg-shinest-blue/10"
                  >
                    <span>Detaylar</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ana Teklif Al Butonu */}
        <motion.div
          className="text-center mt-20 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="w-full max-w-2xl mx-auto">
            {/* Üst çizgi */}
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-shinest-blue/40 to-transparent mb-8"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, delay: 1.4 }}
            />

            {/* Ana Teklif Al Butonu */}
            <motion.button
              onClick={openQuoteForm}
              className="group relative bg-transparent border-2 border-shinest-blue text-shinest-blue px-12 py-4 rounded-full font-display text-xl md:text-2xl font-normal tracking-[0.05em] uppercase overflow-hidden transition-colors duration-200 ease-out hover:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Arka plan fill animasyonu */}
              <div className="absolute inset-0 bg-shinest-blue rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out origin-center delay-75" />

              {/* Metin */}
              <span className="relative z-10 transition-colors duration-200">{t("services.getQuote")}</span>
            </motion.button>

            {/* Alt çizgi */}
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-shinest-blue/40 to-transparent mt-8"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, delay: 1.8 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
