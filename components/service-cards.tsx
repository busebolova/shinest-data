"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { useQuoteForm } from "@/contexts/quote-form-context"

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
    },
    {
      id: "design",
      title: t("services.design"),
      description: t("services.design.desc"),
      slug: "design",
    },
    {
      id: "implementation",
      title: t("services.implementation"),
      description: t("services.implementation.desc"),
      slug: "implementation",
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="font-display text-4xl md:text-5xl text-shinest-blue mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("services.title")}
          </motion.h2>
          <motion.p
            className="font-sans text-lg text-[#2a2a2a] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            SHINEST İç Mimarlık olarak müşterilerimize özel, yenilikçi ve fonksiyonel tasarım çözümleri sunuyoruz.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="border-t border-shinest-blue/20 pt-6 group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              {/* Başlık */}
              <h3 className="font-display text-xl md:text-2xl text-shinest-blue mb-4 group-hover:text-shinest-blue/80 transition-colors">
                {service.title}
              </h3>

              {/* Açıklama */}
              <p className="font-sans text-[#2a2a2a] mb-6 leading-relaxed text-sm md:text-base">
                {service.description}
              </p>

              {/* Link */}
              <div>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center text-shinest-blue hover:text-shinest-blue/80 transition-colors duration-300 font-medium"
                >
                  <span>{t("services.details")}</span>
                  <motion.span className="ml-2" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    →
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
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
  )
}
