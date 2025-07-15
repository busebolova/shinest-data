"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, ChevronDown, Instagram, Youtube, Linkedin, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

const languages = [
  { code: "TR", name: "Türkçe" },
  { code: "EN", name: "English" },
  { code: "DE", name: "Deutsch" },
  { code: "FR", name: "Français" },
  { code: "IT", name: "Italiano" },
  { code: "RU", name: "Русский" },
  { code: "AR", name: "العربية" },
]

export default function Header() {
  const { currentLanguage, setLanguage, t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

  // Menü açıldığında body'nin scroll'unu engelle
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const menuItems = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.projects"), href: "/projects" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.contact"), href: "/contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f3f0]/95 border-b border-[#e8e2d9]/30">
      <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Sol tarafta - Anasayfaya link */}
          <div className="flex items-center">
            <Link href="/">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 relative cursor-pointer">
                <Image src="/images/shinest-logo.png" alt="SHINEST Logo" fill className="object-contain" priority />
              </div>
            </Link>
          </div>

          {/* Orta kısım - Boş */}
          <div className="flex-1"></div>

          {/* Sağ taraf - Social Media + Language + Menu */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Social Media Icons - Instagram, YouTube, LinkedIn */}
            <Link
              href="https://www.instagram.com/icm.selin"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex text-shinest-blue hover:text-shinest-blue/80 w-10 h-10 rounded-full hover:bg-[#e8e2d9]/50 transition-all duration-300 items-center justify-center"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.youtube.com/@ShinestIcMimarlikk"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex text-shinest-blue hover:text-shinest-blue/80 w-10 h-10 rounded-full hover:bg-[#e8e2d9]/50 transition-all duration-300 items-center justify-center"
            >
              <Youtube className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/shinesticmimarlik"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex text-shinest-blue hover:text-shinest-blue/80 w-10 h-10 rounded-full hover:bg-[#e8e2d9]/50 transition-all duration-300 items-center justify-center"
            >
              <Linkedin className="h-5 w-5" />
            </Link>

            {/* Language Selector - Çok Kompakt Layout */}
            <div className="relative">
              <Button
                variant="ghost"
                className="text-shinest-blue hover:text-shinest-blue/80 font-sans text-xs sm:text-sm flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-full hover:bg-[#e8e2d9]/50 transition-all duration-300"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                {currentLanguage}
                <ChevronDown
                  className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${isLanguageOpen ? "rotate-180" : ""}`}
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
                    {/* Çok Kompakt Grid - 3 sütun, küçük padding */}
                    <div className="grid grid-cols-3 gap-0 p-2 min-w-[180px] max-w-[200px]">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          className="text-center px-2 py-1.5 text-xs text-shinest-blue hover:bg-[#f5f3f0] hover:text-shinest-blue/80 transition-colors duration-200 rounded-md whitespace-nowrap"
                          onClick={() => {
                            setLanguage(lang.code as any)
                            setIsLanguageOpen(false)
                          }}
                        >
                          {lang.code}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Menu Button - Daha Minimal */}
            <Button
              variant="ghost"
              className="text-shinest-blue hover:text-shinest-blue/80 w-12 h-12 sm:w-14 sm:h-14 rounded-full hover:bg-[#e8e2d9]/50 transition-all duration-300 ml-1 sm:ml-2 flex flex-col items-center justify-center gap-1 border border-[#e8e2d9]/30 z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <div className="flex flex-col gap-1.5">
                  <motion.div
                    className="w-5 h-0.5 bg-current rounded-full"
                    animate={{
                      scaleX: isMenuOpen ? 0 : 1,
                      opacity: isMenuOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    className="w-5 h-0.5 bg-current rounded-full"
                    animate={{
                      scaleX: isMenuOpen ? 0 : 1,
                      opacity: isMenuOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                  />
                  <motion.div
                    className="w-5 h-0.5 bg-current rounded-full"
                    animate={{
                      scaleX: isMenuOpen ? 0 : 1,
                      opacity: isMenuOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  />
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Tam Ekran Menü - Buzlu Cam Efekti */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Blur - Siteyi buzlu gösterir */}
            <motion.div
              className="fixed inset-0 backdrop-blur-md bg-white/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Menü İçeriği - Scroll Olmayan Sabit Ekran */}
            <motion.div
              className="fixed inset-0 bg-white/90 backdrop-blur-xl z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-6 py-6 h-screen flex flex-col">
                {/* Üst Header */}
                <div className="flex justify-between items-center flex-shrink-0">
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <div className="w-16 h-16 sm:w-24 sm:h-24 relative cursor-pointer">
                      <Image
                        src="/images/shinest-logo.png"
                        alt="SHINEST Logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    className="text-shinest-blue hover:text-shinest-blue/80 w-12 h-12 sm:w-14 sm:h-14 rounded-full hover:bg-[#e8e2d9]/50 transition-all duration-300 border border-[#e8e2d9]/30"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </div>

                {/* Ana Menü İçeriği - Ortalanmış */}
                <div className="flex-1 flex items-center justify-center">
                  <nav className="text-center">
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        className="mb-3 sm:mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className="font-display text-2xl sm:text-3xl md:text-4xl text-shinest-blue hover:text-shinest-blue/80 transition-colors duration-300 block py-1"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                {/* Social Media - Alt kısım */}
                <motion.div
                  className="flex justify-center space-x-6 py-4 flex-shrink-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: menuItems.length * 0.1 }}
                >
                  <Link
                    href="https://www.instagram.com/icm.selin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-shinest-blue hover:text-shinest-blue/80 w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:bg-[#e8e2d9]/50 transition-all duration-300 border border-[#e8e2d9]/30 flex items-center justify-center"
                  >
                    <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Link>
                  <Link
                    href="https://www.youtube.com/@ShinestIcMimarlikk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-shinest-blue hover:text-shinest-blue/80 w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:bg-[#e8e2d9]/50 transition-all duration-300 border border-[#e8e2d9]/30 flex items-center justify-center"
                  >
                    <Youtube className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/shinesticmimarlik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-shinest-blue hover:text-shinest-blue/80 w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:bg-[#e8e2d9]/50 transition-all duration-300 border border-[#e8e2d9]/30 flex items-center justify-center"
                  >
                    <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
