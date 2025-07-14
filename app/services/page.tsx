"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { CheckCircle, ArrowRight } from "lucide-react"
import Image from "next/image"

const services = [
  {
    id: "consulting",
    title: {
      tr: "Danışmanlık Hizmetleri",
      en: "Consulting Services",
      de: "Beratungsdienstleistungen",
      fr: "Services de Conseil",
      it: "Servizi di Consulenza",
      ru: "Консалтинговые услуги",
      ar: "خدمات الاستشارة",
    },
    description: {
      tr: "Uzman ekibimizle mekanınızın potansiyelini keşfedin ve en uygun çözümleri belirleyin.",
      en: "Discover your space's potential with our expert team and determine the most suitable solutions.",
      de: "Entdecken Sie das Potenzial Ihres Raumes mit unserem Expertenteam und bestimmen Sie die geeignetsten Lösungen.",
      fr: "Découvrez le potentiel de votre espace avec notre équipe d'experts et déterminez les solutions les plus appropriées.",
      it: "Scopri il potenziale del tuo spazio con il nostro team di esperti e determina le soluzioni più adatte.",
      ru: "Откройте потенциал вашего пространства с нашей командой экспертов и определите наиболее подходящие решения.",
      ar: "اكتشف إمكانات مساحتك مع فريق الخبراء لدينا وحدد الحلول الأنسب",
    },
    image: "/images/consulting-service.png",
    features: [
      {
        tr: "Mekan Analizi",
        en: "Space Analysis",
        de: "Raumanalyse",
        fr: "Analyse de l'Espace",
        it: "Analisi dello Spazio",
        ru: "Анализ пространства",
        ar: "تحليل المساحة",
      },
      {
        tr: "Bütçe Planlaması",
        en: "Budget Planning",
        de: "Budgetplanung",
        fr: "Planification Budgétaire",
        it: "Pianificazione del Budget",
        ru: "Планирование бюджета",
        ar: "تخطيط الميزانية",
      },
      {
        tr: "Konsept Geliştirme",
        en: "Concept Development",
        de: "Konzeptentwicklung",
        fr: "Développement de Concept",
        it: "Sviluppo del Concetto",
        ru: "Разработка концепции",
        ar: "تطوير المفهوم",
      },
    ],
  },
  {
    id: "design",
    title: {
      tr: "Tasarım Hizmetleri",
      en: "Design Services",
      de: "Design-Dienstleistungen",
      fr: "Services de Design",
      it: "Servizi di Design",
      ru: "Дизайнерские услуги",
      ar: "خدمات التصميم",
    },
    description: {
      tr: "Yaratıcı ve fonksiyonel tasarımlarla hayallerinizdeki mekanları gerçeğe dönüştürüyoruz.",
      en: "We turn your dream spaces into reality with creative and functional designs.",
      de: "Wir verwandeln Ihre Traumräume mit kreativen und funktionalen Designs in die Realität.",
      fr: "Nous transformons vos espaces de rêve en réalité avec des designs créatifs et fonctionnels.",
      it: "Trasformiamo i tuoi spazi da sogno in realtà con design creativi e funzionali.",
      ru: "Мы превращаем пространства вашей мечты в реальность с помощью креативных и функциональных дизайнов.",
      ar: "نحول مساحات أحلامك إلى واقع بتصاميم إبداعية ووظيفية",
    },
    image: "/images/design-service.png",
    features: [
      {
        tr: "3D Görselleştirme",
        en: "3D Visualization",
        de: "3D-Visualisierung",
        fr: "Visualisation 3D",
        it: "Visualizzazione 3D",
        ru: "3D визуализация",
        ar: "التصور ثلاثي الأبعاد",
      },
      {
        tr: "Renk Paleti",
        en: "Color Palette",
        de: "Farbpalette",
        fr: "Palette de Couleurs",
        it: "Tavolozza dei Colori",
        ru: "Цветовая палитра",
        ar: "لوحة الألوان",
      },
      {
        tr: "Mobilya Seçimi",
        en: "Furniture Selection",
        de: "Möbelauswahl",
        fr: "Sélection de Meubles",
        it: "Selezione di Mobili",
        ru: "Выбор мебели",
        ar: "اختيار الأثاث",
      },
    ],
  },
  {
    id: "implementation",
    title: {
      tr: "Uygulama Hizmetleri",
      en: "Implementation Services",
      de: "Umsetzungsdienstleistungen",
      fr: "Services de Mise en Œuvre",
      it: "Servizi di Implementazione",
      ru: "Услуги по реализации",
      ar: "خدمات التنفيذ",
    },
    description: {
      tr: "Tasarımdan uygulamaya kadar tüm süreci profesyonel ekibimizle yönetiyoruz.",
      en: "We manage the entire process from design to implementation with our professional team.",
      de: "Wir verwalten den gesamten Prozess von der Planung bis zur Umsetzung mit unserem professionellen Team.",
      fr: "Nous gérons tout le processus de la conception à la mise en œuvre avec notre équipe professionnelle.",
      it: "Gestiamo l'intero processo dalla progettazione all'implementazione con il nostro team professionale.",
      ru: "Мы управляем всем процессом от проектирования до реализации с нашей профессиональной командой.",
      ar: "نحن ندير العملية بأكملها من التصميم إلى التنفيذ مع فريقنا المحترف",
    },
    image: "/images/implementation-service.png",
    features: [
      {
        tr: "Proje Yönetimi",
        en: "Project Management",
        de: "Projektmanagement",
        fr: "Gestion de Projet",
        it: "Gestione del Progetto",
        ru: "Управление проектом",
        ar: "إدارة المشروع",
      },
      {
        tr: "Kalite Kontrolü",
        en: "Quality Control",
        de: "Qualitätskontrolle",
        fr: "Contrôle Qualité",
        it: "Controllo Qualità",
        ru: "Контроль качества",
        ar: "مراقبة الجودة",
      },
      {
        tr: "Zamanında Teslimat",
        en: "Timely Delivery",
        de: "Pünktliche Lieferung",
        fr: "Livraison Ponctuelle",
        it: "Consegna Puntuale",
        ru: "Своевременная доставка",
        ar: "التسليم في الوقت المحدد",
      },
    ],
  },
]

