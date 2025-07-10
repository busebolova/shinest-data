"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, MapPin, Tag } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useQuoteForm } from "@/contexts/quote-form-context"
import { getProjects, type Project } from "@/lib/database"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const { language } = useLanguage()
  const { openQuoteForm } = useQuoteForm()

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects()
        setProjects(data.filter((p) => p.status === "published"))
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))]
  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((p) => p.category === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#15415b]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-[#15415b] to-[#1a4a66] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* SHINEST Animation */}
            <div className="flex justify-center items-center space-x-2 mb-8">
              {["S", "H", "I", "N", "E", "S", "T"].map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="text-6xl md:text-8xl font-bold tracking-wider"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-2xl md:text-3xl font-light tracking-wide"
            >
              {language === "tr" ? "PROJELERİMİZ" : "OUR PROJECTS"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
            >
              {language === "tr"
                ? "Hayallerinizi gerçeğe dönüştürdüğümüz projelerimizi keşfedin"
                : "Discover our projects where we turn your dreams into reality"}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#15415b] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                {category === "all" ? (language === "tr" ? "Tümü" : "All") : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-32">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Project Image */}
                <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={project.images[0] || "/placeholder.svg?height=500&width=600"}
                      alt={project.title[language]}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>

                  {/* Project Tags */}
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    <span className="bg-white/90 backdrop-blur-sm text-[#15415b] px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="bg-[#c4975a]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                        {language === "tr" ? "Öne Çıkan" : "Featured"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#15415b] leading-tight">
                      {project.title[language]}
                    </h2>

                    <p className="text-lg text-gray-600 leading-relaxed">{project.description[language]}</p>
                  </div>

                  {/* Project Details */}
                  <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{project.year}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4" />
                      <span>{project.category}</span>
                    </div>
                  </div>

                  {/* Project Link */}
                  <div className="pt-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center space-x-2 bg-[#15415b] text-white px-8 py-4 rounded-full font-medium hover:bg-[#1a4a66] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <span>{language === "tr" ? "Projeyi İncele" : "View Project"}</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#15415b] to-[#1a4a66]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {language === "tr"
                ? "Hayalinizdeki Projeyi Birlikte Gerçekleştirelim"
                : "Let's Realize Your Dream Project Together"}
            </h2>

            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              {language === "tr"
                ? "Uzman ekibimizle yaşam alanlarınızı sanat eserine dönüştürün"
                : "Transform your living spaces into works of art with our expert team"}
            </p>

            <button
              onClick={openQuoteForm}
              className="bg-[#c4975a] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#b8864d] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {language === "tr" ? "Ücretsiz Teklif Alın" : "Get Free Quote"}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
