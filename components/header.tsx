"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, ChevronDown, Instagram, Youtube, Linkedin, Globe, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

const languages = [
  { code: "TR", name: "Türkçe" },
  { code: "EN", name: "English" },
]

export function Header() {
  const { currentLanguage, setLanguage, t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const menuItems = [
    { name: t("nav.home") || "Ana Sayfa", href: "/" },
    { name: t("nav.about") || "Hakkımızda", href: "/about" },
    { name: t("nav.services") || "Hizmetler", href: "/services" },
    { name: t("nav.projects") || "Projeler", href: "/projects" },
    { name: t("nav.blog") || "Blog", href: "/blog" },
    { name: t("nav.contact") || "İletişim", href: "/contact" },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f3f0]/95 backdrop-blur-sm border-b border-[#e8e2d9]/30">
        <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 relative cursor-pointer">
                  <Image
                    src="/images/logo1.png"
                    alt="SHINEST Logo"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 80px"
                  />
                </div>
              </Link>
            </div>

            {/* Spacer */}
            <div className="flex-1"></div>

            {/* Right side - Social Media + Language + Menu */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Social Media Icons - Desktop only */}
              <Link
                href="https://www.instagram.com/icm.selin"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex text-[#15415b] hover:text-[#15415b]/80 w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-[#e8e2d9]/50 transition-all duration-300 items-center justify-center"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="https://www.youtube.com/@ShinestIcMimarlikk"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex text-[#15415b] hover:text-[#15415b]/80 w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-[#e8e2d9]/50 transition-all duration-300 items-center justify-center"
              >
                <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/shinesticmimarlik"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex text-[#15415b] hover:text-[#15415b]/80 w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-[#e8e2d9]/50 transition-all duration-300 items-center justify-center"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>

              {/* Language Selector */}
              <div className="relative">
                <Button
                  variant="ghost"
                  className="text-[#15415b] hover:text-[#15415b]/80 font-sans text-xs sm:text-sm flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-2 rounded-full hover:bg-[#e8e2d9]/50 transition-all duration-300"
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                >
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                  {currentLanguage}
                  <ChevronDown
                    className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${
                      isLanguageOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>

                <AnimatePresence>
                  {isLanguageOpen && (
                    <motion.div
                      className="absolute top-full right-0 mt-2 bg-white shadow-xl rounded-xl border border-[#e8e2d9]/50 z-50 overflow-hidden"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex flex-col p-2 min-w-[140px]">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            className="text-left px-3 py-2 text-sm text-[#15415b] hover:bg-[#f5f3f0] hover:text-[#15415b]/80 transition-colors duration-200 rounded-md whitespace-nowrap"
                            onClick={() => {
                              setLanguage(lang.code as any)
                              setIsLanguageOpen(false)
                            }}
                          >
                            {lang.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Menu Button */}
              <Button
                variant="ghost"
                className="text-[#15415b] hover:text-[#15415b]/80 w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:bg-[#e8e2d9]/50 transition-all duration-300 flex items-center justify-center border border-[#e8e2d9]/30"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-white z-[55]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Menu Content */}
            <motion.div
              className="fixed inset-0 bg-white z-[56] overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-6 py-6 h-screen flex flex-col bg-white">
                {/* Header */}
                <div className="flex justify-between items-center flex-shrink-0 bg-white">
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 relative cursor-pointer">
                      <Image
                        src="/images/logo1.png"
                        alt="SHINEST Logo"
                        fill
                        className="object-contain"
                        priority
                        sizes="(max-width: 640px) 64px, 80px"
                      />
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    className="text-[#15415b] hover:text-[#15415b]/80 w-12 h-12 sm:w-14 sm:h-14 rounded-full hover:bg-[#e8e2d9]/50 transition-all duration-300 border border-[#e8e2d9]/30"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                {/* Navigation Menu - Centered */}
                <div className="flex-1 flex items-center justify-center bg-white">
                  <nav className="text-center">
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        className="mb-6 sm:mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#15415b] hover:text-[#c4975a] transition-colors duration-300 block py-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                {/* Social Media - Bottom */}
                <motion.div
                  className="flex justify-center space-x-8 py-6 flex-shrink-0 bg-white"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: menuItems.length * 0.1 }}
                >
                  <Link
                    href="https://www.instagram.com/icm.selin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#15415b] hover:text-[#c4975a] w-12 h-12 sm:w-14 sm:h-14 rounded-full hover:bg-[#e8e2d9]/50 transition-all duration-300 border border-[#e8e2d9]/30 flex items-center justify-center"
                  >
                    <Instagram className="h-6 w-6 sm:h-7 sm:w-7" />
                  </Link>
                  <Link
                    href="https://www.youtube.com/@ShinestIcMimarlikk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#15415b] hover:text-[#c4975a] w-12 h-12 sm:w-14 sm:h-14 rounded-full hover:bg-[#e8e2d9]/50 transition-all duration-300 border border-[#e8e2d9]/30 flex items-center justify-center"
                  >
                    <Youtube className="h-6 w-6 sm:h-7 sm:w-7" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/shinesticmimarlik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#15415b] hover:text-[#c4975a] w-12 h-12 sm:w-14 sm:h-14 rounded-full hover:bg-[#e8e2d9]/50 transition-all duration-300 border border-[#e8e2d9]/30 flex items-center justify-center"
                  >
                    <Linkedin className="h-6 w-6 sm:h-7 sm:w-7" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
