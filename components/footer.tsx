"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()

  const quickLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.projects"), href: "/projects" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.contact"), href: "/contact" },
  ]

  const services = [
    { name: t("services.consulting"), href: "/services/consulting" },
    { name: t("services.design"), href: "/services/design" },
    { name: t("services.implementation"), href: "/services/implementation" },
    { name: t("services.renovation"), href: "/services/renovation" },
  ]

  return (
    <footer className="bg-shinest-blue text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image src="/images/shinest-logo.png" alt="SHINEST" fill className="object-contain" />
              </div>
              <span className="font-display text-2xl font-bold text-shinest-gold">SHINEST</span>
            </div>
            <p className="font-sans text-gray-300 text-sm leading-relaxed">
              {t("footer.description") ||
                "Hayalinizdeki yaşam alanlarını gerçeğe dönüştürüyoruz. Modern tasarım anlayışı ile estetik ve fonksiyonelliği bir araya getiriyoruz."}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/shinest"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-shinest-gold transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/shinest"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-shinest-gold transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/shinest"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-shinest-gold transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-display text-lg font-semibold text-shinest-gold">
              {t("footer.quickLinks") || "Hızlı Bağlantılar"}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-sans text-gray-300 hover:text-shinest-gold transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="font-display text-lg font-semibold text-shinest-gold">
              {t("footer.services") || "Hizmetlerimiz"}
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="font-sans text-gray-300 hover:text-shinest-gold transition-colors duration-200 text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-display text-lg font-semibold text-shinest-gold">
              {t("footer.contact") || "İletişim"}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-shinest-gold mt-0.5 flex-shrink-0" />
                <p className="font-sans text-gray-300 text-sm">
                  Ataşehir, İstanbul
                  <br />
                  Türkiye
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-shinest-gold flex-shrink-0" />
                <a
                  href="tel:+905551234567"
                  className="font-sans text-gray-300 hover:text-shinest-gold transition-colors duration-200 text-sm"
                >
                  +90 555 123 45 67
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-shinest-gold flex-shrink-0" />
                <a
                  href="mailto:info@shinest.com.tr"
                  className="font-sans text-gray-300 hover:text-shinest-gold transition-colors duration-200 text-sm"
                >
                  info@shinest.com.tr
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-sans text-gray-400 text-sm">
              © 2024 SHINEST. {t("footer.rights") || "Tüm hakları saklıdır."}
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="font-sans text-gray-400 hover:text-shinest-gold transition-colors duration-200 text-sm"
              >
                {t("footer.privacy") || "Gizlilik Politikası"}
              </Link>
              <Link
                href="/terms"
                className="font-sans text-gray-400 hover:text-shinest-gold transition-colors duration-200 text-sm"
              >
                {t("footer.terms") || "Kullanım Şartları"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
