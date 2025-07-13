"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = {
    tr: [
      { name: "Ana Sayfa", href: "/" },
      { name: "Hakkımızda", href: "/about" },
      { name: "Hizmetlerimiz", href: "/services" },
      { name: "Projelerimiz", href: "/projects" },
      { name: "Blog", href: "/blog" },
      { name: "İletişim", href: "/contact" },
    ],
    en: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Projects", href: "/projects" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
  }

  const currentNavigation = navigation[language]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
      }`}
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo - Bigger */}
          <Link href="/" className="flex items-center">
            <div className="relative w-20 h-20 overflow-hidden">
              <Image
                src="/images/shinest-logo.png"
                alt="SHINEST Logo"
                fill
                className="object-contain hover:scale-110 transition-transform duration-300"
                sizes="80px"
              />
            </div>
          </Link>

          {/* Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              {currentNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-[#c4975a] font-medium transition-colors duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c4975a] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Language Switcher - Right */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => setLanguage("tr")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                language === "tr" ? "bg-[#c4975a] text-white" : "text-gray-600 hover:text-[#c4975a] hover:bg-gray-100"
              }`}
            >
              TR
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                language === "en" ? "bg-[#c4975a] text-white" : "text-gray-600 hover:text-[#c4975a] hover:bg-gray-100"
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#c4975a] transition-colors duration-300"
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
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {currentNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 hover:text-[#c4975a] font-medium transition-colors duration-300 py-2"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setLanguage("tr")
                    setIsMenuOpen(false)
                  }}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                    language === "tr"
                      ? "bg-[#c4975a] text-white"
                      : "text-gray-600 hover:text-[#c4975a] hover:bg-gray-100"
                  }`}
                >
                  TR
                </button>
                <button
                  onClick={() => {
                    setLanguage("en")
                    setIsMenuOpen(false)
                  }}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                    language === "en"
                      ? "bg-[#c4975a] text-white"
                      : "text-gray-600 hover:text-[#c4975a] hover:bg-gray-100"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
