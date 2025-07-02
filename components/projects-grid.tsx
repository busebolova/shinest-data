"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Eye } from "lucide-react"

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
  category: string
  location: string
  year: number
  images: string[]
  status: "draft" | "published"
  featured: boolean
}

interface ProjectsGridProps {
  projects: Project[]
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))]

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((p) => p.category === selectedCategory)

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category === "all" ? "Tümü" : category}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-64 overflow-hidden">
              <Image
                src={project.images[0] || "/placeholder.svg?height=300&width=400"}
                alt={project.title.tr}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {project.featured && <Badge className="absolute top-4 left-4 bg-yellow-500">Öne Çıkan</Badge>}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link href={`/projects/${project.id}`}>
                  <Button size="sm" className="bg-white text-black hover:bg-gray-100">
                    <Eye className="h-4 w-4 mr-2" />
                    Detayları Gör
                  </Button>
                </Link>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{project.category}</Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {project.year}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">{project.title.tr}</h3>
                <p className="text-gray-600 line-clamp-2">{project.description.tr}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  {project.location}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Bu kategoride henüz proje bulunmuyor.</p>
        </div>
      )}
    </div>
  )
}
