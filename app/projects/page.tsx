"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, Calendar, MapPin, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const projects = [
  {
    id: "1",
    title: "Modern Villa Tasarımı",
    description: "Minimalist yaklaşımla tasarlanan lüks villa projesi",
    category: "Konut",
    year: "2024",
    location: "İstanbul",
    images: ["/images/bathroom-design-1.png"],
  },
  {
    id: "2",
    title: "Boutique Otel Projesi",
    description: "Şehir merkezinde butik otel iç mekan tasarımı",
    category: "Ticari",
    year: "2023",
    location: "Ankara",
    images: ["/images/cafe-design-1.png"],
  },
  {
    id: "3",
    title: "Ofis Kompleksi",
    description: "Modern çalışma alanları ve ortak kullanım alanları",
    category: "Ofis",
    year: "2023",
    location: "İzmir",
    images: ["/images/living-room-design-1.png"],
  },
  {
    id: "4",
    title: "Lüks Daire Renovasyonu",
    description: "Klasik yapının modern dokunuşlarla yenilenmesi",
    category: "Konut",
    year: "2024",
    location: "İstanbul",
    images: ["/images/bedroom-design-1.png"],
  },
  {
    id: "5",
    title: "Restoran İç Mekan",
    description: "Gastronomi deneyimini destekleyen atmosfer tasarımı",
    category: "Ticari",
    year: "2023",
    location: "Bodrum",
    images: ["/images/winter-garden-1.png"],
  },
  {
    id: "6",
    title: "Spa & Wellness Merkezi",
    description: "Huzur ve rahatlama odaklı mekan tasarımı",
    category: "Ticari",
    year: "2024",
    location: "Antalya",
    images: ["/images/bathroom-design-2.png"],
  },
]

export default function ProjectsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const shinestLetters = "SHINEST".split("")

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsLoaded(false)
    const initialTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(initialTimer)
  }, [])

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    const matchesYear = selectedYear === "all" || project.year === selectedYear

    return matchesSearch && matchesCategory && matchesYear
  })

  // Get unique categories and years
  const categories = [...new Set(projects.map((p) => p.category))]
  const years = [...new Set(projects.map((p) => p.year))].sort((a, b) => b.localeCompare(a))

  return (
    <main className="min-h-screen bg-[#f5f3f0]">
      <Header />

      <section className="pt-32 sm:pt-36 md:pt-40 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Header - Blog sayfası ile aynı animasyon */}
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

            {/* Projeler başlığı - Kelime olarak animasyon */}
            <motion.div
              className="text-[#c4975a] text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] xl:text-[3vw] flex justify-center"
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
              Projeler
            </motion.div>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Proje ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-shinest-blue font-sans"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-shinest-blue font-sans"
              >
                <option value="all">Tüm Kategoriler</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Year Filter */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-shinest-blue font-sans"
              >
                <option value="all">Tüm Yıllar</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              {/* Reset Button */}
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedYear("all")
                }}
                className="border-gray-200 hover:bg-gray-50 font-sans"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtreleri Temizle
              </Button>
            </div>
          </motion.div>

          {/* Projects Grid - Mobile Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 1.8 + index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Link href={`/projects/${project.id}`}>
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={project.images[0] || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="flex items-center justify-between text-white">
                          <Badge variant="secondary" className="bg-white/20 text-white border-0 font-sans">
                            {project.category}
                          </Badge>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="font-display text-xl text-shinest-blue mb-2 group-hover:text-shinest-blue/80 transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-sans text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                      <div className="flex items-center justify-between text-sm text-gray-500 font-sans">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{project.year}</span>
                        </div>
                        {project.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{project.location}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
