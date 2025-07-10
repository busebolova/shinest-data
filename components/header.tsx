"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useQuoteForm } from "@/contexts/quote-form-context"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { openQuoteForm } = useQuoteForm()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Ana Sayfa", href: "/", nameEn: "Home" },
    { name: "Hakkımızda", href: "/about", nameEn: "About" },
    { name: "Hizmetler", href: "/services", nameEn: "Services" },
    { name: "Projeler", href: "/projects", nameEn: "Projects" },
    { name: "Blog", href: "/blog", nameEn: "Blog" },
    { name: "İletişim", href: "/contact", nameEn: "Contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src="/images/shinest-logo.png"
                alt="SHINEST"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 40px, 48px"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors hover:text-[#c4975a] ${
                  isScrolled ? "text-gray-700" : "text-gray-700"
                }`}
              >
                {language === "tr" ? item.name : item.nameEn}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-gray-700 hover:bg-gray-100/10"
                }`}
                onClick={() => setLanguage(language === "tr" ? "en" : "tr")}
              >
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Quote Button */}
            <button
              onClick={openQuoteForm}
              className="bg-[#c4975a] text-white px-6 py-2 rounded-full font-medium hover:bg-[#b8864d] transition-colors"
            >
              {language === "tr" ? "Teklif Al" : "Get Quote"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? "text-gray-700" : "text-gray-700"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? "text-gray-700" : "text-gray-700"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-gray-700 hover:text-[#c4975a] font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {language === "tr" ? item.name : item.nameEn}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <button
                  className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setLanguage(language === "tr" ? "en" : "tr")}
                >
                  <span className="text-sm font-medium">{language.toUpperCase()}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                <button
                  onClick={() => {
                    openQuoteForm()
                    setIsMobileMenuOpen(false)
                  }}
                  className="bg-[#c4975a] text-white px-6 py-2 rounded-full font-medium hover:bg-[#b8864d] transition-colors"
                >
                  {language === "tr" ? "Teklif Al" : "Get Quote"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
