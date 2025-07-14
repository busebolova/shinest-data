"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Grid, List, Search } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import { useProjects } from "@/hooks/use-projects"
import Link from "next/link"
import Image from "next/image"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
}

export default function AllProjectsPage() {
  const { language } = useLanguage()
  const { projects, loading, error } = useProjects()
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    let filtered = projects

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((project) => project.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.tr.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.tr.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredProjects(filtered)
  }, [projects, selectedCategory, searchTerm])

  const texts = {
    tr: {
      title: "TÜM PROJELERİMİZ",
      subtitle: "Tamamladığımız projelerin tam koleksiyonu",
      search: "Proje ara...",
      filter: "Filtrele",
      viewGrid: "Izgara Görünümü",
      viewList: "Liste Görünümü",
      categories: {
        all: "Tümü",
        residential: "Konut",
        commercial: "Ticari",
        hospitality: "Otel",
        office: "Ofis",
      },
      noResults: "Arama kriterlerinize uygun proje bulunamadı.",
      projectCount: "proje bulundu",
    },
    en: {
      title: "ALL OUR PROJECTS",
      subtitle: "Complete collection of our completed projects",
      search: "Search projects...",
      filter: "Filter",
      viewGrid: "Grid View",
      viewList: "List View",
      categories: {
        all: "All",
        residential: "Residential",
        commercial: "Commercial",
        hospitality: "Hospitality",
        office: "Office",
      },
      noResults: "No projects found matching your search criteria.",
      projectCount: "projects found",
    },
  }

  const t = texts[language]

  // Get unique categories from projects
  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category.toLowerCase())))]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            {t.title}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-[#1e40af] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t.categories[category as keyof typeof t.categories] || category}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-[#1e40af] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-[#1e40af] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredProjects.length} {t.projectCount}
          </div>
        </div>
      </section>

      {/* Projects Grid/List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-32 w-32 border-b-2 border-[#1e40af]"></div>
              <p className="mt-4 text-gray-600">Projeler yükleniyor...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-600">Projeler yüklenirken bir hata oluştu.</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">{t.noResults}</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-8"}
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className={
                    viewMode === "grid"
                      ? "group cursor-pointer"
                      : "group cursor-pointer border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                  }
                >
                  <Link href={`/projects/${project.slug}`}>
                    <div className={viewMode === "grid" ? "space-y-4" : "flex gap-6"}>
                      {/* Image */}
                      <div
                        className={`relative ${
                          viewMode === "grid"
                            ? "aspect-[4/3] rounded-2xl overflow-hidden"
                            : "flex-shrink-0 w-48 h-32 rounded-xl overflow-hidden"
                        }`}
                      >
                        {project.featured_image ? (
                          <Image
                            src={project.featured_image || "/placeholder.svg"}
                            alt={project.title.tr}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                            <span>Görsel yükleniyor...</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className={`space-y-3 ${viewMode === "list" ? "flex-1" : ""}`}>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-[#1e40af]/10 text-[#1e40af] rounded-full text-sm font-medium">
                            {project.category}
                          </span>
                          {project.year && <span className="text-sm text-gray-500">{project.year}</span>}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1e40af] transition-colors">
                          {project.title.tr}
                        </h3>

                        <p className="text-gray-600 text-sm line-clamp-2">{project.description.tr}</p>

                        {/* Project Details */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          {project.location && <span>📍 {project.location}</span>}
                          {project.area && <span>📐 {project.area}</span>}
                          {project.client && <span>👤 {project.client}</span>}
                        </div>

                        {/* Tags */}
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {project.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                +{project.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
