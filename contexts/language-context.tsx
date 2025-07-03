"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "TR" | "EN"

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  TR: {
    "nav.home": "Ana Sayfa",
    "nav.about": "Hakkımızda",
    "nav.services": "Hizmetler",
    "nav.projects": "Projeler",
    "nav.blog": "Blog",
    "nav.contact": "İletişim",
  },
  EN: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("TR")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && (saved === "TR" || saved === "EN")) {
      setCurrentLanguage(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[currentLanguage][key as keyof typeof translations.TR] || key
  }

  return <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
