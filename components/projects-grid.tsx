"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

interface Project {
  id: string
  title: { tr: string; en: string }
  description: { tr: string; en: string }
  category: string
  location: string
  year: string
  status: "published" | "draft" | "archived"
  featured: boolean
  images: string[]
  slug: string
  createdAt: string
  updatedAt: string
}

interface ProjectsGridProps {
  projects: Project[]
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const { language } = useLanguage()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <Link key={project.id} href={`/projects/${project.slug}`} className="group block">
          <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
            <Image
              src={project.images[0] || "/placeholder.svg?height=400&width=600&query=project%20image"}
              alt={project.title[language] || project.title.en}
              width={600}
              height={400}
              className="w-full h-60 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
              <h3 className="text-xl font-bold text-white">{project.title[language] || project.title.en}</h3>
              <p className="text-sm text-gray-200 mt-1 line-clamp-2">
                {project.description[language] || project.description.en}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-300 mt-2">
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
