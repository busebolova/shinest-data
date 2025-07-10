"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { language } = useLanguage()

  const content = {
    tr: {
      company: "SHINEST İç Mimarlık",
      description: "Yaşam alanlarınızı hayallerinizle buluşturan profesyonel iç mimarlık hizmetleri.",
      quickLinks: "Hızlı Bağlantılar",
      services: "Hizmetlerimiz",
      contact: "İletişim",
      address: "Adres",
      phone: "Telefon",
      email: "E-posta",
      followUs: "Bizi Takip Edin",
      rights: "Tüm hakları saklıdır.",
      links: [
        { name: "Ana Sayfa", href: "/" },
        { name: "Hakkımızda", href: "/about" },
        { name: "Projelerimiz", href: "/projects" },
        { name: "Blog", href: "/blog" },
        { name: "İletişim", href: "/contact" },
      ],
      servicesList: [
        { name: "Danışmanlık", href: "/services/consulting" },
        { name: "Tasarım", href: "/services/design" },
        { name: "Uygulama", href: "/services/implementation" },
      ],
    },
    en: {
      company: "SHINEST Interior Architecture",
      description:
        "Professional interior architecture services that bring your living spaces together with your dreams.",
      quickLinks: "Quick Links",
      services: "Services",
      contact: "Contact",
      address: "Address",
      phone: "Phone",
      email: "Email",
      followUs: "Follow Us",
      rights: "All rights reserved.",
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Projects", href: "/projects" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
      ],
      servicesList: [
        { name: "Consulting", href: "/services/consulting" },
        { name: "Design", href: "/services/design" },
        { name: "Implementation", href: "/services/implementation" },
      ],
    },
  }

  const currentContent = content[language]

  return (
    <footer className="bg-[#15415b] text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/shinest-logo.png"
                  alt="SHINEST Logo"
                  fill
                  className="object-contain brightness-0 invert"
                  sizes="48px"
                />
              </div>
              <h3 className="font-bold text-xl">{currentContent.company}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">{currentContent.description}</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg">{currentContent.quickLinks}</h4>
            <ul className="space-y-2">
              {currentContent.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-[#c4975a] transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg">{currentContent.services}</h4>
            <ul className="space-y-2">
              {currentContent.servicesList.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-[#c4975a] transition-colors duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg">{currentContent.contact}</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#c4975a] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">{currentContent.address}</p>
                  <p className="text-gray-300 text-sm">Ataşehir, İstanbul, Türkiye</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#c4975a] flex-shrink-0" />
                <div>
                  <p className="font-medium">{currentContent.phone}</p>
                  <p className="text-gray-300 text-sm">+90 (212) 555 0123</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#c4975a] flex-shrink-0" />
                <div>
                  <p className="font-medium">{currentContent.email}</p>
                  <p className="text-gray-300 text-sm">info@shinest.com</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <p className="font-medium mb-3">{currentContent.followUs}</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-[#c4975a] transition-colors duration-300">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-[#c4975a] transition-colors duration-300">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-[#c4975a] transition-colors duration-300">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-600 mt-12 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300">
            © 2024 {currentContent.company}. {currentContent.rights}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
