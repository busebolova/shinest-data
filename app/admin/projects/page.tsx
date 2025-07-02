"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Eye, Filter, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Project {
  id: string
  title: { tr: string; en: string }
  category: string
  location: string
  year: number
  images: string[]
  description: { tr: string; en: string }
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  // Fallback data
  const fallbackProjects: Project[] = [
    {
      id: "1",
      title: { tr: "Modern Banyo Tasarımı", en: "Modern Bathroom Design" },
      category: "Banyo",
      location: "İzmir",
      year: 2024,
      images: ["/images/bathroom-design-1.png", "/images/bathroom-design-2.png"],
      description: { tr: "Modern ve şık banyo tasarımı", en: "Modern and elegant bathroom design" },
    },
    {
      id: "2",
      title: { tr: "Kafe İç Mekan Tasarımı", en: "Cafe Interior Design" },
      category: "Ticari",
      location: "İstanbul",
      year: 2024,
      images: ["/images/cafe-design-1.png", "/images/cafe-design-2.png"],
      description: { tr: "Sıcak ve davetkar kafe tasarımı", en: "Warm and inviting cafe design" },
    },
    {
      id: "3",
      title: { tr: "Kış Bahçesi Tasarımı", en: "Winter Garden Design" },
      category: "Konut",
      location: "Ankara",
      year: 2024,
      images: ["/images/winter-garden-1.png", "/images/winter-garden-2.png"],
      description: { tr: "Doğayla iç içe kış bahçesi", en: "Winter garden integrated with nature" },
    },
    {
      id: "4",
      title: { tr: "Yatak Odası Tasarımı", en: "Bedroom Design" },
      category: "Konut",
      location: "İzmir",
      year: 2024,
      images: ["/images/bedroom-design-1.png", "/images/bedroom-design-2.png"],
      description: { tr: "Rahat ve huzurlu yatak odası", en: "Comfortable and peaceful bedroom" },
    },
  ]

  useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [projects, searchTerm, selectedCategory])

  const loadProjects = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/projects")
      if (response.ok) {
        const data = await response.json()
        setProjects(data.projects || fallbackProjects)
      } else {
        setProjects(fallbackProjects)
      }
    } catch (error) {
      console.error("Projeler yüklenirken hata:", error)
      setProjects(fallbackProjects)
    } finally {
      setIsLoading(false)
    }
  }

  const filterProjects = () => {
    let filtered = projects

    // Search filter with null safety
    if (searchTerm) {
      filtered = filtered.filter((project) => {
        const titleTr = project.title?.tr?.toLowerCase() || ""
        const titleEn = project.title?.en?.toLowerCase() || ""
        const category = project.category?.toLowerCase() || ""
        const location = project.location?.toLowerCase() || ""
        const searchLower = searchTerm.toLowerCase()

        return (
          titleTr.includes(searchLower) ||
          titleEn.includes(searchLower) ||
          category.includes(searchLower) ||
          location.includes(searchLower)
        )
      })
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((project) => project.category === selectedCategory)
    }

    setFilteredProjects(filtered)
  }

  const deleteProject = async (id: string) => {
    if (!confirm("Bu projeyi silmek istediğinizden emin misiniz?")) return

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.error("Proje silinirken hata:", error)
    }
  }

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Projeler</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projeler</h1>
          <p className="text-gray-600 mt-1">Tüm projelerinizi buradan yönetebilirsiniz</p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="w-4 h-4 mr-2" />
            Yeni Proje
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Proje ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tüm Kategoriler</option>
                {categories
                  .filter((cat) => cat !== "all")
                  .map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image
                src={project.images[0] || "/placeholder.svg?height=200&width=300"}
                alt={project.title.tr}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{project.title.tr}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{project.description.tr}</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{project.location}</span>
                  <Calendar className="w-4 h-4 ml-2" />
                  <span>{project.year}</span>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{project.category}</Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/projects/${project.id}`} target="_blank">
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/projects/${project.id}/edit`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteProject(project.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && !isLoading && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Filter className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Proje bulunamadı</h3>
            <p className="text-gray-600 mb-4">
              Arama kriterlerinize uygun proje bulunamadı. Farklı anahtar kelimeler deneyin.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
            >
              Filtreleri Temizle
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
