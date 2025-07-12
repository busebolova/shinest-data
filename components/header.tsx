"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Globe } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState<"tr" | "en">("tr")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as "tr" | "en"
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleLanguageChange = (lang: "tr" | "en") => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const content = {
    tr: {
      home: "Ana Sayfa",
      about: "Hakkımızda",
      services: "Hizmetler",
      projects: "Projeler",
      blog: "Blog",
      contact: "İletişim",
    },
    en: {
      home: "Home",
      about: "About",
      services: "Services",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
    },
  }

  const currentContent = content[language]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-20 h-20 overflow-hidden">
              <Image src="/images/shinest-logo.png" alt="SHINEST Logo" fill className="object-contain" priority />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-[#15415b] transition-colors duration-300 font-medium">
                {currentContent.home}
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-[#15415b] transition-colors duration-300 font-medium"
              >
                {currentContent.about}
              </Link>
              <Link
                href="/services"
                className="text-gray-700 hover:text-[#15415b] transition-colors duration-300 font-medium"
              >
                {currentContent.services}
              </Link>
              <Link
                href="/projects"
                className="text-gray-700 hover:text-[#15415b] transition-colors duration-300 font-medium"
              >
                {currentContent.projects}
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-[#15415b] transition-colors duration-300 font-medium"
              >
                {currentContent.blog}
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-[#15415b] transition-colors duration-300 font-medium"
              >
                {currentContent.contact}
              </Link>
            </div>
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher - Desktop */}
            <div className="hidden lg:flex items-center space-x-2">
              <Globe size={16} className="text-gray-500" />
              <button
                onClick={() => handleLanguageChange("tr")}
                className={`px-2 py-1 text-sm font-medium transition-colors duration-300 ${
                  language === "tr" ? "text-[#15415b]" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                TR
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-2 py-1 text-sm font-medium transition-colors duration-300 ${
                  language === "en" ? "text-[#15415b]" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#15415b] transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-200"
            >
              <nav className="py-4 space-y-4">
                <Link
                  href="/"
                  className="block px-4 py-2 text-gray-700 hover:text-[#15415b] hover:bg-gray-50 transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {currentContent.home}
                </Link>
                <Link
                  href="/about"
                  className="block px-4 py-2 text-gray-700 hover:text-[#15415b] hover:bg-gray-50 transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {currentContent.about}
                </Link>
                <Link
                  href="/services"
                  className="block px-4 py-2 text-gray-700 hover:text-[#15415b] hover:bg-gray-50 transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {currentContent.services}
                </Link>
                <Link
                  href="/projects"
                  className="block px-4 py-2 text-gray-700 hover:text-[#15415b] hover:bg-gray-50 transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {currentContent.projects}
                </Link>
                <Link
                  href="/blog"
                  className="block px-4 py-2 text-gray-700 hover:text-[#15415b] hover:bg-gray-50 transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {currentContent.blog}
                </Link>
                <Link
                  href="/contact"
                  className="block px-4 py-2 text-gray-700 hover:text-[#15415b] hover:bg-gray-50 transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {currentContent.contact}
                </Link>

                {/* Mobile Language Switcher */}
                <div className="px-4 py-2 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <Globe size={16} className="text-gray-500" />
                    <button
                      onClick={() => {
                        handleLanguageChange("tr")
                        setIsMenuOpen(false)
                      }}
                      className={`px-3 py-1 text-sm font-medium rounded transition-colors duration-300 ${
                        language === "tr" ? "bg-[#15415b] text-white" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Türkçe
                    </button>
                    <button
                      onClick={() => {
                        handleLanguageChange("en")
                        setIsMenuOpen(false)
                      }}
                      className={`px-3 py-1 text-sm font-medium rounded transition-colors duration-300 ${
                        language === "en" ? "bg-[#15415b] text-white" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