const stats = [
  {
    number: "500+",
    label: {
      tr: "Tamamlanan Proje",
      en: "Completed Projects",
      de: "Abgeschlossene Projekte",
      fr: "Projets Terminés",
      it: "Progetti Completati",
      ru: "Завершенных проектов",
      ar: "المشاريع المكتملة",
    },
  },
  {
    number: "15+",
    label: {
      tr: "Yıllık Deneyim",
      en: "Years Experience",
      de: "Jahre Erfahrung",
      fr: "Années d'Expérience",
      it: "Anni di Esperienza",
      ru: "Лет опыта",
      ar: "سنوات الخبرة",
    },
  },
  {
    number: "98%",
    label: {
      tr: "Müşteri Memnuniyeti",
      en: "Client Satisfaction",
      de: "Kundenzufriedenheit",
      fr: "Satisfaction Client",
      it: "Soddisfazione Cliente",
      ru: "Удовлетворенность клиентов",
      ar: "رضا العملاء",
    },
  },
  {
    number: "50+",
    label: {
      tr: "Uzman Ekip",
      en: "Expert Team",
      de: "Expertenteam",
      fr: "Équipe d'Experts",
      it: "Team di Esperti",
      ru: "Команда экспертов",
      ar: "فريق الخبراء",
    },
  },
]

