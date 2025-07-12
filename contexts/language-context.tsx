"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

const translations = {
  tr: {
    navigation: {
      home: "Ana Sayfa",
      about: "Hakkımızda",
      services: "Hizmetler",
      projects: "Projeler",
      blog: "Blog",
      contact: "İletişim",
    },
    footer: {
      company: "SHINEST İç Mimarlık",
      description:
        "Yaşam alanlarınızı sanat eserine dönüştürüyoruz. Modern tasarım anlayışı ile fonksiyonel ve estetik mekanlar yaratıyoruz.",
      quickLinks: "Hızlı Bağlantılar",
      home: "Ana Sayfa",
      about: "Hakkımızda",
      services: "Hizmetler",
      projects: "Projeler",
      blog: "Blog",
      contact: "İletişim",
      contactInfo: "İletişim Bilgileri",
      phone: "+90 (212) 555 0123",
      email: "info@shinest.com.tr",
      address: "Maslak Mahallesi, Büyükdere Caddesi No:123, Sarıyer/İstanbul",
      followUs: "Bizi Takip Edin",
      rights: "Tüm hakları saklıdır.",
    },
  },
  en: {
    navigation: {
      home: "Home",
      about: "About",
      services: "Services",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
    },
    footer: {
      company: "SHINEST Interior Architecture",
      description:
        "We transform your living spaces into works of art. We create functional and aesthetic spaces with a modern design approach.",
      quickLinks: "Quick Links",
      home: "Home",
      about: "About",
      services: "Services",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
      contactInfo: "Contact Information",
      phone: "+90 (212) 555 0123",
      email: "info@shinest.com.tr",
      address: "Maslak District, Büyükdere Street No:123, Sarıyer/Istanbul",
      followUs: "Follow Us",
      rights: "All rights reserved.",
    },
  },
}

type Language = "tr" | "en"
type Translations = typeof translations.tr

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  content: Translations
  isMounted: boolean
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "tr" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const value = {
    language,
    setLanguage: handleSetLanguage,
    content: translations[language],
    isMounted,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
