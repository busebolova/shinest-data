"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const { language } = useLanguage()

  const content = {
    tr: {
      company: "SHINEST İç Mimarlık",
      description:
        "Yaşam alanlarınızı sanat eserine dönüştürüyoruz. Modern tasarım anlayışı ile fonksiyonel ve estetik mekanlar yaratıyoruz.",
      quickLinks: "Hızlı Bağlantılar",
      services: "Hizmetlerimiz",
      contact: "İletişim",
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
        "İç Mimarlık Danışmanlığı",
        "Mekan Tasarımı",
        "Mobilya Tasarımı",
        "Proje Yönetimi",
        "Uygulama Hizmetleri",
      ],
    },
    en: {
      company: "SHINEST Interior Architecture",
      description:
        "We transform your living spaces into works of art. We create functional and aesthetic spaces with a modern design approach.",
      quickLinks: "Quick Links",
      services: "Services",
      contact: "Contact",
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
        "Interior Design Consulting",
        "Space Design",
        "Furniture Design",
        "Project Management",
        "Implementation Services",
      ],
    },
  }

  const currentContent = content[language]

  return (
    <footer className="bg-[#15415b] text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
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
            <p className="text-gray-300 leading-relaxed mb-6">{currentContent.description}</p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-[#c4975a] rounded-full flex items-center justify-center hover:bg-[#b8864d] transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#c4975a] rounded-full flex items-center justify-center hover:bg-[#b8864d] transition-colors duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#c4975a] rounded-full flex items-center justify-center hover:bg-[#b8864d] transition-colors duration-300"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">{currentContent.quickLinks}</h4>
            <ul className="space-y-3">
              {currentContent.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-[#c4975a] transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6">{currentContent.services}</h4>
            <ul className="space-y-3">
              {currentContent.servicesList.map((service) => (
                <li key={service} className="text-gray-300">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">{currentContent.contact}</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin size={20} className="text-[#c4975a] flex-shrink-0" />
                <span className="text-gray-300">İstanbul, Türkiye</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-[#c4975a] flex-shrink-0" />
                <span className="text-gray-300">+90 (212) 123 45 67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-[#c4975a] flex-shrink-0" />
                <span className="text-gray-300">info@shinest.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 SHINEST İç Mimarlık. {currentContent.rights}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-[#c4975a] text-sm transition-colors duration-300"
              >
                {language === "tr" ? "Gizlilik Politikası" : "Privacy Policy"}
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-[#c4975a] text-sm transition-colors duration-300">
                {language === "tr" ? "Kullanım Şartları" : "Terms of Service"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
