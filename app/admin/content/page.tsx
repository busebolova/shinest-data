"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Upload, Plus, Trash2, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

export default function ContentManagement() {
  const [currentLanguage, setCurrentLanguage] = useState("tr")
  const [saving, setSaving] = useState(false)

  const languages = [
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ]

  // Ana sayfa içerik durumu
  const [homeContent, setHomeContent] = useState({
    hero: {
      title: {
        tr: "SHINEST",
        en: "SHINEST",
        de: "SHINEST",
        fr: "SHINEST",
        it: "SHINEST",
        ru: "SHINEST",
        ar: "SHINEST",
      },
      subtitle: {
        tr: "İÇ MİMARLIK",
        en: "INTERIOR ARCHITECTURE",
        de: "INNENARCHITEKTUR",
        fr: "ARCHITECTURE INTÉRIEURE",
        it: "ARCHITETTURA D'INTERNI",
        ru: "ДИЗАЙН ИНТЕРЬЕРА",
        ar: "التصميم الداخلي",
      },
      description: {
        tr: "Hayalinizdeki mekanları gerçeğe dönüştürüyoruz",
        en: "We turn your dream spaces into reality",
        de: "Wir verwandeln Ihre Traumräume in die Realität",
        fr: "Nous transformons vos espaces de rêve en réalité",
        it: "Trasformiamo i vostri spazi da sogno in realtà",
        ru: "Мы превращаем пространства вашей мечты в реальность",
        ar: "نحول مساحات أحلامك إلى واقع",
      },
      buttonText: {
        tr: "Keşfet",
        en: "Explore",
        de: "Entdecken",
        fr: "Explorer",
        it: "Esplora",
        ru: "Исследовать",
        ar: "استكشف",
      },
      backgroundImage: "/images/hero-image.png",
      showAnimation: true,
      isVisible: true,
    },
    textSection: {
      mainText1: {
        tr: "MEKANLARINIZ",
        en: "YOUR SPACES",
        de: "IHRE RÄUME",
        fr: "VOS ESPACES",
        it: "I VOSTRI SPAZI",
        ru: "ВАШИ ПРОСТРАНСТВА",
        ar: "مساحاتكم",
      },
      mainText2: {
        tr: "YAŞAMINIZA",
        en: "BRING LIGHT TO",
        de: "BRINGEN LICHT IN",
        fr: "APPORTENT DE LA LUMIÈRE À",
        it: "PORTANO LUCE ALLA",
        ru: "ПРИНОСЯТ СВЕТ В",
        ar: "تجلب النور إلى",
      },
      handwritingText: {
        tr: "ışık tutar!",
        en: "your life!",
        de: "Ihr Leben!",
        fr: "votre vie!",
        it: "vostra vita!",
        ru: "вашу жизнь!",
        ar: "حياتكم!",
      },
      description: {
        tr: "SHINEST İç Mimarlık olarak, yaşam alanlarınızı sanat eserine dönüştürüyoruz. Modern tasarım anlayışımız ve deneyimli ekibimizle, her projeyi özenle hayata geçiriyoruz.",
        en: "As SHINEST Interior Architecture, we transform your living spaces into works of art. With our modern design approach and experienced team, we carefully bring each project to life.",
        de: "Als SHINEST Innenarchitektur verwandeln wir Ihre Wohnräume in Kunstwerke. Mit unserem modernen Designansatz und erfahrenen Team bringen wir jedes Projekt sorgfältig zum Leben.",
        fr: "En tant que SHINEST Architecture Intérieure, nous transformons vos espaces de vie en œuvres d'art. Avec notre approche de design moderne et notre équipe expérimentée, nous donnons soigneusement vie à chaque projet.",
        it: "Come SHINEST Architettura d'Interni, trasformiamo i vostri spazi abitativi in opere d'arte. Con il nostro approccio di design moderno e il team esperto, diamo vita con cura a ogni progetto.",
        ru: "Как SHINEST Дизайн Интерьера, мы превращаем ваши жилые пространства в произведения искусства. С нашим современным подходом к дизайну и опытной командой, мы тщательно воплощаем каждый проект в жизнь.",
        ar: "كـ SHINEST للتصميم الداخلي، نحول مساحات معيشتكم إلى أعمال فنية. مع نهجنا التصميمي الحديث وفريقنا ذو الخبرة، نحيي كل مشروع بعناية.",
      },
      isVisible: true,
    },
    aboutSection: {
      title: {
        tr: "Hakkımızda",
        en: "About Us",
        de: "Über uns",
        fr: "À propos de nous",
        it: "Chi siamo",
        ru: "О нас",
        ar: "من نحن",
      },
      subtitle: {
        tr: "Tasarım Felsefemiz",
        en: "Our Design Philosophy",
        de: "Unsere Design-Philosophie",
        fr: "Notre Philosophie de Design",
        it: "La Nostra Filosofia di Design",
        ru: "Наша Философия Дизайна",
        ar: "فلسفة التصميم لدينا",
      },
      description: {
        tr: "Yaşam alanlarınızı sanat eserine dönüştürüyoruz. Her proje, müşterilerimizin hayallerini gerçeğe dönüştüren benzersiz bir hikaye anlatır.",
        en: "We transform your living spaces into works of art. Each project tells a unique story that turns our clients' dreams into reality.",
        de: "Wir verwandeln Ihre Wohnräume in Kunstwerke. Jedes Projekt erzählt eine einzigartige Geschichte, die die Träume unserer Kunden in die Realität umsetzt.",
        fr: "Nous transformons vos espaces de vie en œuvres d'art. Chaque projet raconte une histoire unique qui transforme les rêves de nos clients en réalité.",
        it: "Trasformiamo i vostri spazi abitativi in opere d'arte. Ogni progetto racconta una storia unica che trasforma i sogni dei nostri clienti in realtà.",
        ru: "Мы превращаем ваши жилые пространства в произведения искусства. Каждый проект рассказывает уникальную историю, которая превращает мечты наших клиентов в реальность.",
        ar: "نحول مساحات معيشتكم إلى أعمال فنية. كل مشروع يحكي قصة فريدة تحول أحلام عملائنا إلى واقع.",
      },
      vision: {
        tr: "İç mimarlık alanında yenilikçi ve sürdürülebilir çözümlerle öncü olmak",
        en: "To be a pioneer with innovative and sustainable solutions in interior architecture",
        de: "Pionier mit innovativen und nachhaltigen Lösungen in der Innenarchitektur zu sein",
        fr: "Être un pionnier avec des solutions innovantes et durables en architecture intérieure",
        it: "Essere un pioniere con soluzioni innovative e sostenibili nell'architettura d'interni",
        ru: "Быть пионером с инновационными и устойчивыми решениями в дизайне интерьера",
        ar: "أن نكون رواداً بحلول مبتكرة ومستدامة في التصميم الداخلي",
      },
      mission: {
        tr: "Müşterilerimizin hayallerini gerçeğe dönüştürmek, yaşam kalitelerini artıran fonksiyonel ve estetik mekanlar tasarlamak",
        en: "To turn our customers' dreams into reality, to design functional and aesthetic spaces that improve their quality of life",
        de: "Die Träume unserer Kunden in die Realität umzusetzen, funktionale und ästhetische Räume zu gestalten, die ihre Lebensqualität verbessern",
        fr: "Transformer les rêves de nos clients en réalité, concevoir des espaces fonctionnels et esthétiques qui améliorent leur qualité de vie",
        it: "Trasformare i sogni dei nostri clienti in realtà, progettare spazi funzionali ed estetici che migliorano la loro qualità di vita",
        ru: "Превращать мечты наших клиентов в реальность, проектировать функциональные и эстетичные пространства, которые улучшают качество их жизни",
        ar: "تحويل أحلام عملائنا إلى واقع، تصميم مساحات وظيفية وجمالية تحسن جودة حياتهم",
      },
      values: [
        {
          id: 1,
          icon: "Lightbulb",
          title: {
            tr: "Yenilikçilik",
            en: "Innovation",
            de: "Innovation",
            fr: "Innovation",
            it: "Innovazione",
            ru: "Инновации",
            ar: "الابتكار",
          },
          description: {
            tr: "Sürekli gelişen teknoloji ve tasarım trendlerini takip ederek yenilikçi çözümler sunuyoruz.",
            en: "We offer innovative solutions by following constantly evolving technology and design trends.",
            de: "Wir bieten innovative Lösungen, indem wir sich ständig entwickelnde Technologie- und Designtrends verfolgen.",
            fr: "Nous offrons des solutions innovantes en suivant les tendances technologiques et de design en constante évolution.",
            it: "Offriamo soluzioni innovative seguendo le tendenze tecnologiche e di design in continua evoluzione.",
            ru: "Мы предлагаем инновационные решения, следуя постоянно развивающимся технологическим и дизайнерским трендам.",
            ar: "نقدم حلولاً مبتكرة من خلال متابعة اتجاهات التكنولوجيا والتصميم المتطورة باستمرار.",
          },
        },
        {
          id: 2,
          icon: "Award",
          title: {
            tr: "Kalite",
            en: "Quality",
            de: "Qualität",
            fr: "Qualité",
            it: "Qualità",
            ru: "Качество",
            ar: "الجودة",
          },
          description: {
            tr: "Her projede en yüksek kalite standartlarını uygulayarak mükemmel sonuçlar elde ediyoruz.",
            en: "We achieve excellent results by applying the highest quality standards in every project.",
            de: "Wir erzielen hervorragende Ergebnisse, indem wir in jedem Projekt die höchsten Qualitätsstandards anwenden.",
            fr: "Nous obtenons d'excellents résultats en appliquant les plus hauts standards de qualité dans chaque projet.",
            it: "Otteniamo risultati eccellenti applicando i più alti standard di qualità in ogni progetto.",
            ru: "Мы достигаем отличных результатов, применяя самые высокие стандарты качества в каждом проекте.",
            ar: "نحقق نتائج ممتازة من خلال تطبيق أعلى معايير الجودة في كل مشروع.",
          },
        },
        {
          id: 3,
          icon: "Leaf",
          title: {
            tr: "Sürdürülebilirlik",
            en: "Sustainability",
            de: "Nachhaltigkeit",
            fr: "Durabilité",
            it: "Sostenibilità",
            ru: "Устойчивость",
            ar: "الاستدامة",
          },
          description: {
            tr: "Çevre dostu malzemeler ve sürdürülebilir tasarım anlayışıyla geleceği düşünüyoruz.",
            en: "We think about the future with environmentally friendly materials and sustainable design approach.",
            de: "Wir denken an die Zukunft mit umweltfreundlichen Materialien und nachhaltigem Designansatz.",
            fr: "Nous pensons à l'avenir avec des matériaux respectueux de l'environnement et une approche de design durable.",
            it: "Pensiamo al futuro con materiali rispettosi dell'ambiente e un approccio di design sostenibile.",
            ru: "Мы думаем о будущем с экологически чистыми материалами и устойчивым подходом к дизайну.",
            ar: "نفكر في المستقبل بمواد صديقة للبيئة ونهج تصميم مستدام.",
          },
        },
      ],
      isVisible: true,
    },
    servicesSection: {
      title: {
        tr: "Hizmetlerimiz",
        en: "Our Services",
        de: "Unsere Dienstleistungen",
        fr: "Nos Services",
        it: "I Nostri Servizi",
        ru: "Наши Услуги",
        ar: "خدماتنا",
      },
      subtitle: {
        tr: "SHINEST İç Mimarlık olarak müşterilerimize özel, yenilikçi ve fonksiyonel tasarım çözümleri sunuyoruz.",
        en: "As SHINEST Interior Architecture, we offer special, innovative and functional design solutions to our customers.",
        de: "Als SHINEST Innenarchitektur bieten wir unseren Kunden spezielle, innovative und funktionale Designlösungen.",
        fr: "En tant que SHINEST Architecture Intérieure, nous offrons des solutions de design spéciales, innovantes et fonctionnelles à nos clients.",
        it: "Come SHINEST Architettura d'Interni, offriamo soluzioni di design speciali, innovative e funzionali ai nostri clienti.",
        ru: "Как SHINEST Дизайн Интерьера, мы предлагаем нашим клиентам особые, инновационные и функциональные дизайнерские решения.",
        ar: "كـ SHINEST للتصميم الداخلي، نقدم لعملائنا حلول تصميم خاصة ومبتكرة ووظيفية.",
      },
      services: [
        {
          id: 1,
          title: {
            tr: "Danışmanlık",
            en: "Consulting",
            de: "Beratung",
            fr: "Conseil",
            it: "Consulenza",
            ru: "Консультации",
            ar: "الاستشارة",
          },
          description: {
            tr: "Profesyonel iç mimarlık danışmanlığı hizmeti",
            en: "Professional interior architecture consulting service",
            de: "Professionelle Innenarchitektur-Beratungsdienstleistung",
            fr: "Service de conseil professionnel en architecture intérieure",
            it: "Servizio di consulenza professionale di architettura d'interni",
            ru: "Профессиональная консультационная услуга по дизайну интерьера",
            ar: "خدمة استشارية مهنية للتصميم الداخلي",
          },
          image: "/images/consulting-service.png",
          features: [
            {
              tr: "Mekan Analizi",
              en: "Space Analysis",
              de: "Raumanalyse",
              fr: "Analyse d'Espace",
              it: "Analisi dello Spazio",
              ru: "Анализ Пространства",
              ar: "تحليل المساحة",
            },
            {
              tr: "Tasarım Danışmanlığı",
              en: "Design Consulting",
              de: "Design-Beratung",
              fr: "Conseil en Design",
              it: "Consulenza di Design",
              ru: "Консультации по Дизайну",
              ar: "استشارة التصميم",
            },
            {
              tr: "Proje Yönetimi",
              en: "Project Management",
              de: "Projektmanagement",
              fr: "Gestion de Projet",
              it: "Gestione del Progetto",
              ru: "Управление Проектом",
              ar: "إدارة المشروع",
            },
          ],
        },
        {
          id: 2,
          title: {
            tr: "Tasarım",
            en: "Design",
            de: "Design",
            fr: "Design",
            it: "Design",
            ru: "Дизайн",
            ar: "التصميم",
          },
          description: {
            tr: "Yaratıcı ve işlevsel tasarım çözümleri",
            en: "Creative and functional design solutions",
            de: "Kreative und funktionale Designlösungen",
            fr: "Solutions de design créatives et fonctionnelles",
            it: "Soluzioni di design creative e funzionali",
            ru: "Креативные и функциональные дизайнерские решения",
            ar: "حلول تصميم إبداعية ووظيفية",
          },
          image: "/images/design-service.png",
          features: [
            {
              tr: "3D Görselleştirme",
              en: "3D Visualization",
              de: "3D-Visualisierung",
              fr: "Visualisation 3D",
              it: "Visualizzazione 3D",
              ru: "3D Визуализация",
              ar: "التصور ثلاثي الأبعاد",
            },
            {
              tr: "Teknik Çizimler",
              en: "Technical Drawings",
              de: "Technische Zeichnungen",
              fr: "Dessins Techniques",
              it: "Disegni Tecnici",
              ru: "Технические Чертежи",
              ar: "الرسوم التقنية",
            },
            {
              tr: "Malzeme Seçimi",
              en: "Material Selection",
              de: "Materialauswahl",
              fr: "Sélection de Matériaux",
              it: "Selezione dei Materiali",
              ru: "Выбор Материалов",
              ar: "اختيار المواد",
            },
          ],
        },
        {
          id: 3,
          title: {
            tr: "Uygulama",
            en: "Implementation",
            de: "Umsetzung",
            fr: "Mise en Œuvre",
            it: "Implementazione",
            ru: "Реализация",
            ar: "التنفيذ",
          },
          description: {
            tr: "Tasarımdan gerçeğe dönüşüm süreci",
            en: "Design to reality transformation process",
            de: "Design-zu-Realität-Transformationsprozess",
            fr: "Processus de transformation du design en réalité",
            it: "Processo di trasformazione dal design alla realtà",
            ru: "Процесс превращения дизайна в реальность",
            ar: "عملية تحويل التصميم إلى واقع",
          },
          image: "/images/implementation-service.png",
          features: [
            {
              tr: "Şantiye Yönetimi",
              en: "Site Management",
              de: "Baustellen-Management",
              fr: "Gestion de Chantier",
              it: "Gestione del Cantiere",
              ru: "Управление Стройплощадкой",
              ar: "إدارة الموقع",
            },
            {
              tr: "Kalite Kontrol",
              en: "Quality Control",
              de: "Qualitätskontrolle",
              fr: "Contrôle Qualité",
              it: "Controllo Qualità",
              ru: "Контроль Качества",
              ar: "مراقبة الجودة",
            },
            {
              tr: "Teslim Süreci",
              en: "Delivery Process",
              de: "Lieferprozess",
              fr: "Processus de Livraison",
              it: "Processo di Consegna",
              ru: "Процесс Доставки",
              ar: "عملية التسليم",
            },
          ],
        },
      ],
      isVisible: true,
    },
    projectsSection: {
      title: {
        tr: "Projelerimiz",
        en: "Our Projects",
        de: "Unsere Projekte",
        fr: "Nos Projets",
        it: "I Nostri Progetti",
        ru: "Наши Проекты",
        ar: "مشاريعنا",
      },
      subtitle: {
        tr: "Öne Çıkan Çalışmalarımız",
        en: "Our Featured Works",
        de: "Unsere Herausragenden Arbeiten",
        fr: "Nos Travaux Remarquables",
        it: "I Nostri Lavori in Evidenza",
        ru: "Наши Избранные Работы",
        ar: "أعمالنا المميزة",
      },
      description: {
        tr: "Gerçekleştirdiğimiz projelerden örnekler ve tasarım hikayelerimiz",
        en: "Examples from our completed projects and our design stories",
        de: "Beispiele aus unseren abgeschlossenen Projekten und unsere Designgeschichten",
        fr: "Exemples de nos projets terminés et nos histoires de design",
        it: "Esempi dai nostri progetti completati e le nostre storie di design",
        ru: "Примеры из наших завершенных проектов и наши дизайнерские истории",
        ar: "أمثلة من مشاريعنا المكتملة وقصص التصميم لدينا",
      },
      featuredProjects: [
        {
          id: 1,
          title: {
            tr: "Modern Yaşam Alanı",
            en: "Modern Living Space",
            de: "Moderner Wohnraum",
            fr: "Espace de Vie Moderne",
            it: "Spazio Abitativo Moderno",
            ru: "Современное Жилое Пространство",
            ar: "مساحة معيشة عصرية",
          },
          category: {
            tr: "Konut",
            en: "Residential",
            de: "Wohnbereich",
            fr: "Résidentiel",
            it: "Residenziale",
            ru: "Жилой",
            ar: "سكني",
          },
          location: {
            tr: "İzmir",
            en: "Izmir",
            de: "Izmir",
            fr: "Izmir",
            it: "Izmir",
            ru: "Измир",
            ar: "إزمير",
          },
          year: "2024",
          image: "/images/gallery-1.png",
          description: {
            tr: "Modern ve fonksiyonel yaşam alanı tasarımı",
            en: "Modern and functional living space design",
            de: "Modernes und funktionales Wohnraumdesign",
            fr: "Design d'espace de vie moderne et fonctionnel",
            it: "Design di spazio abitativo moderno e funzionale",
            ru: "Современный и функциональный дизайн жилого пространства",
            ar: "تصميم مساحة معيشة عصرية ووظيفية",
          },
        },
        {
          id: 2,
          title: {
            tr: "Lüks Banyo Tasarımı",
            en: "Luxury Bathroom Design",
            de: "Luxus-Badezimmer-Design",
            fr: "Design de Salle de Bain de Luxe",
            it: "Design Bagno di Lusso",
            ru: "Дизайн Роскошной Ванной",
            ar: "تصميم حمام فاخر",
          },
          category: {
            tr: "Banyo",
            en: "Bathroom",
            de: "Badezimmer",
            fr: "Salle de Bain",
            it: "Bagno",
            ru: "Ванная",
            ar: "حمام",
          },
          location: {
            tr: "İstanbul",
            en: "Istanbul",
            de: "Istanbul",
            fr: "Istanbul",
            it: "Istanbul",
            ru: "Стамбул",
            ar: "اسطنبول",
          },
          year: "2024",
          image: "/images/gallery-2.png",
          description: {
            tr: "Lüks ve konforlu banyo tasarımı",
            en: "Luxury and comfortable bathroom design",
            de: "Luxuriöses und komfortables Badezimmerdesign",
            fr: "Design de salle de bain luxueux et confortable",
            it: "Design bagno lussuoso e confortevole",
            ru: "Роскошный и комфортный дизайн ванной",
            ar: "تصميم حمام فاخر ومريح",
          },
        },
        {
          id: 3,
          title: {
            tr: "Kafe İç Mekan",
            en: "Cafe Interior",
            de: "Café-Innenraum",
            fr: "Intérieur de Café",
            it: "Interno Caffè",
            ru: "Интерьер Кафе",
            ar: "داخلية المقهى",
          },
          category: {
            tr: "Ticari",
            en: "Commercial",
            de: "Gewerblich",
            fr: "Commercial",
            it: "Commerciale",
            ru: "Коммерческий",
            ar: "تجاري",
          },
          location: {
            tr: "Ankara",
            en: "Ankara",
            de: "Ankara",
            fr: "Ankara",
            it: "Ankara",
            ru: "Анкара",
            ar: "أنقرة",
          },
          year: "2023",
          image: "/images/gallery-3.png",
          description: {
            tr: "Modern kafe iç mekan tasarımı",
            en: "Modern cafe interior design",
            de: "Modernes Café-Innendesign",
            fr: "Design d'intérieur de café moderne",
            it: "Design interno caffè moderno",
            ru: "Современный дизайн интерьера кафе",
            ar: "تصميم داخلي عصري للمقهى",
          },
        },
      ],
      displayCount: 6,
      buttonText: {
        tr: "Tüm Projeler",
        en: "All Projects",
        de: "Alle Projekte",
        fr: "Tous les Projets",
        it: "Tutti i Progetti",
        ru: "Все Проекты",
        ar: "جميع المشاريع",
      },
      isVisible: true,
    },
    gallerySection: {
      title: {
        tr: "Projelerimizden",
        en: "From Our Projects",
        de: "Aus Unseren Projekten",
        fr: "De Nos Projets",
        it: "Dai Nostri Progetti",
        ru: "Из Наших Проектов",
        ar: "من مشاريعنا",
      },
      images: [
        {
          id: 1,
          url: "/images/gallery-1.png",
          alt: {
            tr: "Modern Salon",
            en: "Modern Living Room",
            de: "Modernes Wohnzimmer",
            fr: "Salon Moderne",
            it: "Soggiorno Moderno",
            ru: "Современная Гостиная",
            ar: "صالة عصرية",
          },
        },
        {
          id: 2,
          url: "/images/gallery-2.png",
          alt: {
            tr: "Lüks Banyo",
            en: "Luxury Bathroom",
            de: "Luxus-Badezimmer",
            fr: "Salle de Bain de Luxe",
            it: "Bagno di Lusso",
            ru: "Роскошная Ванная",
            ar: "حمام فاخر",
          },
        },
        {
          id: 3,
          url: "/images/gallery-3.png",
          alt: {
            tr: "Kafe Tasarımı",
            en: "Cafe Design",
            de: "Café-Design",
            fr: "Design de Café",
            it: "Design Caffè",
            ru: "Дизайн Кафе",
            ar: "تصميم المقهى",
          },
        },
        {
          id: 4,
          url: "/images/gallery-4.png",
          alt: {
            tr: "Yatak Odası",
            en: "Bedroom",
            de: "Schlafzimmer",
            fr: "Chambre",
            it: "Camera da Letto",
            ru: "Спальня",
            ar: "غرفة النوم",
          },
        },
        {
          id: 5,
          url: "/images/gallery-5.png",
          alt: {
            tr: "Mutfak Tasarımı",
            en: "Kitchen Design",
            de: "Küchendesign",
            fr: "Design de Cuisine",
            it: "Design Cucina",
            ru: "Дизайн Кухни",
            ar: "تصميم المطبخ",
          },
        },
      ],
      isVisible: true,
    },
  })

  const handleSave = async (section: string) => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Save to localStorage for demo
      localStorage.setItem(`shinest_${section}`, JSON.stringify(homeContent[section]))

      toast.success(`${section} bölümü başarıyla kaydedildi!`)
    } catch (error) {
      toast.error("Kaydetme sırasında bir hata oluştu!")
    } finally {
      setSaving(false)
    }
  }

  const handleSaveAll = async () => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Save all to localStorage for demo
      localStorage.setItem("shinest_home_content", JSON.stringify(homeContent))

      toast.success("Tüm içerikler başarıyla kaydedildi!")
    } catch (error) {
      toast.error("Kaydetme sırasında bir hata oluştu!")
    } finally {
      setSaving(false)
    }
  }

  const updateContent = (section: string, field: string, value: any, lang?: string) => {
    setHomeContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: lang ? { ...prev[section][field], [lang]: value } : value,
      },
    }))
  }

  const addValue = (section: string, field: string, newItem: any) => {
    setHomeContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], { ...newItem, id: Date.now() }],
      },
    }))
  }

  const removeValue = (section: string, field: string, id: number) => {
    setHomeContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].filter((item) => item.id !== id),
      },
    }))
  }

  const updateArrayItem = (section: string, field: string, id: number, updates: any) => {
    setHomeContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].map((item) => (item.id === id ? { ...item, ...updates } : item)),
      },
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">İçerik Yönetimi</h1>
          <p className="text-gray-600">Ana sayfa içeriklerini düzenleyin ve yönetin</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleSaveAll} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Kaydediliyor..." : "Tümünü Kaydet"}
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="text">Büyük Metin</TabsTrigger>
          <TabsTrigger value="about">Hakkımızda</TabsTrigger>
          <TabsTrigger value="services">Hizmetler</TabsTrigger>
          <TabsTrigger value="projects">Projeler</TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Hero Bölümü</CardTitle>
                  <CardDescription>Ana sayfa hero bölümünü düzenleyin</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={homeContent.hero.isVisible}
                    onCheckedChange={(checked) => updateContent("hero", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">{homeContent.hero.isVisible ? "Görünür" : "Gizli"}</span>
                  {homeContent.hero.isVisible ? (
                    <Eye className="w-4 h-4 text-green-600" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Ana Başlık ({currentLanguage.toUpperCase()})</Label>
                    <Input
                      value={homeContent.hero.title[currentLanguage] || ""}
                      onChange={(e) => updateContent("hero", "title", e.target.value, currentLanguage)}
                      placeholder="SHINEST"
                    />
                  </div>
                  <div>
                    <Label>Alt Başlık ({currentLanguage.toUpperCase()})</Label>
                    <Input
                      value={homeContent.hero.subtitle[currentLanguage] || ""}
                      onChange={(e) => updateContent("hero", "subtitle", e.target.value, currentLanguage)}
                      placeholder="İÇ MİMARLIK"
                    />
                  </div>
                  <div>
                    <Label>Açıklama ({currentLanguage.toUpperCase()})</Label>
                    <Textarea
                      value={homeContent.hero.description[currentLanguage] || ""}
                      onChange={(e) => updateContent("hero", "description", e.target.value, currentLanguage)}
                      placeholder="Hayalinizdeki mekanları gerçeğe dönüştürüyoruz"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Buton Metni ({currentLanguage.toUpperCase()})</Label>
                    <Input
                      value={homeContent.hero.buttonText[currentLanguage] || ""}
                      onChange={(e) => updateContent("hero", "buttonText", e.target.value, currentLanguage)}
                      placeholder="Keşfet"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Hero Görseli</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <img
                        src={homeContent.hero.backgroundImage || "/placeholder.svg"}
                        alt="Hero"
                        className="mx-auto h-32 w-auto object-cover rounded mb-4"
                      />
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Görsel yüklemek için tıklayın</p>
                      <Button variant="outline" size="sm">
                        Görsel Seç
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={homeContent.hero.showAnimation}
                      onCheckedChange={(checked) => updateContent("hero", "showAnimation", checked)}
                    />
                    <Label>Animasyon Göster</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSave("hero")} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Kaydediliyor..." : "Hero Kaydet"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Text Section */}
        <TabsContent value="text">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Büyük Metin Bölümü</CardTitle>
                  <CardDescription>Ana sayfa büyük metin bölümünü düzenleyin</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={homeContent.textSection.isVisible}
                    onCheckedChange={(checked) => updateContent("textSection", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">
                    {homeContent.textSection.isVisible ? "Görünür" : "Gizli"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Ana Metin 1 ({currentLanguage.toUpperCase()})</Label>
                    <Input
                      value={homeContent.textSection.mainText1[currentLanguage] || ""}
                      onChange={(e) => updateContent("textSection", "mainText1", e.target.value, currentLanguage)}
                      placeholder="MEKANLARINIZ"
                    />
                  </div>
                  <div>
                    <Label>Ana Metin 2 ({currentLanguage.toUpperCase()})</Label>
                    <Input
                      value={homeContent.textSection.mainText2[currentLanguage] || ""}
                      onChange={(e) => updateContent("textSection", "mainText2", e.target.value, currentLanguage)}
                      placeholder="YAŞAMINIZA"
                    />
                  </div>
                  <div>
                    <Label>El Yazısı Metin ({currentLanguage.toUpperCase()})</Label>
                    <Input
                      value={homeContent.textSection.handwritingText[currentLanguage] || ""}
                      onChange={(e) => updateContent("textSection", "handwritingText", e.target.value, currentLanguage)}
                      placeholder="ışık tutar!"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Açıklama ({currentLanguage.toUpperCase()})</Label>
                    <Textarea
                      value={homeContent.textSection.description[currentLanguage] || ""}
                      onChange={(e) => updateContent("textSection", "description", e.target.value, currentLanguage)}
                      placeholder="SHINEST İç Mimarlık olarak..."
                      rows={6}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSave("textSection")} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Kaydediliyor..." : "Metin Bölümü Kaydet"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Section */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Hakkımızda Bölümü</CardTitle>
                  <CardDescription>Ana sayfa hakkımızda bölümünü düzenleyin</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={homeContent.aboutSection.isVisible}
                    onCheckedChange={(checked) => updateContent("aboutSection", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">
                    {homeContent.aboutSection.isVisible ? "Görünür" : "Gizli"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Başlık ({currentLanguage.toUpperCase()})</Label>
                    <Input
                      value={homeContent.aboutSection.title[currentLanguage] || ""}
                      onChange={(e) => updateContent("aboutSection", "title", e.target.value, currentLanguage)}
                      placeholder="Hakkımızda"
                    />
                  </div>
                  <div>
                    <Label>Alt Başlık ({currentLanguage.toUpperCase()})</Label>
                    <Input
                      value={homeContent.aboutSection.subtitle[currentLanguage] || ""}
                      onChange={(e) => updateContent("aboutSection", "subtitle", e.target.value, currentLanguage)}
                      placeholder="Tasarım Felsefemiz"
                    />
                  </div>
                  <div>
                    <Label>Açıklama ({currentLanguage.toUpperCase()})</Label>
                    <Textarea
                      value={homeContent.aboutSection.description[currentLanguage] || ""}
                      onChange={(e) => updateContent("aboutSection", "description", e.target.value, currentLanguage)}
                      placeholder="Yaşam alanlarınızı sanat eserine dönüştürüyoruz..."
                      rows={4}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Vizyon ({currentLanguage.toUpperCase()})</Label>
                    <Textarea
                      value={homeContent.aboutSection.vision[currentLanguage] || ""}
                      onChange={(e) => updateContent("aboutSection", "vision", e.target.value, currentLanguage)}
                      placeholder="İç mimarlık alanında yenilikçi..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Misyon ({currentLanguage.toUpperCase()})</Label>
                    <Textarea
                      value={homeContent.aboutSection.mission[currentLanguage] || ""}
                      onChange={(e) => updateContent("aboutSection", "mission", e.target.value, currentLanguage)}
                      placeholder="Müşterilerimizin hayallerini..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Values */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Değerlerimiz</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      addValue("aboutSection", "values", {
                        icon: "Star",
                        title: {
                          tr: "Yeni Değer",
                          en: "New Value",
                          de: "Neuer Wert",
                          fr: "Nouvelle Valeur",
                          it: "Nuovo Valore",
                          ru: "Новая Ценность",
                          ar: "قيمة جديدة",
                        },
                        description: {
                          tr: "Açıklama",
                          en: "Description",
                          de: "Beschreibung",
                          fr: "Description",
                          it: "Descrizione",
                          ru: "Описание",
                          ar: "وصف",
                        },
                      })
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Değer Ekle
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {homeContent.aboutSection.values.map((value) => (
                    <Card key={value.id} className="relative">
                      <CardContent className="p-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                          onClick={() => removeValue("aboutSection", "values", value.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <div className="space-y-3">
                          <div>
                            <Label>İkon</Label>
                            <Input
                              value={value.icon}
                              onChange={(e) =>
                                updateArrayItem("aboutSection", "values", value.id, { icon: e.target.value })
                              }
                              placeholder="Lightbulb"
                            />
                          </div>
                          <div>
                            <Label>Başlık ({currentLanguage.toUpperCase()})</Label>
                            <Input
                              value={value.title[currentLanguage] || ""}
                              onChange={(e) =>
                                updateArrayItem("aboutSection", "values", value.id, {
                                  title: { ...value.title, [currentLanguage]: e.target.value },
                                })
                              }
                              placeholder="Yenilikçilik"
                            />
                          </div>
                          <div>
                            <Label>Açıklama ({currentLanguage.toUpperCase()})</Label>
                            <Textarea
                              value={value.description[currentLanguage] || ""}
                              onChange={(e) =>
                                updateArrayItem("aboutSection", "values", value.id, {
                                  description: { ...value.description, [currentLanguage]: e.target.value },
                                })
                              }
                              placeholder="Açıklama metni..."
                              rows={3}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("aboutSection")} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Kaydediliyor..." : "Hakkımızda Kaydet"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Section */}
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Hizmetler Bölümü</CardTitle>
                  <CardDescription>Ana sayfa hizmetler bölümünü düzenleyin</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={homeContent.servicesSection.isVisible}
                    onCheckedChange={(checked) => updateContent("servicesSection", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">
                    {homeContent.servicesSection.isVisible ? "Görünür" : "Gizli"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Başlık ({currentLanguage.toUpperCase()})</Label>
                  <Input
                    value={homeContent.servicesSection.title[currentLanguage] || ""}
                    onChange={(e) => updateContent("servicesSection", "title", e.target.value, currentLanguage)}
                    placeholder="Hizmetlerimiz"
                  />
                </div>
                <div>
                  <Label>Alt Başlık ({currentLanguage.toUpperCase()})</Label>
                  <Textarea
                    value={homeContent.servicesSection.subtitle[currentLanguage] || ""}
                    onChange={(e) => updateContent("servicesSection", "subtitle", e.target.value, currentLanguage)}
                    placeholder="SHINEST İç Mimarlık olarak..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Hizmetler</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      addValue("servicesSection", "services", {
                        title: {
                          tr: "Yeni Hizmet",
                          en: "New Service",
                          de: "Neue Dienstleistung",
                          fr: "Nouveau Service",
                          it: "Nuovo Servizio",
                          ru: "Новая Услуга",
                          ar: "خدمة جديدة",
                        },
                        description: {
                          tr: "Hizmet açıklaması",
                          en: "Service description",
                          de: "Service-Beschreibung",
                          fr: "Description du service",
                          it: "Descrizione del servizio",
                          ru: "Описание услуги",
                          ar: "وصف الخدمة",
                        },
                        image: "/placeholder.svg",
                        features: [],
                      })
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Hizmet Ekle
                  </Button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {homeContent.servicesSection.services.map((service) => (
                    <Card key={service.id} className="relative">
                      <CardContent className="p-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                          onClick={() => removeValue("servicesSection", "services", service.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Başlık ({currentLanguage.toUpperCase()})</Label>
                              <Input
                                value={service.title[currentLanguage] || ""}
                                onChange={(e) =>
                                  updateArrayItem("servicesSection", "services", service.id, {
                                    title: { ...service.title, [currentLanguage]: e.target.value },
                                  })
                                }
                                placeholder="Danışmanlık"
                              />
                            </div>
                            <div>
                              <Label>Görsel</Label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 text-center">
                                <img
                                  src={service.image || "/placeholder.svg"}
                                  alt="Service"
                                  className="mx-auto h-16 w-auto object-cover rounded mb-2"
                                />
                                <Button variant="outline" size="sm">
                                  Görsel Seç
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Label>Açıklama ({currentLanguage.toUpperCase()})</Label>
                            <Textarea
                              value={service.description[currentLanguage] || ""}
                              onChange={(e) =>
                                updateArrayItem("servicesSection", "services", service.id, {
                                  description: { ...service.description, [currentLanguage]: e.target.value },
                                })
                              }
                              placeholder="Hizmet açıklaması..."
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label>Özellikler</Label>
                            <div className="space-y-2">
                              {service.features?.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <Input
                                    value={feature[currentLanguage] || ""}
                                    onChange={(e) => {
                                      const newFeatures = [...service.features]
                                      newFeatures[index] = { ...feature, [currentLanguage]: e.target.value }
                                      updateArrayItem("servicesSection", "services", service.id, {
                                        features: newFeatures,
                                      })
                                    }}
                                    placeholder="Özellik"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      const newFeatures = service.features.filter((_, i) => i !== index)
                                      updateArrayItem("servicesSection", "services", service.id, {
                                        features: newFeatures,
                                      })
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newFeatures = [
                                    ...(service.features || []),
                                    {
                                      tr: "Yeni Özellik",
                                      en: "New Feature",
                                      de: "Neue Funktion",
                                      fr: "Nouvelle Fonctionnalité",
                                      it: "Nuova Caratteristica",
                                      ru: "Новая Функция",
                                      ar: "ميزة جديدة",
                                    },
                                  ]
                                  updateArrayItem("servicesSection", "services", service.id, { features: newFeatures })
                                }}
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Özellik Ekle
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("servicesSection")} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Kaydediliyor..." : "Hizmetler Kaydet"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Section */}
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Projeler Bölümü</CardTitle>
                  <CardDescription>Ana sayfa projeler bölümünü düzenleyin</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={homeContent.projectsSection.isVisible}
                    onCheckedChange={(checked) => updateContent("projectsSection", "isVisible", checked)}
                  />
                  <span className="text-sm text-gray-600">
                    {homeContent.projectsSection.isVisible ? "Görünür" : "Gizli"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label>Başlık ({currentLanguage.toUpperCase()})</Label>
                  <Input
                    value={homeContent.projectsSection.title[currentLanguage] || ""}
                    onChange={(e) => updateContent("projectsSection", "title", e.target.value, currentLanguage)}
                    placeholder="Projelerimiz"
                  />
                </div>
                <div>
                  <Label>Alt Başlık ({currentLanguage.toUpperCase()})</Label>
                  <Input
                    value={homeContent.projectsSection.subtitle[currentLanguage] || ""}
                    onChange={(e) => updateContent("projectsSection", "subtitle", e.target.value, currentLanguage)}
                    placeholder="Öne Çıkan Çalışmalarımız"
                  />
                </div>
                <div>
                  <Label>Gösterilecek Proje Sayısı</Label>
                  <Input
                    type="number"
                    value={homeContent.projectsSection.displayCount}
                    onChange={(e) => updateContent("projectsSection", "displayCount", Number.parseInt(e.target.value))}
                    placeholder="6"
                  />
                </div>
              </div>

              <div>
                <Label>Açıklama ({currentLanguage.toUpperCase()})</Label>
                <Textarea
                  value={homeContent.projectsSection.description[currentLanguage] || ""}
                  onChange={(e) => updateContent("projectsSection", "description", e.target.value, currentLanguage)}
                  placeholder="Gerçekleştirdiğimiz projelerden örnekler..."
                  rows={3}
                />
              </div>

              {/* Featured Projects */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Öne Çıkan Projeler</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      addValue("projectsSection", "featuredProjects", {
                        title: {
                          tr: "Yeni Proje",
                          en: "New Project",
                          de: "Neues Projekt",
                          fr: "Nouveau Projet",
                          it: "Nuovo Progetto",
                          ru: "Новый Проект",
                          ar: "مشروع جديد",
                        },
                        category: {
                          tr: "Kategori",
                          en: "Category",
                          de: "Kategorie",
                          fr: "Catégorie",
                          it: "Categoria",
                          ru: "Категория",
                          ar: "فئة",
                        },
                        location: {
                          tr: "Konum",
                          en: "Location",
                          de: "Standort",
                          fr: "Emplacement",
                          it: "Posizione",
                          ru: "Местоположение",
                          ar: "الموقع",
                        },
                        year: new Date().getFullYear().toString(),
                        image: "/placeholder.svg",
                        description: {
                          tr: "Proje açıklaması",
                          en: "Project description",
                          de: "Projektbeschreibung",
                          fr: "Description du projet",
                          it: "Descrizione del progetto",
                          ru: "Описание проекта",
                          ar: "وصف المشروع",
                        },
                      })
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Proje Ekle
                  </Button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {homeContent.projectsSection.featuredProjects.map((project) => (
                    <Card key={project.id} className="relative">
                      <CardContent className="p-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                          onClick={() => removeValue("projectsSection", "featuredProjects", project.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Başlık ({currentLanguage.toUpperCase()})</Label>
                              <Input
                                value={project.title[currentLanguage] || ""}
                                onChange={(e) =>
                                  updateArrayItem("projectsSection", "featuredProjects", project.id, {
                                    title: { ...project.title, [currentLanguage]: e.target.value },
                                  })
                                }
                                placeholder="Modern Yaşam Alanı"
                              />
                            </div>
                            <div>
                              <Label>Kategori ({currentLanguage.toUpperCase()})</Label>
                              <Input
                                value={project.category[currentLanguage] || ""}
                                onChange={(e) =>
                                  updateArrayItem("projectsSection", "featuredProjects", project.id, {
                                    category: { ...project.category, [currentLanguage]: e.target.value },
                                  })
                                }
                                placeholder="Konut"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Konum ({currentLanguage.toUpperCase()})</Label>
                              <Input
                                value={project.location[currentLanguage] || ""}
                                onChange={(e) =>
                                  updateArrayItem("projectsSection", "featuredProjects", project.id, {
                                    location: { ...project.location, [currentLanguage]: e.target.value },
                                  })
                                }
                                placeholder="İzmir"
                              />
                            </div>
                            <div>
                              <Label>Yıl</Label>
                              <Input
                                value={project.year}
                                onChange={(e) =>
                                  updateArrayItem("projectsSection", "featuredProjects", project.id, {
                                    year: e.target.value,
                                  })
                                }
                                placeholder="2024"
                              />
                            </div>
                          </div>
                          <div>
                            <Label>Açıklama ({currentLanguage.toUpperCase()})</Label>
                            <Textarea
                              value={project.description[currentLanguage] || ""}
                              onChange={(e) =>
                                updateArrayItem("projectsSection", "featuredProjects", project.id, {
                                  description: { ...project.description, [currentLanguage]: e.target.value },
                                })
                              }
                              placeholder="Proje açıklaması..."
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label>Proje Görseli</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                              <img
                                src={project.image || "/placeholder.svg"}
                                alt="Project"
                                className="mx-auto h-24 w-auto object-cover rounded mb-2"
                              />
                              <Button variant="outline" size="sm">
                                Görsel Seç
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("projectsSection")} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Kaydediliyor..." : "Projeler Kaydet"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
