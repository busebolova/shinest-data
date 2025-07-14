"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "tr" | "en" | "de" | "fr" | "it" | "ru" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  tr: {
    "nav.home": "Ana Sayfa",
    "nav.about": "Hakkımızda",
    "nav.services": "Hizmetler",
    "nav.projects": "Projeler",
    "nav.blog": "Blog",
    "nav.contact": "İletişim",
    "nav.getQuote": "Teklif Al",
    "footer.description":
      "Hayalinizdeki yaşam alanlarını gerçeğe dönüştürüyoruz. Modern tasarım anlayışı ile estetik ve fonksiyonelliği bir araya getiriyoruz.",
    "footer.quickLinks": "Hızlı Bağlantılar",
    "footer.services": "Hizmetlerimiz",
    "footer.stayConnected": "Bağlantıda Kalın",
    "footer.newsletterText": "En son haberler ve projelerimizden haberdar olun.",
    "footer.emailPlaceholder": "E-posta adresiniz",
    "footer.subscribe": "Abone Ol",
    "footer.followUs": "Bizi Takip Edin",
    "footer.getQuote": "Teklif Al",
    "footer.allRightsReserved": "Tüm hakları saklıdır.",
    "footer.privacy": "Gizlilik Politikası",
    "footer.terms": "Kullanım Şartları",
    "footer.madeWith": "❤️ ile yapıldı",
    "footer.inTurkey": "Türkiye'de",
    "services.consulting": "Danışmanlık",
    "services.design": "Tasarım",
    "services.implementation": "Uygulama",
    "services.renovation": "Renovasyon",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.getQuote": "Get Quote",
    "footer.description":
      "We transform your dream living spaces into reality. Combining aesthetics and functionality with modern design approach.",
    "footer.quickLinks": "Quick Links",
    "footer.services": "Our Services",
    "footer.stayConnected": "Stay Connected",
    "footer.newsletterText": "Stay updated with our latest news and projects.",
    "footer.emailPlaceholder": "Your email address",
    "footer.subscribe": "Subscribe",
    "footer.followUs": "Follow Us",
    "footer.getQuote": "Get Quote",
    "footer.allRightsReserved": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.madeWith": "Made with ❤️",
    "footer.inTurkey": "in Turkey",
    "services.consulting": "Consulting",
    "services.design": "Design",
    "services.implementation": "Implementation",
    "services.renovation": "Renovation",
  },
  de: {
    "nav.home": "Startseite",
    "nav.about": "Über uns",
    "nav.services": "Dienstleistungen",
    "nav.projects": "Projekte",
    "nav.blog": "Blog",
    "nav.contact": "Kontakt",
    "nav.getQuote": "Angebot erhalten",
    "footer.description":
      "Wir verwandeln Ihre Traumwohnräume in die Realität. Ästhetik und Funktionalität mit modernem Designansatz kombinieren.",
    "footer.quickLinks": "Schnelle Links",
    "footer.services": "Unsere Dienstleistungen",
    "footer.stayConnected": "Verbunden bleiben",
    "footer.newsletterText": "Bleiben Sie über unsere neuesten Nachrichten und Projekte auf dem Laufenden.",
    "footer.emailPlaceholder": "Ihre E-Mail-Adresse",
    "footer.subscribe": "Abonnieren",
    "footer.followUs": "Folgen Sie uns",
    "footer.getQuote": "Angebot erhalten",
    "footer.allRightsReserved": "Alle Rechte vorbehalten.",
    "footer.privacy": "Datenschutz-Bestimmungen",
    "footer.terms": "Nutzungsbedingungen",
    "footer.madeWith": "Mit ❤️ gemacht",
    "footer.inTurkey": "in der Türkei",
    "services.consulting": "Beratung",
    "services.design": "Design",
    "services.implementation": "Umsetzung",
    "services.renovation": "Renovierung",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.services": "Services",
    "nav.projects": "Projets",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.getQuote": "Obtenir un devis",
    "footer.description":
      "Nous transformons vos espaces de vie de rêve en réalité. Combinant esthétique et fonctionnalité avec une approche de design moderne.",
    "footer.quickLinks": "Liens rapides",
    "footer.services": "Nos services",
    "footer.stayConnected": "Restez connecté",
    "footer.newsletterText": "Restez informé de nos dernières nouvelles et projets.",
    "footer.emailPlaceholder": "Votre adresse e-mail",
    "footer.subscribe": "S'abonner",
    "footer.followUs": "Suivez-nous",
    "footer.getQuote": "Obtenir un devis",
    "footer.allRightsReserved": "Tous droits réservés.",
    "footer.privacy": "Politique de confidentialité",
    "footer.terms": "Conditions d'utilisation",
    "footer.madeWith": "Fait avec ❤️",
    "footer.inTurkey": "en Turquie",
    "services.consulting": "Conseil",
    "services.design": "Design",
    "services.implementation": "Mise en œuvre",
    "services.renovation": "Rénovation",
  },
  it: {
    "nav.home": "Home",
    "nav.about": "Chi siamo",
    "nav.services": "Servizi",
    "nav.projects": "Progetti",
    "nav.blog": "Blog",
    "nav.contact": "Contatto",
    "nav.getQuote": "Ottieni preventivo",
    "footer.description":
      "Trasformiamo i tuoi spazi abitativi da sogno in realtà. Combinando estetica e funzionalità con un approccio di design moderno.",
    "footer.quickLinks": "Link veloci",
    "footer.services": "I nostri servizi",
    "footer.stayConnected": "Rimani connesso",
    "footer.newsletterText": "Rimani aggiornato con le nostre ultime notizie e progetti.",
    "footer.emailPlaceholder": "Il tuo indirizzo email",
    "footer.subscribe": "Iscriviti",
    "footer.followUs": "Seguici",
    "footer.getQuote": "Ottieni preventivo",
    "footer.allRightsReserved": "Tutti i diritti riservati.",
    "footer.privacy": "Informativa sulla privacy",
    "footer.terms": "Termini di servizio",
    "footer.madeWith": "Fatto con ❤️",
    "footer.inTurkey": "in Turchia",
    "services.consulting": "Consulenza",
    "services.design": "Design",
    "services.implementation": "Implementazione",
    "services.renovation": "Ristrutturazione",
  },
  ru: {
    "nav.home": "Главная",
    "nav.about": "О нас",
    "nav.services": "Услуги",
    "nav.projects": "Проекты",
    "nav.blog": "Блог",
    "nav.contact": "Контакты",
    "nav.getQuote": "Получить предложение",
    "footer.description":
      "Мы превращаем ваши мечты о жилых пространствах в реальность. Сочетая эстетику и функциональность с современным подходом к дизайну.",
    "footer.quickLinks": "Быстрые ссылки",
    "footer.services": "Наши услуги",
    "footer.stayConnected": "Оставайтесь на связи",
    "footer.newsletterText": "Будьте в курсе наших последних новостей и проектов.",
    "footer.emailPlaceholder": "Ваш адрес электронной почты",
    "footer.subscribe": "Подписаться",
    "footer.followUs": "Подписывайтесь на нас",
    "footer.getQuote": "Получить предложение",
    "footer.allRightsReserved": "Все права защищены.",
    "footer.privacy": "Политика конфиденциальности",
    "footer.terms": "Условия обслуживания",
    "footer.madeWith": "Сделано с ❤️",
    "footer.inTurkey": "в Турции",
    "services.consulting": "Консультации",
    "services.design": "Дизайн",
    "services.implementation": "Реализация",
    "services.renovation": "Ремонт",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.services": "الخدمات",
    "nav.projects": "المشاريع",
    "nav.blog": "المدونة",
    "nav.contact": "اتصل بنا",
    "nav.getQuote": "احصل على عرض سعر",
    "footer.description":
      "نحن نحول مساحات المعيشة التي تحلم بها إلى واقع. الجمع بين الجماليات والوظائف مع نهج التصميم الحديث.",
    "footer.quickLinks": "روابط سريعة",
    "footer.services": "خدماتنا",
    "footer.stayConnected": "ابق على اتصال",
    "footer.newsletterText": "ابق على اطلاع بأحدث أخبارنا ومشاريعنا.",
    "footer.emailPlaceholder": "عنوان بريدك الإلكتروني",
    "footer.subscribe": "اشترك",
    "footer.followUs": "تابعنا",
    "footer.getQuote": "احصل على عرض سعر",
    "footer.allRightsReserved": "جميع الحقوق محفوظة.",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الخدمة",
    "footer.madeWith": "صنع بـ ❤️",
    "footer.inTurkey": "في تركيا",
    "services.consulting": "استشارات",
    "services.design": "تصميم",
    "services.implementation": "تنفيذ",
    "services.renovation": "تجديد",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language]?.[key as keyof (typeof translations)[typeof language]] || key
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
