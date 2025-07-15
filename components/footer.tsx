"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Instagram, Youtube, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <footer ref={ref} className="bg-shinest-blue text-white relative overflow-hidden">
      {/* Ana Footer İçeriği */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sol - Logo ve Açıklama */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 relative mr-3">
                <Image src="/images/shinest-logo.png" alt="SHINEST Logo" fill className="object-contain invert" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-shinest-gold">{t("hero.company")}</h3>
                <p className="font-sans text-xs text-white/70 uppercase tracking-wider">{t("hero.subtitle")}</p>
              </div>
            </div>
            <p className="font-sans text-white/90 leading-relaxed mb-6 text-sm">{t("footer.description")}</p>

            {/* Social Media */}
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/icm.selin"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 border-2 border-white/50 rounded-full flex items-center justify-center hover:bg-white hover:text-shinest-blue transition-all duration-300 text-white"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </Link>
              <Link
                href="https://www.youtube.com/@ShinestIcMimarlikk"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 border-2 border-white/50 rounded-full flex items-center justify-center hover:bg-white hover:text-shinest-blue transition-all duration-300 text-white"
              >
                <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/shinesticmimarlik"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 border-2 border-white/50 rounded-full flex items-center justify-center hover:bg-white hover:text-shinest-blue transition-all duration-300 text-white"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>

          {/* Hızlı Linkler */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="font-display text-xl text-shinest-gold mb-6">{t("footer.quickLinks")}</h4>
            <nav className="space-y-3">
              {[
                { name: t("nav.home"), href: "/" },
                { name: t("nav.about"), href: "/about" },
                { name: t("nav.services"), href: "/services" },
                { name: t("nav.projects"), href: "/projects" },
                { name: t("nav.blog"), href: "/blog" },
                { name: t("nav.contact"), href: "/contact" },
              ].map((item, index) => (
                <motion.div key={item.name} className="group" whileHover={{ x: 8 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={item.href}
                    className="font-sans text-white/90 hover:text-shinest-gold transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-shinest-gold" />
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Hizmetler */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="font-display text-xl text-shinest-gold mb-6">Hizmetlerimiz</h4>
            <nav className="space-y-3">
              {[
                { name: "Danışmanlık", href: "/services/consulting" },
                { name: "Tasarım", href: "/services/design" },
                { name: "Uygulama", href: "/services/implementation" },
                { name: "3D Görselleştirme", href: "/services" },
                { name: "Proje Yönetimi", href: "/services" },
                { name: "Online Danışmanlık", href: "/services" },
              ].map((item, index) => (
                <motion.div key={item.name} className="group" whileHover={{ x: 8 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={item.href}
                    className="font-sans text-white/90 hover:text-shinest-gold transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-shinest-gold" />
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* İletişim Bilgileri */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h4 className="font-display text-xl text-shinest-gold mb-6">{t("footer.contact")}</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-shinest-blue transition-all duration-300 text-white">
                  <Mail className="w-4 h-4 text-white group-hover:text-shinest-blue transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-sans text-xs text-white/70 mb-1">E-posta</p>
                  <Link
                    href="mailto:iletisim@shinesticmimarlik.com"
                    className="font-sans text-sm text-white/90 hover:text-shinest-gold transition-colors duration-300 break-words"
                  >
                    iletisim@shinesticmimarlik.com
                  </Link>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-shinest-blue transition-all duration-300 text-white">
                  <Phone className="w-4 h-4 text-white group-hover:text-shinest-blue transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-sans text-xs text-white/70 mb-1">Telefon</p>
                  <Link
                    href="tel:+905521798735"
                    className="font-sans text-sm text-white/90 hover:text-shinest-gold transition-colors duration-300"
                  >
                    0 552 179 87 35
                  </Link>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-shinest-blue transition-all duration-300 text-white">
                  <MapPin className="w-4 h-4 text-white group-hover:text-shinest-blue transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-sans text-xs text-white/70 mb-1">Konum</p>
                  <p className="font-sans text-sm text-white/90">{t("contact.izmir")}, Türkiye</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Alt Çizgi ve Telif Hakkı */}
      <div className="bg-shinest-blue text-white">
        <div className="container mx-auto px-6 py-6">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="font-sans text-sm text-white/90">{t("footer.copyright")}</p>

            <div className="flex items-center space-x-2">
              <Link
                href="https://www.rettocreative.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-white/80 hover:text-white transition-colors duration-300"
              >
                Tasarım ve Yazılım: www.rettocreative.com
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dekoratif Elementler */}
      <motion.div
        className="absolute top-20 right-20 w-24 h-24 border border-white/10 rounded-full opacity-30"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: {
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
          scale: {
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
      />

      <motion.div
        className="absolute bottom-32 left-16 w-16 h-16 bg-white/5 rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </footer>
  )
}
