"use client"

import { useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, MapPin, Eye } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useQuoteForm } from "@/contexts/quote-form-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface Project {
  id: string
  title: {
    tr: string
    en: string
  }
  description: {
    tr: string
    en: string
  }
  category: {
    tr: string
    en: string
  }
  images: string[]
  featured: boolean
  status: "draft" | "published"
  year: string
  location: string
  area?: string
  client?: string
  slug: string
  features?: {
    tr: string[]
    en: string[]
  }
}

// Animated text component for letter-by-letter animation
function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
  const letters = text.split("")

  return (
    <span className="inline-block">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -90, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.05,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  )
}

export default function ProjectsPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const { language } = useLanguage()
  const { openQuoteForm } = useQuoteForm()

  // Default projects data
  const defaultProjects: Project[] = [
    {
      id: "1",
      title: {
        tr: "Modern Yaşam Alanı",
        en: "Modern Living Space",
      },
      description: {
        tr: "Minimalist tasarım anlayışıyla modern yaşam alanı projesi. Açık plan konsepti ile geniş ve ferah bir atmosfer yaratılmıştır.",
        en: "Modern living space project with minimalist design approach. An open plan concept creates a spacious and airy atmosphere.",
      },
      category: {
        tr: "Konut",
        en: "Residential",
      },
      images: ["/images/poland-apartment-1.png", "/images/poland-apartment-2.png"],
      featured: true,
      status: "published",
      year: "2024",
      location: "İstanbul",
      area: "120m²",
      slug: "modern-yasam-alani",
      features: {
        tr: ["Açık Plan Konsept", "Modern Mobilyalar", "Doğal Aydınlatma"],
        en: ["Open Plan Concept", "Modern Furniture", "Natural Lighting"],
      },
    },
    {
      id: "2",
      title: {
        tr: "Lüks Ofis Tasarımı",
        en: "Luxury Office Design",
      },
      description: {
        tr: "Profesyonel ve şık ofis iç mekan tasarımı projesi. Çalışan verimliliğini artıran ergonomik çözümler uygulanmıştır.",
        en: "Professional and elegant office interior design project. Ergonomic solutions that increase employee productivity have been implemented.",
      },
      category: {
        tr: "Ofis",
        en: "Office",
      },
      images: ["/images/modern-wooden-office.png"],
      featured: true,
      status: "published",
      year: "2024",
      location: "Ankara",
      area: "200m²",
      slug: "luks-ofis-tasarimi",
      features: {
        tr: ["Ergonomik Tasarım", "Akıllı Sistemler", "Toplantı Odaları"],
        en: ["Ergonomic Design", "Smart Systems", "Meeting Rooms"],
      },
    },
    {
      id: "3",
      title: {
        tr: "Butik Otel Lobisi",
        en: "Boutique Hotel Lobby",
      },
      description: {
        tr: "Konforlu ve etkileyici otel lobisi tasarım projesi. Misafirlere unutulmaz bir karşılama deneyimi sunmaktadır.",
        en: "Comfortable and impressive hotel lobby design project. It offers guests an unforgettable welcome experience.",
      },
      category: {
        tr: "Ticari",
        en: "Commercial",
      },
      images: ["/images/luxury-hotel-lobby.png"],
      featured: false,
      status: "published",
      year: "2024",
      location: "İzmir",
      area: "300m²",
      slug: "butik-otel-lobisi",
      features: {
        tr: ["Lüks Mobilyalar", "Özel Aydınlatma", "Karşılama Alanı"],
        en: ["Luxury Furniture", "Special Lighting", "Reception Area"],
      },
    },
    {
      id: "4",
      title: {
        tr: "Yatak Odası Tasarımı",
        en: "Bedroom Design",
      },
      description: {
        tr: "Rahat ve şık yatak odası iç mekan tasarımı. Dinlendirici renkler ve fonksiyonel mobilyalar kullanılmıştır.",
        en: "Comfortable and elegant bedroom interior design. Relaxing colors and functional furniture are used.",
      },
      category: {
        tr: "Konut",
        en: "Residential",
      },
      images: ["/images/bedroom-design-1.png", "/images/bedroom-design-2.png"],
      featured: false,
      status: "published",
      year: "2023",
      location: "Bursa",
      area: "25m²",
      slug: "yatak-odasi-tasarimi",
      features: {
        tr: ["Özel Dolap Tasarımı", "Yumuşak Aydınlatma", "Konforlu Yatak"],
        en: ["Custom Wardrobe Design", "Soft Lighting", "Comfortable Bed"],
      },
    },
    {
      id: "5",
      title: {
        tr: "Cafe İç Mekan",
        en: "Cafe Interior",
      },
      description: {
        tr: "Modern ve sıcak cafe iç mekan tasarım projesi. Müşterilerin rahat edebileceği samimi bir atmosfer yaratılmıştır.",
        en: "Modern and warm cafe interior design project. An intimate atmosphere has been created where customers can relax.",
      },
      category: {
        tr: "Ticari",
        en: "Commercial",
      },
      images: ["/images/cafe-design-1.png", "/images/cafe-design-2.png"],
      featured: false,
      status: "published",
      year: "2023",
      location: "Antalya",
      area: "80m²",
      slug: "cafe-ic-mekan",
      features: {
        tr: ["Sıcak Atmosfer", "Özel Bar Tasarımı", "Rahat Oturma"],
        en: ["Warm Atmosphere", "Custom Bar Design", "Comfortable Seating"],
      },
    },
    {
      id: "6",
      title: {
        tr: "Banyo Tasarımı",
        en: "Bathroom Design",
      },
      description: {
        tr: "Lüks ve fonksiyonel banyo tasarım projesi. Modern donanımlar ve kaliteli malzemeler kullanılmıştır.",
        en: "Luxury and functional bathroom design project. Modern equipment and quality materials are used.",
      },
      category: {
        tr: "Konut",
        en: "Residential",
      },
      images: ["/images/bathroom-design-1.png", "/images/bathroom-design-2.png"],
      featured: false,
      status: "published",
      year: "2023",
      location: "İstanbul",
      area: "15m²",
      slug: "banyo-tasarimi",
      features: {
        tr: ["Mermer Detaylar", "Akıllı Aynalar", "Lüks Armatürler"],
        en: ["Marble Details", "Smart Mirrors", "Luxury Fixtures"],
      },
    },
  ]

  // Get projects from localStorage (admin panel data)
  const getProjectsFromStorage = (): Project[] => {
    if (typeof window === "undefined") return []

    try {
      const storedProjects = localStorage.getItem("shinest_projects")
      if (storedProjects) {
        const parsed = JSON.parse(storedProjects)
        return Array.isArray(parsed) ? parsed : []
      }
    } catch (error) {
      console.error("Error reading projects from localStorage:", error)
    }

    return []
  }

  useEffect(() => {
    const loadProjects = () => {
      try {
        // First try to get from localStorage (admin panel)
        const storageProjects = getProjectsFromStorage()

        if (storageProjects.length > 0) {
          // Filter only published projects
          const publishedProjects = storageProjects.filter((project: Project) => project.status === "published")
          setProjects(publishedProjects.length > 0 ? publishedProjects : defaultProjects)
        } else {
          // Fallback to default projects
          setProjects(defaultProjects)
        }
      } catch (error) {
        console.error("Error loading projects:", error)
        setProjects(defaultProjects)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()

    // Listen for storage changes (when admin adds/updates projects)
    const handleStorageChange = () => {
      loadProjects()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const content = {
    tr: {
      title: "Projelerimiz",
      all: "Tümü",
      residential: "Konut",
      commercial: "Ticari",
      office: "Ofis",
      viewProject: "Projeyi İncele",
      noProjects: "Henüz yayınlanmış proje bulunmuyor.",
      loading: "Projeler yükleniyor...",
      description:
        "SHINEST İç Mimarlık, tam kapsamlı lüks iç mekan tasarım hizmetleri sunar — ilk konsept ve estetik danışmanlıktan koordinasyon, uygulama ve dergiye layık son dokunuşlara kadar.",
      cta: "Teklif Al",
    },
    en: {
      title: "Our Projects",
      all: "All",
      residential: "Residential",
      commercial: "Commercial",
      office: "Office",
      viewProject: "View Project",
      noProjects: "No published projects found.",
      loading: "Loading projects...",
      description:
        "SHINEST Interior Architecture provides comprehensive luxury interior design services — from initial concept and aesthetic consultation to coordination, implementation and magazine-worthy finishing touches.",
      cta: "Get Quote",
    },
  }

  const currentContent = content[language]

  // Get unique categories
  const categories = [
    { key: "all", label: currentContent.all },
    { key: "residential", label: currentContent.residential },
    { key: "commercial", label: currentContent.commercial },
    { key: "office", label: currentContent.office },
  ]

  // Filter projects by category
  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => {
          const categoryKey = project.category[language].toLowerCase()
          return (
            categoryKey.includes(selectedCategory) ||
            (selectedCategory === "residential" &&
              (categoryKey.includes("konut") || categoryKey.includes("villa") || categoryKey.includes("yatak"))) ||
            (selectedCategory === "commercial" &&
              (categoryKey.includes("ticari") || categoryKey.includes("otel") || categoryKey.includes("cafe"))) ||
            (selectedCategory === "office" && categoryKey.includes("ofis"))
          )
        })

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="pt-32">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c4975a] mx-auto"></div>
              <p className="mt-4 text-gray-600">{currentContent.loading}</p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section ref={ref} className="pt-32 py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Projects Title */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#15415b] mb-8">
              {currentContent.title}
            </h2>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.key
                    ? "bg-[#c4975a] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Project Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.images[0] || "/placeholder.svg?height=300&width=400"}
                    alt={project.title[language]}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#c4975a] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.category[language]}
                    </span>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {language === "tr" ? "Öne Çıkan" : "Featured"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-display text-2xl text-[#15415b] mb-3">{project.title[language]}</h3>
                  <p className="font-sans text-gray-600 mb-4 leading-relaxed">{project.description[language]}</p>

                  <ul className="space-y-2 mb-4">
                    {project.features?.[language]?.map((feature, idx) => (
                      <li key={idx} className="font-sans text-sm text-gray-500 flex items-center">
                        <span className="w-2 h-2 bg-[#c4975a] rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{project.year}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    {project.area && (
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{project.area}</span>
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center space-x-2 text-[#c4975a] font-medium hover:text-[#b8864d] transition-colors duration-300"
                  >
                    <span>{currentContent.viewProject}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Large Animated Text */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <div className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#15415b] leading-tight tracking-tight flex justify-center flex-wrap">
              <div className="w-full">
                <AnimatedText text="MEKANLARINIZ" delay={1.6} />
              </div>
              <div className="w-full">
                <AnimatedText text="YAŞAMINIZA" delay={2.2} />
              </div>
              <div className="w-full">
                <AnimatedText text="IŞIK" delay={2.8} />
                <span className="mx-4"></span>
                <AnimatedText text="TUTAR!" delay={3.0} />
              </div>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 3.5 }}
          >
            <p className="font-sans text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {currentContent.description}
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 4.0 }}
          >
            <button
              onClick={openQuoteForm}
              className="font-display bg-[#15415b] text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-[#1a4a66] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {currentContent.cta}
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
