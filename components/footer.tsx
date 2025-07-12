"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  const [language, setLanguage] = useState<"tr" | "en">("tr")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as "tr" | "en"
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const content = {
    tr: {
      company: "SHINEST İç Mimarlık",
      description:
        "Yaşam alanlarınızı sanat eserine dönüştürüyoruz. Modern tasarım anlayışı ile fonksiyonel ve estetik mekanlar yaratıyoruz.",
      quickLinks: "Hızlı Bağlantılar",
      home: "Ana Sayfa",
      about: "Hakkımızda",
      services: "Hizmetler",
      projects: "Projeler",
      blog: "Blog",
      contact: "İletişim",
      contactInfo: "İletişim Bilgileri",
      phone: "+90 (212) 555 0123",
      email: "info@shinest.com.tr",
      address: "Maslak Mahallesi, Büyükdere Caddesi No:123, Sarıyer/İstanbul",
      followUs: "Bizi Takip Edin",
      rights: "Tüm hakları saklıdır.",
    },
    en: {
      company: "SHINEST Interior Architecture",
      description:
        "We transform your living spaces into works of art. We create functional and aesthetic spaces with a modern design approach.",
      quickLinks: "Quick Links",
      home: "Home",
      about: "About",
      services: "Services",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
      contactInfo: "Contact Information",
      phone: "+90 (212) 555 0123",
      email: "info@shinest.com.tr",
      address: "Maslak District, Büyükdere Street No:123, Sarıyer/Istanbul",
      followUs: "Follow Us",
      rights: "All rights reserved.",
    },
  }

  const currentContent = content[language]

  return (
    <footer className="bg-[#15415b] text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-12 h-12">
                <Image src="/images/shinest-logo.png" alt="SHINEST Logo" fill className="object-contain" />
              </div>
              <h3 className="font-bold text-xl">{currentContent.company}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">{currentContent.description}</p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">{currentContent.quickLinks}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {currentContent.home}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {currentContent.about}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {currentContent.services}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {currentContent.projects}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {currentContent.blog}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {currentContent.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">{currentContent.contactInfo}</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-[#c4975a] mt-1 flex-shrink-0" />
                <span className="text-gray-300">{currentContent.phone}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-[#c4975a] mt-1 flex-shrink-0" />
                <span className="text-gray-300">{currentContent.email}</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#c4975a] mt-1 flex-shrink-0" />
                <span className="text-gray-300">{currentContent.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 {currentContent.company}. {currentContent.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
