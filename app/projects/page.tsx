"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { projects as allProjects } from "@/data/projects.json"

type Project = (typeof allProjects)[0]

export default function ProjectsPage() {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    setProjects(allProjects)
  }, [])

  const categories = useMemo(() => {
    if (!projects) return ["All"]
    const categorySet = new Set(projects.map((p) => (language === "tr" ? p.category_tr : p.category_en)))
    return ["All", ...Array.from(categorySet)]
  }, [projects, language])

  const filteredProjects = useMemo(() => {
    if (!projects) return []
    if (selectedCategory === "All") {
      return projects
    }
    return projects.filter((p) => (language === "tr" ? p.category_tr : p.category_en) === selectedCategory)
  }, [projects, selectedCategory, language])

  const content =
    language === "tr"
      ? {
          title: "Projelerimiz",
          description:
            "Yenilikçi ve estetik projelerimizle tanışın. Her biri, müşterilerimizin hayallerini gerçeğe dönüştürmek için özenle tasarlandı.",
          all: "Tümü",
          viewDetails: "Detayları Gör",
        }
      : {
          title: "Our Projects",
          description:
            "Discover our innovative and aesthetic projects. Each one is carefully designed to turn our clients' dreams into reality.",
          all: "All",
          viewDetails: "View Details",
        }

  return (
    <div className="bg-white text-gray-800" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="container mx-auto px-4 pt-28 pb-16 sm:pt-32 sm:pb-24">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#15415b] mb-4">{content.title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.description}</p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[#15415b] text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category === "All" ? content.all : category}
            </button>
          ))}
        </div>

        {/* Projects List */}
        <div className="space-y-20 md:space-y-28">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center`}
            >
              <div
                className={`relative w-full h-80 md:h-[500px] rounded-lg overflow-hidden shadow-xl ${
                  index % 2 === 0 ? "md:order-1" : "md:order-2"
                }`}
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={language === "tr" ? project.title_tr : project.title_en}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className={`${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                <span className="text-sm font-semibold text-[#c4975a] uppercase tracking-wider">
                  {language === "tr" ? project.category_tr : project.category_en}
                </span>
                <h2 className="text-3xl font-bold text-[#15415b] mt-2 mb-4">
                  {language === "tr" ? project.title_tr : project.title_en}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                  {language === "tr" ? project.description_tr : project.description_en}
                </p>
                <ul className="space-y-2 mb-8">
                  {(language === "tr" ? project.features_tr : project.features_en).slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-[#c4975a] mr-3 flex-shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/projects/${project.slug}`} passHref>
                  <span className="inline-flex items-center font-semibold text-[#15415b] hover:text-[#c4975a] transition-colors duration-300 group">
                    {content.viewDetails}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
