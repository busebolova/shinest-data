"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "tr" | "en" | "de" | "fr" | "es" | "it" | "ru"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  tr: {
    home: "Ana Sayfa",
    about: "Hakkımızda",
    services: "Hizmetler",
    projects: "Projeler",
    blog: "Blog",
    contact: "İletişim",
    getQuote: "Teklif Al",
    heroTitle: "Modern İç Mimari Çözümleri",
    heroSubtitle: "Yaşam alanlarınızı hayallerinizle buluşturuyoruz",
    aboutTitle: "Hakkımızda",
    aboutText: "SHINEST olarak, modern yaşamın gereksinimlerini karşılayan özgün tasarımlar yaratıyoruz.",
    servicesTitle: "Hizmetlerimiz",
    projectsTitle: "Projelerimiz",
    contactTitle: "İletişim",
    phone: "Telefon",
    email: "E-posta",
    address: "Adres",
    followUs: "Bizi Takip Edin",
    allRightsReserved: "Tüm hakları saklıdır.",
    consulting: "Danışmanlık",
    design: "Tasarım",
    implementation: "Uygulama",
    consultingDesc: "Profesyonel iç mimari danışmanlık hizmetleri",
    designDesc: "Yaratıcı ve fonksiyonel tasarım çözümleri",
    implementationDesc: "Projelerinizin kusursuz uygulanması",
  },
  en: {
    home: "Home",
    about: "About",
    services: "Services",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact",
    getQuote: "Get Quote",
    heroTitle: "Modern Interior Design Solutions",
    heroSubtitle: "We bring your living spaces together with your dreams",
    aboutTitle: "About Us",
    aboutText: "As SHINEST, we create original designs that meet the requirements of modern life.",
    servicesTitle: "Our Services",
    projectsTitle: "Our Projects",
    contactTitle: "Contact",
    phone: "Phone",
    email: "Email",
    address: "Address",
    followUs: "Follow Us",
    allRightsReserved: "All rights reserved.",
    consulting: "Consulting",
    design: "Design",
    implementation: "Implementation",
    consultingDesc: "Professional interior design consulting services",
    designDesc: "Creative and functional design solutions",
    implementationDesc: "Perfect implementation of your projects",
  },
  de: {
    home: "Startseite",
    about: "Über uns",
    services: "Dienstleistungen",
    projects: "Projekte",
    blog: "Blog",
    contact: "Kontakt",
    getQuote: "Angebot erhalten",
    heroTitle: "Moderne Innenarchitektur-Lösungen",
    heroSubtitle: "Wir bringen Ihre Wohnräume mit Ihren Träumen zusammen",
    aboutTitle: "Über uns",
    aboutText: "Als SHINEST schaffen wir originelle Designs, die den Anforderungen des modernen Lebens entsprechen.",
    servicesTitle: "Unsere Dienstleistungen",
    projectsTitle: "Unsere Projekte",
    contactTitle: "Kontakt",
    phone: "Telefon",
    email: "E-Mail",
    address: "Adresse",
    followUs: "Folgen Sie uns",
    allRightsReserved: "Alle Rechte vorbehalten.",
    consulting: "Beratung",
    design: "Design",
    implementation: "Umsetzung",
    consultingDesc: "Professionelle Innenarchitektur-Beratung",
    designDesc: "Kreative und funktionale Design-Lösungen",
    implementationDesc: "Perfekte Umsetzung Ihrer Projekte",
  },
  fr: {
    home: "Accueil",
    about: "À propos",
    services: "Services",
    projects: "Projets",
    blog: "Blog",
    contact: "Contact",
    getQuote: "Obtenir un devis",
    heroTitle: "Solutions de Design d'Intérieur Modernes",
    heroSubtitle: "Nous réunissons vos espaces de vie avec vos rêves",
    aboutTitle: "À propos de nous",
    aboutText: "En tant que SHINEST, nous créons des designs originaux qui répondent aux exigences de la vie moderne.",
    servicesTitle: "Nos Services",
    projectsTitle: "Nos Projets",
    contactTitle: "Contact",
    phone: "Téléphone",
    email: "E-mail",
    address: "Adresse",
    followUs: "Suivez-nous",
    allRightsReserved: "Tous droits réservés.",
    consulting: "Conseil",
    design: "Design",
    implementation: "Mise en œuvre",
    consultingDesc: "Services de conseil en architecture d'intérieur professionnels",
    designDesc: "Solutions de design créatives et fonctionnelles",
    implementationDesc: "Mise en œuvre parfaite de vos projets",
  },
  es: {
    home: "Inicio",
    about: "Acerca de",
    services: "Servicios",
    projects: "Proyectos",
    blog: "Blog",
    contact: "Contacto",
    getQuote: "Obtener cotización",
    heroTitle: "Soluciones Modernas de Diseño Interior",
    heroSubtitle: "Unimos sus espacios de vida con sus sueños",
    aboutTitle: "Acerca de nosotros",
    aboutText: "Como SHINEST, creamos diseños originales que satisfacen los requisitos de la vida moderna.",
    servicesTitle: "Nuestros Servicios",
    projectsTitle: "Nuestros Proyectos",
    contactTitle: "Contacto",
    phone: "Teléfono",
    email: "Correo electrónico",
    address: "Dirección",
    followUs: "Síguenos",
    allRightsReserved: "Todos los derechos reservados.",
    consulting: "Consultoría",
    design: "Diseño",
    implementation: "Implementación",
    consultingDesc: "Servicios profesionales de consultoría en diseño interior",
    designDesc: "Soluciones de diseño creativas y funcionales",
    implementationDesc: "Implementación perfecta de sus proyectos",
  },
  it: {
    home: "Home",
    about: "Chi siamo",
    services: "Servizi",
    projects: "Progetti",
    blog: "Blog",
    contact: "Contatto",
    getQuote: "Richiedi preventivo",
    heroTitle: "Soluzioni Moderne di Design d'Interni",
    heroSubtitle: "Uniamo i tuoi spazi abitativi con i tuoi sogni",
    aboutTitle: "Chi siamo",
    aboutText: "Come SHINEST, creiamo design originali che soddisfano i requisiti della vita moderna.",
    servicesTitle: "I Nostri Servizi",
    projectsTitle: "I Nostri Progetti",
    contactTitle: "Contatto",
    phone: "Telefono",
    email: "Email",
    address: "Indirizzo",
    followUs: "Seguici",
    allRightsReserved: "Tutti i diritti riservati.",
    consulting: "Consulenza",
    design: "Design",
    implementation: "Implementazione",
    consultingDesc: "Servizi professionali di consulenza per il design d'interni",
    designDesc: "Soluzioni di design creative e funzionali",
    implementationDesc: "Implementazione perfetta dei tuoi progetti",
  },
  ru: {
    home: "Главная",
    about: "О нас",
    services: "Услуги",
    projects: "Проекты",
    blog: "Блог",
    contact: "Контакты",
    getQuote: "Получить предложение",
    heroTitle: "Современные решения дизайна интерьера",
    heroSubtitle: "Мы объединяем ваши жилые пространства с вашими мечтами",
    aboutTitle: "О нас",
    aboutText: "Как SHINEST, мы создаем оригинальные дизайны, которые отвечают требованиям современной жизни.",
    servicesTitle: "Наши услуги",
    projectsTitle: "Наши проекты",
    contactTitle: "Контакты",
    phone: "Телефон",
    email: "Электронная почта",
    address: "Адрес",
    followUs: "Подписывайтесь на нас",
    allRightsReserved: "Все права защищены.",
    consulting: "Консультации",
    design: "Дизайн",
    implementation: "Реализация",
    consultingDesc: "Профессиональные консультационные услуги по дизайну интерьера",
    designDesc: "Креативные и функциональные дизайнерские решения",
    implementationDesc: "Идеальная реализация ваших проектов",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
