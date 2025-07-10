"use client"

import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Linkedin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useQuoteForm } from "@/contexts/quote-form-context"

export function Footer() {
  const { language } = useLanguage()
  const { openQuoteForm } = useQuoteForm()

  const footerLinks = {
    tr: {
      company: "Şirket",
      services: "Hizmetler",
      projects: "Projeler",
      contact: "İletişim",
      links: {
        about: "Hakkımızda",
        team: "Ekibimiz",
        career: "Kariyer",
        news: "Haberler",
        consulting: "Danışmanlık",
        design: "Tasarım",
        implementation: "Uygulama",
        maintenance: "Bakım",
        residential: "Konut",
        commercial: "Ticari",
        office: "Ofis",
        hotel: "Otel",
        address: "Adres",
        phone: "Telefon",
        email: "E-posta",
        getQuote: "Teklif Al",
        followUs: "Bizi Takip Edin",
        allRightsReserved: "Tüm hakları saklıdır.",
      },
    },
    en: {
      company: "Company",
      services: "Services",
      projects: "Projects",
      contact: "Contact",
      links: {
        about: "About Us",
        team: "Our Team",
        career: "Career",
        news: "News",
        consulting: "Consulting",
        design: "Design",
        implementation: "Implementation",
        maintenance: "Maintenance",
        residential: "Residential",
        commercial: "Commercial",
        office: "Office",
        hotel: "Hotel",
        address: "Address",
        phone: "Phone",
        email: "Email",
        getQuote: "Get Quote",
        followUs: "Follow Us",
        allRightsReserved: "All rights reserved.",
      },
    },
  }

  const t = footerLinks[language]

  return (
    <footer className="bg-[#15415b] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="relative w-8 h-8">
                <Image src="/images/shinest-logo.png" alt="SHINEST" fill className="object-contain" />
              </div>
              <span className="font-bold text-xl">SHINEST</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {language === "tr"
                ? "Yaşam alanlarınızı sanat eserine dönüştüren profesyonel iç mimarlık hizmetleri."
                : "Professional interior design services that transform your living spaces into works of art."}
            </p>
            <button
              onClick={openQuoteForm}
              className="bg-[#c4975a] text-white px-6 py-3 rounded-full font-medium hover:bg-[#b8864d] transition-colors"
            >
              {t.links.getQuote}
            </button>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">{t.company}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  {t.links.about}
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-300 hover:text-white transition-colors">
                  {t.links.team}
                </Link>
              </li>
              <li>
                <Link href="/career" className="text-gray-300 hover:text-white transition-colors">
                  {t.links.career}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  {t.links.news}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">{t.services}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services#consulting" className="text-gray-300 hover:text-white transition-colors">
                  {t.links.consulting}
                </Link>
              </li>
              <li>
                <Link href="/services#design" className="text-gray-300 hover:text-white transition-colors">
                  {t.links.design}
                </Link>
              </li>
              <li>
                <Link href="/services#implementation" className="text-gray-300 hover:text-white transition-colors">
                  {t.links.implementation}
                </Link>
              </li>
              <li>
                <Link href="/services#maintenance" className="text-gray-300 hover:text-white transition-colors">
                  {t.links.maintenance}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">{t.contact}</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#c4975a] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">{t.links.address}</p>
                  <p className="text-white">
                    Maslak Mahallesi, Büyükdere Caddesi
                    <br />
                    No: 123, Sarıyer/İstanbul
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#c4975a] flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">{t.links.phone}</p>
                  <a href="tel:+902121234567" className="text-white hover:text-[#c4975a] transition-colors">
                    +90 (212) 123 45 67
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#c4975a] flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">{t.links.email}</p>
                  <a href="mailto:info@shinest.com.tr" className="text-white hover:text-[#c4975a] transition-colors">
                    info@shinest.com.tr
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <span className="text-gray-300 text-sm">{t.links.followUs}</span>
              <div className="flex items-center space-x-4">
                <a
                  href="https://instagram.com/shinest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#c4975a] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com/shinest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#c4975a] transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/shinest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#c4975a] transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/company/shinest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#c4975a] transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            <p className="text-gray-400 text-sm">© 2024 SHINEST İç Mimarlık. {t.links.allRightsReserved}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
