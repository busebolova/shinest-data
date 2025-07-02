"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { motion, AnimatePresence } from "framer-motion"

const languages = [
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    document.body.style.overflow = !isMenuOpen ? "hidden" : "unset"
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.style.overflow = "unset"
  }

  const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/shinest-logo.png"
                alt="SHINEST"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-800 hover:text-amber-600 transition-colors font-medium">
                {t("home")}
              </Link>
              <Link href="/about" className="text-gray-800 hover:text-amber-600 transition-colors font-medium">
                {t("about")}
              </Link>
              <Link href="/services" className="text-gray-800 hover:text-amber-600 transition-colors font-medium">
                {t("services")}
              </Link>
              <Link href="/projects" className="text-gray-800 hover:text-amber-600 transition-colors font-medium">
                {t("projects")}
              </Link>
              <Link href="/blog" className="text-gray-800 hover:text-amber-600 transition-colors font-medium">
                {t("blog")}
              </Link>
              <Link href="/contact" className="text-gray-800 hover:text-amber-600 transition-colors font-medium">
                {t("contact")}
              </Link>
            </nav>

            {/* Language Selector & CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}
                  </span>
                </button>

                <AnimatePresence>
                  {isLanguageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as any)
                            setIsLanguageOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center space-x-3 ${
                            language === lang.code ? "bg-amber-50 text-amber-600" : "text-gray-700"
                          }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className="font-medium">{lang.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/contact"
                className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                {t("getQuote")}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={closeMenu} />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-4 top-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
            >
              <div className="flex flex-col h-full">
                {/* Navigation Links */}
                <nav className="flex-1 flex flex-col justify-center items-center space-y-8 px-8">
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className="text-2xl font-semibold text-gray-800 hover:text-amber-600 transition-colors"
                  >
                    {t("home")}
                  </Link>
                  <Link
                    href="/about"
                    onClick={closeMenu}
                    className="text-2xl font-semibold text-gray-800 hover:text-amber-600 transition-colors"
                  >
                    {t("about")}
                  </Link>
                  <Link
                    href="/services"
                    onClick={closeMenu}
                    className="text-2xl font-semibold text-gray-800 hover:text-amber-600 transition-colors"
                  >
                    {t("services")}
                  </Link>
                  <Link
                    href="/projects"
                    onClick={closeMenu}
                    className="text-2xl font-semibold text-gray-800 hover:text-amber-600 transition-colors"
                  >
                    {t("projects")}
                  </Link>
                  <Link
                    href="/blog"
                    onClick={closeMenu}
                    className="text-2xl font-semibold text-gray-800 hover:text-amber-600 transition-colors"
                  >
                    {t("blog")}
                  </Link>
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="text-2xl font-semibold text-gray-800 hover:text-amber-600 transition-colors"
                  >
                    {t("contact")}
                  </Link>

                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors font-semibold text-lg mt-4"
                  >
                    {t("getQuote")}
                  </Link>
                </nav>

                {/* Language Selector & Social Links */}
                <div className="border-t border-gray-200 p-6">
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any)
                          closeMenu()
                        }}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                          language === lang.code
                            ? "bg-amber-100 text-amber-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.code.toUpperCase()}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-center space-x-6">
                    <a
                      href="https://instagram.com/shinest.design"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-amber-600 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com/company/shinest-design"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-amber-600 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
