"use client"

import { useState, useEffect, useContext } from "react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { LanguageContext } from "@/contexts/language-context"
import { Loader2, AlertCircle, Calendar, MapPin, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Project {
  id: string
  title: { tr: string; en: string }
  description: { tr: string; en: string }
  category: { tr: string; en: string }
  images: string[]
  year: string
  location: string
  features?: { tr: string[]; en: string[] }
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { language } = useContext(LanguageContext)
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      if (!params.slug) return
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/projects?slug=${params.slug}`)
        if (!response.ok) {
          throw new Error("Project not found.")
        }
        const data = await response.json()
        setProject(data.project)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred."
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [params.slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-destructive">
        <AlertCircle className="h-16 w-16 mb-4" />
        <h1 className="text-2xl font-bold">Project Not Found</h1>
        <p>{error}</p>
      </div>
    )
  }

  const { title, description, category, images, year, location, features } = project
  const currentTitle = title[language] || title.tr
  const currentDescription = description[language] || description.tr
  const currentCategory = category[language] || category.tr
  const currentFeatures = features?.[language] || features?.tr || []

  return (
    <>
      <Header />
      <main className="pt-24 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <article>
            <header className="mb-12 text-center">
              <Badge variant="secondary" className="mb-4">
                {currentCategory}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">{currentTitle}</h1>
              <div className="flex justify-center items-center gap-6 mt-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{location}</span>
                </div>
              </div>
            </header>

            {images && images.length > 0 && (
              <div className="mb-12">
                <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={images[0] || "/placeholder.svg"}
                    alt={currentTitle}
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold mb-4">
                  {language === "tr" ? "Proje Açıklaması" : "Project Description"}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p>{currentDescription}</p>
                </div>
              </div>
              <div>
                {currentFeatures.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-4">{language === "tr" ? "Özellikler" : "Features"}</h3>
                      <ul className="space-y-3">
                        {currentFeatures.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {images && images.length > 1 && (
              <div className="mt-16">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  {language === "tr" ? "Proje Galerisi" : "Project Gallery"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.slice(1).map((img, index) => (
                    <div key={index} className="relative h-64 w-full rounded-md overflow-hidden shadow-md">
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`${currentTitle} gallery image ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
