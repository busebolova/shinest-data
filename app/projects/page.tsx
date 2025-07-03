"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, Calendar, MapPin, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useGitHubProjects } from "@/hooks/use-github-projects"
import { Footer } from "@/components/footer"

export default function ProjectsPage() {
  const { projects, loading, error } = useGitHubProjects()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-[4/3] rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-red-600">Projeler yüklenirken bir hata oluştu: {error}</p>
        </div>
      </div>
    )
  }

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
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#f8f6f3] to-[#f0ede8]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-shinest-blue mb-6">Projelerimiz</h1>
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Gerçekleştirdiğimiz projeleri keşfedin ve ilham alın. Her proje, benzersiz bir hikaye anlatır.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Proje ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-shinest-blue"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-shinest-blue"
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
                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-shinest-blue"
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
                className="border-gray-200 hover:bg-gray-50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtreleri Temizle
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Arama kriterlerinize uygun proje bulunamadı.</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <p className="text-gray-600">{filteredProjects.length} proje bulundu</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link href={`/projects/${project.id}`}>
                      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={project.images[0] || "/placeholder.svg?height=300&width=400"}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="flex items-center justify-between text-white">
                              <Badge variant="secondary" className="bg-white/20 text-white border-0">
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
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                          <div className="flex items-center justify-between text-sm text-gray-500">
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
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
