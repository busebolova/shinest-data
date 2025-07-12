"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, content, isMounted } = useLanguage()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!isMounted) {
    return (
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3 z-10">
              <div className="relative w-20 h-20 overflow-hidden">
                <Image src="/images/shinest-logo.png" alt="SHINEST Logo" fill className="object-contain" priority />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="lg:hidden p-2">
                <Menu size={24} className="text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  const navContent = content.navigation

  const handleLanguageChange = (lang: "tr" | "en") => {
    setLanguage(lang)
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
      style={{ fontFamily: "var(--font-poppins)" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3 z-10">
            <div className="relative w-20 h-20 overflow-hidden">
              <Image src="/images/shinest-logo.png" alt="SHINEST Logo" fill className="object-contain" priority />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-[#15415b] transition-colors duration-300 font-medium">
                {navContent.home}
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-[#15415b] transition-colors duration-300 font-medium"
              >
                {navContent.about}
              </Link>
              <Link
                href="/services"
                className="text-gray-700 hover:text-[#15415b] transition-colors duration-300 font-medium"
              >
                {navContent.services}
              </Link>
              <Link
                href="/projects"
                className="text-gray-700 hover:text-[#15415b] transition-colors duration-300 font-medium"
              >
                {navContent.projects}
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-[#15415b] transition-colors duration-300 font-medium"
              >
                {navContent.blog}
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-[#15415b] transition-colors duration-300 font-medium"
              >
                {navContent.contact}
              </Link>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
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

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#15415b] transition-colors duration-300 z-10"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden fixed inset-0 bg-white z-0"
            >
              <nav className="flex flex-col items-center justify-center h-full space-y-6 text-xl">
                <Link href="/" className="text-gray-700 hover:text-[#15415b]" onClick={() => setIsMenuOpen(false)}>
                  {navContent.home}
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-[#15415b]" onClick={() => setIsMenuOpen(false)}>
                  {navContent.about}
                </Link>
                <Link
                  href="/services"
                  className="text-gray-700 hover:text-[#15415b]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {navContent.services}
                </Link>
                <Link
                  href="/projects"
                  className="text-gray-700 hover:text-[#15415b]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {navContent.projects}
                </Link>
                <Link href="/blog" className="text-gray-700 hover:text-[#15415b]" onClick={() => setIsMenuOpen(false)}>
                  {navContent.blog}
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-[#15415b]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {navContent.contact}
                </Link>

                <div className="pt-8">
                  <div className="flex items-center space-x-4">
                    <Globe size={20} className="text-gray-500" />
                    <button
                      onClick={() => handleLanguageChange("tr")}
                      className={`px-3 py-1 text-lg font-medium rounded transition-colors duration-300 ${
                        language === "tr" ? "bg-[#15415b] text-white" : "text-gray-500"
                      }`}
                    >
                      Türkçe
                    </button>
                    <button
                      onClick={() => handleLanguageChange("en")}
                      className={`px-3 py-1 text-lg font-medium rounded transition-colors duration-300 ${
                        language === "en" ? "bg-[#15415b] text-white" : "text-gray-500"
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