const process = [
  {
    step: "01",
    title: {
      tr: "Keşif & Analiz",
      en: "Discovery & Analysis",
      de: "Entdeckung & Analyse",
      fr: "Découverte & Analyse",
      it: "Scoperta & Analisi",
      ru: "Исследование и анализ",
      ar: "الاستكشاف والتحليل",
    },
    description: {
      tr: "İhtiyaçlarınızı anlıyor ve mekanınızı detaylı analiz ediyoruz.",
      en: "We understand your needs and analyze your space in detail.",
      de: "Wir verstehen Ihre Bedürfnisse und analysieren Ihren Raum im Detail.",
      fr: "Nous comprenons vos besoins et analysons votre espace en détail.",
      it: "Comprendiamo le tue esigenze e analizziamo il tuo spazio in dettaglio.",
      ru: "Мы понимаем ваши потребности и детально анализируем ваше пространство.",
      ar: "نحن نفهم احتياجاتك ونحلل مساحتك بالتفصيل",
    },
  },
  {
    step: "02",
    title: {
      tr: "Konsept & Tasarım",
      en: "Concept & Design",
      de: "Konzept & Design",
      fr: "Concept & Design",
      it: "Concetto & Design",
      ru: "Концепция и дизайн",
      ar: "المفهوم والتصميم",
    },
    description: {
      tr: "Yaratıcı konseptler geliştiriyor ve detaylı tasarımlar hazırlıyoruz.",
      en: "We develop creative concepts and prepare detailed designs.",
      de: "Wir entwickeln kreative Konzepte und erstellen detaillierte Designs.",
      fr: "Nous développons des concepts créatifs et préparons des designs détaillés.",
      it: "Sviluppiamo concetti creativi e prepariamo design dettagliati.",
      ru: "Мы разрабатываем креативные концепции и готовим детальные дизайны.",
      ar: "نطور مفاهيم إبداعية ونعد تصاميم مفصلة",
    },
  },
  {
    step: "03",
    title: {
      tr: "Uygulama & Teslim",
      en: "Implementation & Delivery",
      de: "Umsetzung & Lieferung",
      fr: "Mise en Œuvre & Livraison",
      it: "Implementazione & Consegna",
      ru: "Реализация и доставка",
      ar: "التنفيذ والتسليم",
    },
    description: {
      tr: "Projenizi titizlikle uygulayıp zamanında teslim ediyoruz.",
      en: "We meticulously implement your project and deliver it on time.",
      de: "Wir setzen Ihr Projekt sorgfältig um und liefern es pünktlich.",
      fr: "Nous mettons en œuvre votre projet méticuleusement et le livrons à temps.",
      it: "Implementiamo meticolosamente il tuo progetto e lo consegniamo in tempo.",
      ru: "Мы тщательно реализуем ваш проект и доставляем его вовремя.",
      ar: "ننفذ مشروعك بدقة ونسلمه في الوقت المحدد",
    },
  },
]

export default function ServicesPage() {
  const { language, t } = useLanguage()

  const titleLetters = "SERVICES".split("")
  const subtitleWords = t("services.subtitle").split(" ")

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          {/* Animated Title */}
          <div className="mb-8">
            <div className="flex justify-center items-center space-x-2 mb-4">
              {titleLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="text-6xl md:text-8xl font-bold text-shinest-blue inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Animated Subtitle */}
            <div className="flex justify-center items-center flex-wrap gap-2">
              {subtitleWords.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.8 + index * 0.2,
                    ease: "easeOut",
                  }}
                  className="text-xl md:text-2xl text-gray-600 font-light"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-shinest-blue mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label[language]}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-shinest-blue mb-6">{t("services.ourServices")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("services.servicesDescription")}</p>
          </motion.div>

          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-12`}
              >
                <div className="flex-1">
                  <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title[language]}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-shinest-blue">{service.title[language]}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{service.description[language]}</p>

                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-shinest-gold flex-shrink-0" />
                        <span className="text-gray-700">{feature[language]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-shinest-blue mb-6">{t("services.ourProcess")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("services.processDescription")}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-shinest-gold text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold text-shinest-blue mb-4">{step.title[language]}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description[language]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-shinest-blue">{t("services.readyToStart")}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t("services.ctaDescription")}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-shinest-gold text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-shinest-gold/90 transition-all duration-200 inline-flex items-center space-x-2"
            >
              <span>{t("services.contactUs")}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
