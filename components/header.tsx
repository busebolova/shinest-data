"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useQuoteForm } from "@/contexts/quote-form-context"

const languages = [
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
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
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.projects"), href: "/projects" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.contact"), href: "/contact" },
  ]

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-12 h-12">
              <Image src="/images/shinest-logo.png" alt="SHINEST Logo" fill className="object-contain" priority />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-sans text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href) ? "text-shinest-gold" : "text-gray-800 hover:text-shinest-gold"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 text-gray-800 hover:bg-gray-100"
              >
                <Globe className="w-4 h-4" />
                <span className="font-sans text-sm font-medium">{currentLanguage.flag}</span>
                <span className="font-sans text-sm font-medium uppercase">{language}</span>
              </button>

              {isLanguageOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any)
                        setIsLanguageOpen(false)
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 ${
                        language === lang.code ? "bg-blue-50 text-shinest-blue" : "text-gray-700"
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-sans text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quote Button */}
            <button
              onClick={openQuoteForm}
              className="bg-shinest-gold text-white px-6 py-2 rounded-lg font-sans font-medium hover:bg-shinest-gold/90 transition-all duration-200 hover:shadow-lg"
            >
              {t("nav.getQuote")}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors duration-200 text-gray-800 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <nav className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block font-sans text-lg font-medium transition-colors duration-200 ${
                    isActive(item.href) ? "text-shinest-gold" : "text-gray-700 hover:text-shinest-gold"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
              {/* Mobile Language Switcher */}
              <div>
                <p className="font-sans text-sm font-medium text-gray-500 mb-3">Dil / Language</p>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any)
                        setIsMenuOpen(false)
                      }}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                        language === lang.code ? "bg-blue-50 text-shinest-blue" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="font-sans text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Quote Button */}
              <button
                onClick={() => {
                  openQuoteForm()
                  setIsMenuOpen(false)
                }}
                className="w-full bg-shinest-gold text-white px-6 py-3 rounded-lg font-sans font-medium hover:bg-shinest-gold/90 transition-all duration-200"
              >
                {t("nav.getQuote")}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
