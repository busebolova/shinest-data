"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, Users, Star } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface Project {
  id: number
  title: string
  category: string
  location: string
  area: string
  year: string
  description: string
  image: string
  featured?: boolean
  status?: string
  features?: string[]
  client?: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const shinestLetters = "SHINEST".split("")

  // Static projects that are always available
  const staticProjects: Project[] = [
    {
      id: 1,
      title: "Modern Yaşam Alanı",
      category: "residential",
      location: "İstanbul",
      area: "120m²",
      year: "2024",
      description:
        "Minimalist tasarım anlayışı ile modern yaşam alanı tasarımı. Açık plan konsepti ve doğal ışık kullanımı ile konforlu ve estetik bir yaşam alanı yarattık. Her detay düşünülerek tasarlanan bu projede, kullanıcının ihtiyaçları ve modern yaşam tarzı bir araya getirildi.",
      image: "/images/modern-living-room.jpeg",
      featured: true,
      features: ["Açık Plan", "Doğal Işık", "Modern Mobilya", "Akıllı Ev Sistemi"],
      client: "Özel Müşteri",
    },
    {
      id: 2,
      title: "Lüks Ofis Tasarımı",
      category: "office",
      location: "Ankara",
      area: "200m²",
      year: "2024",
      description:
        "Kurumsal kimliği yansıtan lüks ofis tasarımı. Fonksiyonellik ve estetik mükemmel uyum içinde. Çalışanların verimliliğini artıracak ergonomik çözümler ve şık tasarım elementleri ile modern iş dünyasının gereksinimlerini karşılayan bir çalışma ortamı yaratıldı.",
      image: "/images/modern-wooden-office.png",
      featured: true,
      features: ["Kurumsal Tasarım", "Ergonomik Mobilya", "Ses İzolasyonu", "Toplantı Odaları"],
      client: "Teknoloji Şirketi",
    },
    {
      id: 3,
      title: "Butik Otel Lobisi",
      category: "commercial",
      location: "İzmir",
      area: "300m²",
      year: "2023",
      description:
        "Misafirleri karşılayan etkileyici lobi tasarımı. Lüks ve konfor bir arada. Otelin prestijini yansıtan özel tasarım elementleri ve kaliteli malzemeler kullanılarak, unutulmaz bir ilk izlenim yaratan mekan tasarlandı.",
      image: "/images/luxury-hotel-lobby.png",
      features: ["Lüks Malzemeler", "Özel Aydınlatma", "Resepsiyon Tasarımı", "Oturma Alanları"],
      client: "Butik Otel",
    },
    {
      id: 4,
      title: "Yatak Odası Tasarımı",
      category: "residential",
      location: "Bursa",
      area: "25m²",
      year: "2023",
      description:
        "Huzurlu ve rahat bir yatak odası tasarımı. Depolama çözümleri ve konfor odaklı yaklaşım. Dinlendirici renkler ve yumuşak dokular kullanılarak, günün yorgunluğunu atacağınız kişisel bir sığınak yaratıldı.",
      image: "/images/bedroom-design-1.png",
      features: ["Gömme Dolap", "Özel Aydınlatma", "Konforlu Yatak", "Çalışma Alanı"],
      client: "Genç Çift",
    },
    {
      id: 5,
      title: "Cafe İç Mekan",
      category: "commercial",
      location: "Antalya",
      area: "80m²",
      year: "2023",
      description:
        "Sıcak ve davetkar cafe tasarımı. Müşteri deneyimini ön planda tutan konsept. Doğal malzemeler ve sıcak renklerle, müşterilerin rahatça vakit geçirebileceği samimi bir atmosfer yaratıldı.",
      image: "/images/cafe-design-1.png",
      features: ["Sıcak Atmosfer", "Özel Bar", "Oturma Düzeni", "Marka Kimliği"],
      client: "Cafe Sahibi",
    },
    {
      id: 6,
      title: "Banyo Tasarımı",
      category: "residential",
      location: "İstanbul",
      area: "15m²",
      year: "2024",
      description:
        "Modern ve fonksiyonel banyo tasarımı. Su tasarrufu ve estetik bir arada. Kompakt alanda maksimum işlevsellik sağlayan akıllı çözümler ve kaliteli malzemelerle lüks bir banyo deneyimi sunuldu.",
      image: "/images/bathroom-design-1.png",
      features: ["Modern Armatürler", "Duş Kabini", "Depolama", "LED Aydınlatma"],
      client: "Aile",
    },
  ]

  // Load projects from localStorage and combine with static projects
  const loadProjects = () => {
    console.log("🚀 ProjectsPage: Starting to load projects...")

    // Try to get admin projects from localStorage
    const adminProjects = localStorage.getItem("shinest_projects")
    let allProjects = [...staticProjects]

    if (adminProjects) {
      try {
        const parsedAdminProjects = JSON.parse(adminProjects)
        if (Array.isArray(parsedAdminProjects)) {
          const publishedAdminProjects = parsedAdminProjects.filter(
            (project: Project) => project.status === "published",
          )
          console.log(`📊 Found ${parsedAdminProjects.length} admin projects`)
          console.log(`✅ ${publishedAdminProjects.length} published admin projects`)

          // Add admin projects to the beginning
          allProjects = [...publishedAdminProjects, ...staticProjects]
        }
      } catch (error) {
        console.error("Error parsing admin projects:", error)
      }
    }

    console.log(`🔄 Combined: ${allProjects.length} total projects`)
    setProjects(allProjects)
    setLoading(false)
  }

  const handleQuoteClick = () => {
    alert("Teklif formu yakında eklenecek!")
  }

  useEffect(() => {
    // Sayfa yüklendiğinde scroll'u en üste al
    window.scrollTo(0, 0)

    // State'leri reset et
    setIsLoaded(false)
    setLoading(true)

    // Load projects
    loadProjects()

    // Listen for storage changes (when admin adds new projects)
    const handleStorageChange = () => {
      console.log("📡 Storage changed, reloading projects...")
      loadProjects()
    }

    window.addEventListener("storage", handleStorageChange)

    // Kısa bir delay sonra animasyonları başlat
    const initialTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => {
      clearTimeout(initialTimer)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f3f0]">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#15415b] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Projeler yükleniyor...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Show only featured projects (first 6)
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 6)

  return (
    <main className="min-h-screen bg-[#f5f3f0]">
      <Header />

      <section className="pt-32 sm:pt-36 md:pt-40 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Header - Mobile Responsive */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* SHINEST - Yukarıdan gelen harf animasyonu */}
            <div className="font-display text-[16vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] xl:text-[8vw] text-shinest-blue leading-[0.85] font-normal mb-6 md:mb-8 flex justify-center">
              {shinestLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, y: -50, scale: 0.8 }}
                  animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -50, scale: 0.8 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.3 + index * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Projelerimiz Başlığı */}
            <motion.div
              className="text-[#c4975a] text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] xl:text-[3vw] flex justify-center font-display"
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -30, scale: 0.8 }}
              transition={{
                duration: 1.2,
                delay: 1.3,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100,
                damping: 12,
              }}
            >
              Projelerimiz
            </motion.div>
          </motion.div>

          {/* Projeler Listesi */}
          <div className="grid grid-cols-1 gap-16 mb-16">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 1.8 + index * 0.2 }}
              >
                {/* Görsel */}
                <div
                  className={`relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden shadow-lg ${
                    index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 bg-[#c4975a] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star size={14} fill="currentColor" />
                      Öne Çıkan
                    </div>
                  )}
                </div>

                {/* İçerik */}
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                  <h2 className="font-display text-3xl text-shinest-blue">{project.title}</h2>

                  {/* Proje Detayları */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{project.year}</span>
                    </div>
                    {project.client && (
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{project.client}</span>
                      </div>
                    )}
                    <div className="bg-[#c4975a] text-white px-2 py-1 rounded text-xs">{project.area}</div>
                  </div>

                  <p className="font-sans text-lg text-[#2a2a2a] leading-relaxed">{project.description}</p>

                  {/* Features */}
                  {project.features && (
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature, idx) => (
                        <span key={idx} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 bg-shinest-blue text-white px-6 py-3 rounded-full font-sans font-medium hover:bg-shinest-blue/80 transition-colors duration-300"
                  >
                    <span>Detaylı Bilgi</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* All Projects Link */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 2.6 }}
          >
            <Link
              href="/projects/all"
              className="inline-flex items-center gap-2 bg-white text-shinest-blue border-2 border-shinest-blue px-8 py-4 rounded-full font-sans font-medium hover:bg-shinest-blue hover:text-white transition-colors duration-300"
            >
              <span>Tüm Projeleri Gör</span>
            </Link>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center bg-white p-8 sm:p-12 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 2.8 }}
          >
            <h3 className="font-display text-2xl sm:text-3xl text-shinest-blue mb-4">Projeniz İçin Teklif Alın</h3>
            <p className="font-sans text-lg text-[#2a2a2a] mb-6 max-w-3xl mx-auto">
              SHINEST İç Mimarlık olarak, her projeye özel çözümler sunuyoruz. Hayalinizdeki mekanı birlikte yaratalım.
            </p>
            <button
              onClick={handleQuoteClick}
              className="inline-flex items-center gap-2 bg-shinest-blue text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-shinest-blue/80 transition-colors duration-300"
            >
              <span>Teklif Al</span>
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
