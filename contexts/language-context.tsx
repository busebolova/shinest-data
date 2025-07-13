"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "tr" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  tr: {
    home: "Ana Sayfa",
    about: "Hakkımızda",
    services: "Hizmetler",
    projects: "Projeler",
    blog: "Blog",
    contact: "İletişim",
    getQuote: "Teklif Al",
    ourServices: "Hizmetlerimiz",
    consulting: "Danışmanlık",
    design: "Tasarım",
    implementation: "Uygulama",
    viewDetails: "Detayları Gör",
    allProjects: "Tüm Projeler",
    readMore: "Devamını Oku",
    contactUs: "Bize Ulaşın",
    phone: "Telefon",
    email: "E-posta",
    address: "Adres",
    followUs: "Bizi Takip Edin",
  },
  en: {
    home: "Home",
    about: "About",
    services: "Services",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact",
    getQuote: "Get Quote",
    ourServices: "Our Services",
    consulting: "Consulting",
    design: "Design",
    implementation: "Implementation",
    viewDetails: "View Details",
    allProjects: "All Projects",
    readMore: "Read More",
    contactUs: "Contact Us",
    phone: "Phone",
    email: "Email",
    address: "Address",
    followUs: "Follow Us",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr")

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.tr] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
