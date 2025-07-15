"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Instagram, Youtube, Linkedin, Mail, Phone, MapPin, ArrowRight, Clock, Award, Users } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <footer ref={ref} className="bg-[#f9f7f4] text-[#2a2a2a] relative overflow-hidden">
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
                <Image src="/images/shinest-logo.png" alt="SHINEST Logo" fill className="object-contain" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-shinest-blue">{t("hero.company")}</h3>
                <p className="font-sans text-xs text-[#8b7355] uppercase tracking-wider">{t("hero.subtitle")}</p>
              </div>
            </div>
            <p className="font-sans text-[#2a2a2a] leading-relaxed mb-6 text-sm">{t("footer.description")}</p>

            {/* İstatistikler */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-shinest-blue/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="w-5 h-5 text-shinest-blue" />
                </div>
                <p className="font-display text-lg text-shinest-blue">50+</p>
                <p className="font-sans text-xs text-[#8b7355]">Proje</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-shinest-blue/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-5 h-5 text-shinest-blue" />
                </div>
                <p className="font-display text-lg text-shinest-blue">100+</p>
                <p className="font-sans text-xs text-[#8b7355]">Müşteri</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-shinest-blue/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-5 h-5 text-shinest-blue" />
                </div>
                <p className="font-display text-lg text-shinest-blue">5+</p>
                <p className="font-sans text-xs text-[#8b7355]">Yıl</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/icm.selin"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 border-2 border-shinest-blue rounded-full flex items-center justify-center hover:bg-shinest-blue hover:text-white transition-all duration-300"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </Link>
              <Link
                href="https://www.youtube.com/@ShinestIcMimarlikk"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 border-2 border-shinest-blue rounded-full flex items-center justify-center hover:bg-shinest-blue hover:text-white transition-all duration-300"
              >
                <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/shinesticmimarlik"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 border-2 border-shinest-blue rounded-full flex items-center justify-center hover:bg-shinest-blue hover:text-white transition-all duration-300"
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
            <h4 className="font-display text-xl text-shinest-blue mb-6">{t("footer.quickLinks")}</h4>
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
                    className="font-sans text-[#2a2a2a] hover:text-shinest-blue transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-shinest-blue" />
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
            <h4 className="font-display text-xl text-shinest-blue mb-6">Hizmetlerimiz</h4>
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
                    className="font-sans text-[#2a2a2a] hover:text-shinest-blue transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-shinest-blue" />
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
            <h4 className="font-display text-xl text-shinest-blue mb-6">{t("footer.contact")}</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-shinest-blue/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-shinest-blue group-hover:text-white transition-all duration-300">
                  <Mail className="w-4 h-4 text-shinest-blue group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-sans text-xs text-[#8b7355] mb-1">E-posta</p>
                  <Link
                    href="mailto:iletisim@shinesticmimarlik.com"
                    className="font-sans text-sm text-[#2a2a2a] hover:text-shinest-blue transition-colors duration-300 break-words"
                  >
                    iletisim@shinesticmimarlik.com
                  </Link>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-shinest-blue/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-shinest-blue group-hover:text-white transition-all duration-300">
                  <Phone className="w-4 h-4 text-shinest-blue group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-sans text-xs text-[#8b7355] mb-1">Telefon</p>
                  <Link
                    href="tel:+905521798735"
                    className="font-sans text-sm text-[#2a2a2a] hover:text-shinest-blue transition-colors duration-300"
                  >
                    0 552 179 87 35
                  </Link>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-shinest-blue/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-shinest-blue group-hover:text-white transition-all duration-300">
                  <MapPin className="w-4 h-4 text-shinest-blue group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-sans text-xs text-[#8b7355] mb-1">Konum</p>
                  <p className="font-sans text-sm text-[#2a2a2a]">{t("contact.izmir")}, Türkiye</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-shinest-blue/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-shinest-blue group-hover:text-white transition-all duration-300">
                  <Clock className="w-4 h-4 text-shinest-blue group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-sans text-xs text-[#8b7355] mb-1">Çalışma Saatleri</p>
                  <p className="font-sans text-sm text-[#2a2a2a]">Pazartesi - Cuma</p>
                  <p className="font-sans text-sm text-[#2a2a2a]">09:00 - 18:00</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Bölümü */}
        <motion.div
          className="mt-16 pt-12 border-t border-shinest-blue/20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="font-display text-2xl text-shinest-blue mb-3">Tasarım İlhamı</h4>
            <p className="font-sans text-[#2a2a2a] mb-6">
              Yeni projeler, tasarım trendleri ve özel içerikler için bültenimize katılın.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-5 py-3 border-2 border-shinest-blue/20 rounded-full text-[#2a2a2a] placeholder-[#8b7355] focus:outline-none focus:border-shinest-blue transition-colors duration-300 bg-white"
              />
              <button className="px-6 py-3 bg-shinest-blue text-white rounded-full hover:bg-shinest-blue/90 transition-colors duration-300 flex items-center justify-center gap-2 font-medium">
                <span>Katıl</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Ek Bilgiler */}
        <motion.div
          className="mt-12 pt-8 border-t border-shinest-blue/20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div>
              <h5 className="font-display text-lg text-shinest-blue mb-2">Ücretsiz Keşif</h5>
              <p className="font-sans text-sm text-[#2a2a2a]">İzmir içi ücretsiz keşif hizmeti</p>
            </div>
            <div>
              <h5 className="font-display text-lg text-shinest-blue mb-2">Online Danışmanlık</h5>
              <p className="font-sans text-sm text-[#2a2a2a]">Türkiye geneli online hizmet</p>
            </div>
          </div>
        </motion.div>
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
        className="absolute top-20 right-20 w-24 h-24 border border-shinest-blue/10 rounded-full opacity-30"
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
        className="absolute bottom-32 left-16 w-16 h-16 bg-shinest-blue/5 rounded-full"
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
