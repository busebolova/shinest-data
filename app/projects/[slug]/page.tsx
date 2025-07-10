"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react"

interface Project {
  id: string
  title: { tr: string; en: string }
  description: { tr: string; en: string }
  category: string
  location: string
  year: string
  status: string
  featured: boolean
  images: string[]
  slug: string
  createdAt: string
  updatedAt: string
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    fetchProject()
  }, [params.slug])

  const fetchProject = async () => {
    try {
      // First get all projects to find the one with matching slug
      const response = await fetch("/api/projects")
      if (response.ok) {
        const projects = await response.json()
        const foundProject = projects.find((p: Project) => p.slug === params.slug)
        setProject(foundProject || null)
      }
    } catch (error) {
      console.error("Error fetching project:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c4975a] mx-auto mb-4"></div>
            <p className="text-gray-600">Proje yükleniyor...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Proje Bulunamadı</h1>
            <p className="text-gray-600 mb-8">Aradığınız proje mevcut değil.</p>
            <Link href="/projects">
              <button className="bg-[#c4975a] text-white px-6 py-3 rounded-lg hover:bg-[#b8864d] transition-colors">
                Projelere Dön
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/projects">
          <button className="flex items-center gap-2 text-gray-600 hover:text-[#c4975a] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Projelere Dön
          </button>
        </Link>
      </div>

      {/* Project Header */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-[#c4975a] text-white px-3 py-1 rounded-full text-sm font-medium">
                {project.category}
              </span>
              {project.featured && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Öne Çıkan
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{project.title.tr}</h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">{project.description.tr}</p>

            <div className="flex flex-wrap gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{project.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>{project.category}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Images */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Image */}
            <div className="mb-6">
              <Image
                src={project.images[selectedImage] || "/placeholder.svg?height=600&width=800"}
                alt={`${project.title.tr} - ${selectedImage + 1}`}
                width={800}
                height={600}
                className="w-full h-96 md:h-[500px] object-cover rounded-lg"
              />
            </div>

            {/* Thumbnail Gallery */}
            {project.images.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden rounded-lg ${
                      selectedImage === index ? "ring-2 ring-[#c4975a]" : ""
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg?height=150&width=200"}
                      alt={`${project.title.tr} - ${index + 1}`}
                      width={200}
                      height={150}
                      className="w-full h-24 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Proje Detayları</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Proje Bilgileri</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kategori:</span>
                    <span className="font-medium">{project.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Konum:</span>
                    <span className="font-medium">{project.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Yıl:</span>
                    <span className="font-medium">{project.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Durum:</span>
                    <span className="font-medium">{project.status === "published" ? "Yayınlandı" : "Taslak"}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Proje Açıklaması</h3>
                <p className="text-gray-600 leading-relaxed">{project.description.tr}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
