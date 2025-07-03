"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "TR" | "EN" | "DE" | "FR" | "IT" | "RU" | "AR"

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  TR: {
    // Header & Navigation
    "nav.home": "ANASAYFA",
    "nav.about": "HAKKIMIZDA",
    "nav.services": "HİZMETLERİMİZ",
    "nav.projects": "PROJELERİMİZ",
    "nav.blog": "BLOG",
    "nav.contact": "İLETİŞİM",

    // Hero Section
    "hero.company": "SHINEST",
    "hero.subtitle": "İÇ MİMARLIK",

    // About Section
    "about.title": "Hakkımızda",
    "about.description":
      "SHINEST İç mekanlar teklifler tam kapsamlı lüks iç mekan tasarım hizmetleri — ilk konsept ve estetik danışmanlıktan koordinasyon, uygulama ve dergiye layık son dokunuşlara kadar.",
    "about.portfolio": "PORTFÖY",
    "about.services": "HİZMETLER",
    "about.contact": "İLETİŞİM",
    "about.vision": "Vizyon",
    "about.mission": "Misyon",
    "about.values": "Değerlerimiz",
    "about.innovation": "Yenilikçilik",
    "about.quality": "Kalite",
    "about.sustainability": "Sürdürülebilirlik",

    // Text Section
    "text.main1": "MEKANLARINIZ",
    "text.main2": "YAŞAMINIZA",
    "text.handwriting": "ışık tutar!",
    "text.description":
      "SHINEST İç Mimarlık, tam kapsamlı lüks iç mekan tasarım hizmetleri sunar — ilk konsept ve estetik danışmanlıktan koordinasyon, uygulama ve dergiye layık son dokunuşlara kadar.",

    // Services
    "services.title": "Hizmetlerimiz",
    "services.consulting": "Danışmanlık / Online Danışmanlık",
    "services.design": "Tasarım",
    "services.implementation": "Uygulama",
    "services.consulting.desc":
      "Uzaktan ve yüz yüze profesyonel iç mimarlık danışmanlığı hizmetleri. Mekanınızın potansiyelini keşfetmek için uzman görüşü alın.",
    "services.design.desc":
      "Yaratıcı ve işlevsel iç mekan tasarım çözümleri. Konsept geliştirmeden 3D görselleştirmeye kadar kapsamlı tasarım hizmetleri.",
    "services.implementation.desc":
      "Tasarımdan gerçeğe dönüşüm süreci. Proje yönetimi, koordinasyon ve kaliteli işçilikle hayalinizdeki mekanı yaratıyoruz.",
    "services.details": "Detaylar",
    "services.getQuote": "Teklif Alın",

    // Projects
    "projects.title": "Projelerimiz",
    "projects.modern.villa": "Modern Villa",
    "projects.penthouse": "Penthouse Suite",
    "projects.boutique.hotel": "Boutique Hotel",
    "projects.istanbul": "İstanbul",
    "projects.dubai": "Dubai",
    "projects.paris": "Paris",

    // Contact
    "contact.title": "İletişim",
    "contact.email": "E-posta",
    "contact.phone": "Telefon",
    "contact.city": "Şehir",
    "contact.izmir": "İzmir",

    // Blog
    "blog.title": "Blog",
    "blog.trends": "İç Mimaride 2024 Trendleri",
    "blog.small.spaces": "Küçük Mekanları Büyük Gösterme Sanatı",
    "blog.sustainable": "Sürdürülebilir İç Mimari Çözümler",

    // Footer
    "footer.description": "İç mimarlık ve tasarım hizmetleri ile yaşam alanlarınızı sanat eserine dönüştürüyoruz.",
    "footer.quickLinks": "Hızlı Linkler",
    "footer.contact": "İletişim",
    "footer.copyright": "© 2025 SHINEST İç Mimarlık. Tüm hakları saklıdır.",
    "footer.design": "Tasarım ve yazılım:",
    "footer.privacy": "Gizlilik Politikası",
    "footer.terms": "Kullanım Şartları",

    // Loading
    "loading.progress": "Yükleniyor...",

    // Common
    "common.readMore": "Devamını Oku",
    "common.learnMore": "Daha Fazla Bilgi",
    "common.contactUs": "İletişime Geçin",
    "common.viewAll": "Tümünü Görüntüle",
  },

  EN: {
    // Header & Navigation
    "nav.home": "HOME",
    "nav.about": "ABOUT",
    "nav.services": "SERVICES",
    "nav.projects": "PROJECTS",
    "nav.blog": "BLOG",
    "nav.contact": "CONTACT",

    // Hero Section
    "hero.company": "SHINEST",
    "hero.subtitle": "INTERIOR ARCHITECTURE",

    // About Section
    "about.title": "About Us",
    "about.description":
      "SHINEST Interiors offers comprehensive luxury interior design services — from initial concept and aesthetic consultation to coordination, implementation and magazine-worthy finishing touches.",
    "about.portfolio": "PORTFOLIO",
    "about.services": "SERVICES",
    "about.contact": "CONTACT",
    "about.vision": "Vision",
    "about.mission": "Mission",
    "about.values": "Values",
    "about.innovation": "Innovation",
    "about.quality": "Quality",
    "about.sustainability": "Sustainability",

    // Text Section
    "text.main1": "YOUR SPACES",
    "text.main2": "BRING LIGHT TO",
    "text.handwriting": "your life!",
    "text.description":
      "SHINEST Interior Architecture offers comprehensive luxury interior design services — from initial concept and aesthetic consultation to coordination, implementation and magazine-worthy finishing touches.",

    // Services
    "services.title": "Our Services",
    "services.consulting": "Consulting / Online Consulting",
    "services.design": "Design",
    "services.implementation": "Implementation",
    "services.consulting.desc":
      "Remote and face-to-face professional interior architecture consulting services. Get expert opinion to discover your space's potential.",
    "services.design.desc":
      "Creative and functional interior design solutions. Comprehensive design services from concept development to 3D visualization.",
    "services.implementation.desc":
      "Design to reality transformation process. Creating your dream space with project management, coordination and quality craftsmanship.",
    "services.details": "Details",
    "services.getQuote": "Get Quote",

    // Projects
    "projects.title": "Our Projects",
    "projects.modern.villa": "Modern Villa",
    "projects.penthouse": "Penthouse Suite",
    "projects.boutique.hotel": "Boutique Hotel",
    "projects.istanbul": "Istanbul",
    "projects.dubai": "Dubai",
    "projects.paris": "Paris",

    // Contact
    "contact.title": "Contact",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.city": "City",
    "contact.izmir": "Izmir",

    // Blog
    "blog.title": "Blog",
    "blog.trends": "Interior Design Trends 2024",
    "blog.small.spaces": "The Art of Making Small Spaces Look Big",
    "blog.sustainable": "Sustainable Interior Architecture Solutions",

    // Footer
    "footer.description":
      "Transforming your living spaces into works of art with interior architecture and design services.",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.copyright": "© 2025 SHINEST Interior Architecture. All rights reserved.",
    "footer.design": "Design and software:",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",

    // Loading
    "loading.progress": "Loading...",

    // Common
    "common.readMore": "Read More",
    "common.learnMore": "Learn More",
    "common.contactUs": "Contact Us",
    "common.viewAll": "View All",
  },

  DE: {
    // Header & Navigation
    "nav.home": "STARTSEITE",
    "nav.about": "ÜBER UNS",
    "nav.services": "DIENSTLEISTUNGEN",
    "nav.projects": "PROJEKTE",
    "nav.blog": "BLOG",
    "nav.contact": "KONTAKT",

    // Hero Section
    "hero.company": "SHINEST",
    "hero.subtitle": "INNENARCHITEKTUR",

    // About Section
    "about.title": "Über uns",
    "about.description":
      "SHINEST Interiors bietet umfassende Luxus-Innendesign-Dienstleistungen — von der ersten Konzeption und ästhetischen Beratung bis hin zur Koordination, Umsetzung und magazinwürdigen Veredelung.",
    "about.portfolio": "PORTFOLIO",
    "about.services": "DIENSTLEISTUNGEN",
    "about.contact": "KONTAKT",
    "about.vision": "Vision",
    "about.mission": "Mission",
    "about.values": "Werte",
    "about.innovation": "Innovation",
    "about.quality": "Qualität",
    "about.sustainability": "Nachhaltigkeit",

    // Text Section
    "text.main1": "IHRE RÄUME",
    "text.main2": "BRINGEN LICHT IN",
    "text.handwriting": "Ihr Leben!",
    "text.description":
      "SHINEST Innenarchitektur bietet umfassende Luxus-Innendesign-Dienstleistungen — von der ersten Konzeption und ästhetischen Beratung bis hin zur Koordination, Umsetzung und magazinwürdigen Veredelung.",

    // Services
    "services.title": "Unsere Dienstleistungen",
    "services.consulting": "Beratung / Online-Beratung",
    "services.design": "Design",
    "services.implementation": "Umsetzung",
    "services.consulting.desc":
      "Remote- und persönliche professionelle Innenarchitektur-Beratungsdienstleistungen. Holen Sie sich Expertenmeinungen, um das Potenzial Ihres Raumes zu entdecken.",
    "services.design.desc":
      "Kreative und funktionale Innendesign-Lösungen. Umfassende Designdienstleistungen von der Konzeptentwicklung bis zur 3D-Visualisierung.",
    "services.implementation.desc":
      "Design-zu-Realität-Transformationsprozess. Erschaffung Ihres Traumraums mit Projektmanagement, Koordination und Qualitätshandwerk.",
    "services.details": "Details",
    "services.getQuote": "Angebot Erhalten",

    // Projects
    "projects.title": "Unsere Projekte",
    "projects.modern.villa": "Moderne Villa",
    "projects.penthouse": "Penthouse Suite",
    "projects.boutique.hotel": "Boutique Hotel",
    "projects.istanbul": "Istanbul",
    "projects.dubai": "Dubai",
    "projects.paris": "Paris",

    // Contact
    "contact.title": "Kontakt",
    "contact.email": "E-Mail",
    "contact.phone": "Telefon",
    "contact.city": "Stadt",
    "contact.izmir": "Izmir",

    // Blog
    "blog.title": "Blog",
    "blog.trends": "Innendesign-Trends 2024",
    "blog.small.spaces": "Die Kunst, kleine Räume groß aussehen zu lassen",
    "blog.sustainable": "Nachhaltige Innenarchitektur-Lösungen",

    // Footer
    "footer.description": "Verwandlung Ihrer Wohnräume in Kunstwerke mit Innenarchitektur- und Designdienstleistungen.",
    "footer.quickLinks": "Schnelle Links",
    "footer.contact": "Kontakt",
    "footer.copyright": "© 2025 SHINEST Innenarchitektur. Alle Rechte vorbehalten.",
    "footer.design": "Design und Software:",
    "footer.privacy": "Datenschutzrichtlinie",
    "footer.terms": "Nutzungsbedingungen",

    // Loading
    "loading.progress": "Wird geladen...",

    // Common
    "common.readMore": "Mehr Lesen",
    "common.learnMore": "Mehr Erfahren",
    "common.contactUs": "Kontaktieren Sie Uns",
    "common.viewAll": "Alle Anzeigen",
  },

  FR: {
    // Header & Navigation
    "nav.home": "ACCUEIL",
    "nav.about": "À PROPOS",
    "nav.services": "SERVICES",
    "nav.projects": "PROJETS",
    "nav.blog": "BLOG",
    "nav.contact": "CONTACT",

    // Hero Section
    "hero.company": "SHINEST",
    "hero.subtitle": "ARCHITECTURE INTÉRIEURE",

    // About Section
    "about.title": "À propos de nous",
    "about.description":
      "SHINEST Interiors propose des services complets de design d'intérieur de luxe — de la conception initiale et de la consultation esthétique à la coordination, la mise en œuvre et les finitions dignes d'un magazine.",
    "about.portfolio": "PORTFOLIO",
    "about.services": "SERVICES",
    "about.contact": "CONTACT",
    "about.vision": "Vision",
    "about.mission": "Mission",
    "about.values": "Valeurs",
    "about.innovation": "Innovation",
    "about.quality": "Qualité",
    "about.sustainability": "Durabilité",

    // Text Section
    "text.main1": "VOS ESPACES",
    "text.main2": "APPORTENT DE LA LUMIÈRE À",
    "text.handwriting": "votre vie!",
    "text.description":
      "SHINEST Architecture Intérieure propose des services complets de design d'intérieur de luxe — de la conception initiale et de la consultation esthétique à la coordination, la mise en œuvre et les finitions dignes d'un magazine.",

    // Services
    "services.title": "Nos Services",
    "services.consulting": "Conseil / Conseil en Ligne",
    "services.design": "Design",
    "services.implementation": "Mise en Œuvre",
    "services.consulting.desc":
      "Services de conseil professionnel en architecture intérieure à distance et en personne. Obtenez l'avis d'experts pour découvrir le potentiel de votre espace.",
    "services.design.desc":
      "Solutions de design d'intérieur créatives et fonctionnelles. Services de design complets du développement de concept à la visualisation 3D.",
    "services.implementation.desc":
      "Processus de transformation du design en réalité. Créer l'espace de vos rêves avec gestion de projet, coordination et artisanat de qualité.",
    "services.details": "Détails",
    "services.getQuote": "Obtenir un Devis",

    // Projects
    "projects.title": "Nos Projets",
    "projects.modern.villa": "Villa Moderne",
    "projects.penthouse": "Suite Penthouse",
    "projects.boutique.hotel": "Hôtel Boutique",
    "projects.istanbul": "Istanbul",
    "projects.dubai": "Dubaï",
    "projects.paris": "Paris",

    // Contact
    "contact.title": "Contact",
    "contact.email": "Email",
    "contact.phone": "Téléphone",
    "contact.city": "Ville",
    "contact.izmir": "Izmir",

    // Blog
    "blog.title": "Blog",
    "blog.trends": "Tendances Design Intérieur 2024",
    "blog.small.spaces": "L'Art de Faire Paraître les Petits Espaces Plus Grands",
    "blog.sustainable": "Solutions d'Architecture Intérieure Durable",

    // Footer
    "footer.description":
      "Transformer vos espaces de vie en œuvres d'art avec des services d'architecture intérieure et de design.",
    "footer.quickLinks": "Liens Rapides",
    "footer.contact": "Contact",
    "footer.copyright": "© 2025 SHINEST Architecture Intérieure. Tous droits réservés.",
    "footer.design": "Design et logiciel:",
    "footer.privacy": "Politique de Confidentialité",
    "footer.terms": "Conditions d'Utilisation",

    // Loading
    "loading.progress": "Chargement...",

    // Common
    "common.readMore": "Lire Plus",
    "common.learnMore": "En Savoir Plus",
    "common.contactUs": "Nous Contacter",
    "common.viewAll": "Voir Tout",
  },

  IT: {
    // Header & Navigation
    "nav.home": "HOME",
    "nav.about": "CHI SIAMO",
    "nav.services": "SERVIZI",
    "nav.projects": "PROGETTI",
    "nav.blog": "BLOG",
    "nav.contact": "CONTATTO",

    // Hero Section
    "hero.company": "SHINEST",
    "hero.subtitle": "ARCHITETTURA D'INTERNI",

    // About Section
    "about.title": "Chi siamo",
    "about.description":
      "SHINEST Interiors offre servizi completi di design d'interni di lusso — dalla concezione iniziale e consulenza estetica alla coordinazione, implementazione e finiture degne di una rivista.",
    "about.portfolio": "PORTFOLIO",
    "about.services": "SERVIZI",
    "about.contact": "CONTATTO",
    "about.vision": "Visione",
    "about.mission": "Missione",
    "about.values": "Valori",
    "about.innovation": "Innovazione",
    "about.quality": "Qualità",
    "about.sustainability": "Sostenibilità",

    // Text Section
    "text.main1": "I VOSTRI SPAZI",
    "text.main2": "PORTANO LUCE ALLA",
    "text.handwriting": "vostra vita!",
    "text.description":
      "SHINEST Architettura d'Interni offre servizi completi di design d'interni di lusso — dalla concezione iniziale e consulenza estetica alla coordinazione, implementazione e finiture degne di una rivista.",

    // Services
    "services.title": "I Nostri Servizi",
    "services.consulting": "Consulenza / Consulenza Online",
    "services.design": "Design",
    "services.implementation": "Implementazione",
    "services.consulting.desc":
      "Servizi di consulenza professionale in architettura d'interni remoti e di persona. Ottieni opinioni di esperti per scoprire il potenziale del tuo spazio.",
    "services.design.desc":
      "Soluzioni di design d'interni creative e funzionali. Servizi di design completi dallo sviluppo del concetto alla visualizzazione 3D.",
    "services.implementation.desc":
      "Processo di trasformazione dal design alla realtà. Creare il vostro spazio dei sogni con gestione del progetto, coordinazione e artigianato di qualità.",
    "services.details": "Dettagli",
    "services.getQuote": "Ottieni Preventivo",

    // Projects
    "projects.title": "I Nostri Progetti",
    "projects.modern.villa": "Villa Moderna",
    "projects.penthouse": "Suite Attico",
    "projects.boutique.hotel": "Hotel Boutique",
    "projects.istanbul": "Istanbul",
    "projects.dubai": "Dubai",
    "projects.paris": "Parigi",

    // Contact
    "contact.title": "Contatto",
    "contact.email": "Email",
    "contact.phone": "Telefono",
    "contact.city": "Città",
    "contact.izmir": "Izmir",

    // Blog
    "blog.title": "Blog",
    "blog.trends": "Tendenze Design d'Interni 2024",
    "blog.small.spaces": "L'Arte di Far Sembrare Grandi gli Spazi Piccoli",
    "blog.sustainable": "Soluzioni di Architettura d'Interni Sostenibili",

    // Footer
    "footer.description":
      "Trasformare i vostri spazi abitativi in opere d'arte con servizi di architettura d'interni e design.",
    "footer.quickLinks": "Link Rapidi",
    "footer.contact": "Contatto",
    "footer.copyright": "© 2025 SHINEST Architettura d'Interni. Tutti i diritti riservati.",
    "footer.design": "Design e software:",
    "footer.privacy": "Politica sulla Privacy",
    "footer.terms": "Termini di Servizio",

    // Loading
    "loading.progress": "Caricamento...",

    // Common
    "common.readMore": "Leggi di Più",
    "common.learnMore": "Scopri di Più",
    "common.contactUs": "Contattaci",
    "common.viewAll": "Visualizza Tutto",
  },

  RU: {
    // Header & Navigation
    "nav.home": "ГЛАВНАЯ",
    "nav.about": "О НАС",
    "nav.services": "УСЛУГИ",
    "nav.projects": "ПРОЕКТЫ",
    "nav.blog": "БЛОГ",
    "nav.contact": "КОНТАКТЫ",

    // Hero Section
    "hero.company": "SHINEST",
    "hero.subtitle": "ДИЗАЙН ИНТЕРЬЕРА",

    // About Section
    "about.title": "О нас",
    "about.description":
      "SHINEST Interiors предлагает комплексные услуги роскошного дизайна интерьера — от первоначальной концепции и эстетических консультаций до координации, реализации и отделки, достойной журнала.",
    "about.portfolio": "ПОРТФОЛИО",
    "about.services": "УСЛУГИ",
    "about.contact": "КОНТАКТЫ",
    "about.vision": "Видение",
    "about.mission": "Миссия",
    "about.values": "Ценности",
    "about.innovation": "Инновации",
    "about.quality": "Качество",
    "about.sustainability": "Устойчивость",

    // Text Section
    "text.main1": "ВАШИ ПРОСТРАНСТВА",
    "text.main2": "ПРИНОСЯТ СВЕТ В",
    "text.handwriting": "вашу жизнь!",
    "text.description":
      "SHINEST Дизайн Интерьера предлагает комплексные услуги роскошного дизайна интерьера — от первоначальной концепции и эстетических консультаций до координации, реализации и отделки, достойной журнала.",

    // Services
    "services.title": "Наши Услуги",
    "services.consulting": "Консультации / Онлайн Консультации",
    "services.design": "Дизайн",
    "services.implementation": "Реализация",
    "services.consulting.desc":
      "Удаленные и личные профессиональные консультационные услуги по дизайну интерьера. Получите экспертное мнение, чтобы раскрыть потенциал вашего пространства.",
    "services.design.desc":
      "Креативные и функциональные решения дизайна интерьера. Комплексные дизайнерские услуги от разработки концепции до 3D-визуализации.",
    "services.implementation.desc":
      "Процесс превращения дизайна в реальность. Создание пространства вашей мечты с управлением проектом, координацией и качественным мастерством.",
    "services.details": "Подробности",
    "services.getQuote": "Получить Предложение",

    // Projects
    "projects.title": "Наши Проекты",
    "projects.modern.villa": "Современная Вилла",
    "projects.penthouse": "Пентхаус",
    "projects.boutique.hotel": "Бутик-Отель",
    "projects.istanbul": "Стамбул",
    "projects.dubai": "Дубай",
    "projects.paris": "Париж",

    // Contact
    "contact.title": "Контакты",
    "contact.email": "Электронная почта",
    "contact.phone": "Телефон",
    "contact.city": "Город",
    "contact.izmir": "Измир",

    // Blog
    "blog.title": "Блог",
    "blog.trends": "Тренды Дизайна Интерьера 2024",
    "blog.small.spaces": "Искусство Визуального Увеличения Маленьких Пространств",
    "blog.sustainable": "Устойчивые Решения Дизайна Интерьера",

    // Footer
    "footer.description":
      "Превращение ваших жилых пространств в произведения искусства с помощью услуг дизайна интерьера.",
    "footer.quickLinks": "Быстрые Ссылки",
    "footer.contact": "Контакты",
    "footer.copyright": "© 2025 SHINEST Дизайн Интерьера. Все права защищены.",
    "footer.design": "Дизайн и программное обеспечение:",
    "footer.privacy": "Политика Конфиденциальности",
    "footer.terms": "Условия Обслуживания",

    // Loading
    "loading.progress": "Загрузка...",

    // Common
    "common.readMore": "Читать Далее",
    "common.learnMore": "Узнать Больше",
    "common.contactUs": "Связаться с Нами",
    "common.viewAll": "Посмотреть Все",
  },

  AR: {
    // Header & Navigation
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.services": "خدماتنا",
    "nav.projects": "مشاريعنا",
    "nav.blog": "المدونة",
    "nav.contact": "اتصل بنا",

    // Hero Section
    "hero.company": "SHINEST",
    "hero.subtitle": "التصميم الداخلي",

    // About Section
    "about.title": "من نحن",
    "about.description":
      "تقدم SHINEST Interiors خدمات شاملة لتصميم الديكور الداخلي الفاخر — من المفهوم الأولي والاستشارة الجمالية إلى التنسيق والتنفيذ واللمسات الأخيرة الجديرة بالمجلات.",
    "about.portfolio": "المعرض",
    "about.services": "الخدمات",
    "about.contact": "اتصل بنا",
    "about.vision": "الرؤية",
    "about.mission": "المهمة",
    "about.values": "القيم",
    "about.innovation": "الابتكار",
    "about.quality": "الجودة",
    "about.sustainability": "الاستدامة",

    // Text Section
    "text.main1": "مساحاتكم",
    "text.main2": "تجلب النور إلى",
    "text.handwriting": "حياتكم!",
    "text.description":
      "تقدم SHINEST للتصميم الداخلي خدمات شاملة لتصميم الديكور الداخلي الفاخر — من المفهوم الأولي والاستشارة الجمالية إلى التنسيق والتنفيذ واللمسات الأخيرة الجديرة بالمجلات.",

    // Services
    "services.title": "خدماتنا",
    "services.consulting": "الاستشارة / الاستشارة عبر الإنترنت",
    "services.design": "التصميم",
    "services.implementation": "التنفيذ",
    "services.consulting.desc":
      "خدمات استشارية مهنية للتصميم الداخلي عن بُعد وشخصياً. احصل على رأي الخبراء لاكتشاف إمكانات مساحتك.",
    "services.design.desc":
      "حلول تصميم داخلي إبداعية وعملية. خدمات تصميم شاملة من تطوير المفهوم إلى التصور ثلاثي الأبعاد.",
    "services.implementation.desc":
      "عملية تحويل التصميم إلى واقع. إنشاء مساحة أحلامك مع إدارة المشروع والتنسيق والحرفية عالية الجودة.",
    "services.details": "التفاصيل",
    "services.getQuote": "احصل على عرض سعر",

    // Projects
    "projects.title": "مشاريعنا",
    "projects.modern.villa": "فيلا عصرية",
    "projects.penthouse": "جناح البنتهاوس",
    "projects.boutique.hotel": "فندق بوتيك",
    "projects.istanbul": "اسطنبول",
    "projects.dubai": "دبي",
    "projects.paris": "باريس",

    // Contact
    "contact.title": "اتصل بنا",
    "contact.email": "البريد الإلكتروني",
    "contact.phone": "الهاتف",
    "contact.city": "المدينة",
    "contact.izmir": "إزمير",

    // Blog
    "blog.title": "المدونة",
    "blog.trends": "اتجاهات التصميم الداخلي 2024",
    "blog.small.spaces": "فن جعل المساحات الصغيرة تبدو كبيرة",
    "blog.sustainable": "حلول التصميم الداخلي المستدام",

    // Footer
    "footer.description": "تحويل مساحات معيشتكم إلى أعمال فنية مع خدمات التصميم الداخلي والديكور.",
    "footer.quickLinks": "روابط سريعة",
    "footer.contact": "اتصل بنا",
    "footer.copyright": "© 2025 SHINEST للتصميم الداخلي. جميع الحقوق محفوظة.",
    "footer.design": "التصميم والبرمجيات:",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الخدمة",

    // Loading
    "loading.progress": "جاري التحميل...",

    // Common
    "common.readMore": "اقرأ المزيد",
    "common.learnMore": "تعلم المزيد",
    "common.contactUs": "اتصل بنا",
    "common.viewAll": "عرض الكل",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("TR")
  const [isLoading, setIsLoading] = useState(true)

  const setLanguage = (language: Language) => {
    console.log("Setting language to:", language)
    setCurrentLanguage(language)

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("shinest-language", language)
      console.log("Language saved to localStorage:", language)
    }

    // Force re-render by updating the document language
    if (typeof document !== "undefined") {
      document.documentElement.lang = language.toLowerCase()
    }
  }

  const t = (key: string): string => {
    const translation = translations[currentLanguage]?.[key] || translations.TR[key] || key
    console.log(`Translation for "${key}":`, translation)
    return translation
  }

  // Load language from localStorage on mount
  useEffect(() => {
    console.log("LanguageProvider useEffect triggered")

    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("shinest-language") as Language
      console.log("Saved language from localStorage:", savedLanguage)

      if (savedLanguage && translations[savedLanguage]) {
        console.log("Setting language from localStorage:", savedLanguage)
        setCurrentLanguage(savedLanguage)
        document.documentElement.lang = savedLanguage.toLowerCase()
      } else {
        console.log("No saved language found, using default TR")
        setCurrentLanguage("TR")
        document.documentElement.lang = "tr"
      }
    }

    // Set loading to false after language is loaded
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Debug: Log current language changes
  useEffect(() => {
    console.log("Current language changed to:", currentLanguage)
  }, [currentLanguage])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f3f0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#c4975a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#8b7355] font-sans text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, isLoading }}>
      <div className={currentLanguage === "AR" ? "rtl" : "ltr"}>{children}</div>
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
