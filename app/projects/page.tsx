"use client"

import { useState, useEffect, useMemo, useContext } from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Search, AlertCircle } from "lucide-react"
import { LanguageContext } from "@/contexts/language-context"
import type { Project } from "@/types/project"

export default function ProjectsPage() {
  const { language } = useContext(LanguageContext)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch("/api/projects", { cache: "no-store" })
        if (!response.ok) {
          throw new Error("Failed to load projects.")
        }
        const data = await response.json()
        const publishedProjects = (data.projects || []).filter((p: Project) => p.status === "published")
        setProjects(publishedProjects)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.")
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const categories = useMemo(() => {
    const categorySet = new Set<string>()
    projects.forEach((p) => categorySet.add(p.category[language] || p.category.tr))
    return Array.from(categorySet)
  }, [projects, language])

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const lang = language
      const title = project.title[lang] || project.title.tr
      const category = project.category[lang] || project.category.tr

      const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategories.size === 0 || selectedCategories.has(category)

      return matchesSearch && matchesCategory
    })
  }, [projects, searchTerm, selectedCategories, language])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(category)) {
        newSet.delete(category)
      } else {
        newSet.add(category)
      }
      return newSet
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-destructive">
        <AlertCircle className="h-16 w-16 mb-4" />
        <h1 className="text-2xl font-bold">Failed to Load Projects</h1>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="pt-24 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === "tr" ? "Projelerimiz" : "Our Projects"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === "tr"
                ? "Yenilikçi tasarımlarımız ve tamamladığımız projelerle tanışın."
                : "Discover our innovative designs and completed projects."}
            </p>
          </section>

          <section className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder={language === "tr" ? "Proje ara..." : "Search projects..."}
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategories.has(cat) ? "default" : "outline"}
                    onClick={() => toggleCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
                {selectedCategories.size > 0 && (
                  <Button variant="ghost" onClick={() => setSelectedCategories(new Set())}>
                    {language === "tr" ? "Temizle" : "Clear"}
                  </Button>
                )}
              </div>
            </div>
          </section>

          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Link href={`/projects/${project.slug}`} key={project.id} passHref>
                  <Card className="overflow-hidden h-full group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative h-60">
                      <Image
                        src={project.images[0] || "/placeholder.svg"}
                        alt={project.title[language] || project.title.tr}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                      {project.featured && (
                        <Badge className="absolute top-3 right-3">{language === "tr" ? "Öne Çıkan" : "Featured"}</Badge>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground mb-2">
                        {project.category[language] || project.category.tr}
                      </p>
                      <h3 className="text-xl font-bold mb-2 line-clamp-2">
                        {project.title[language] || project.title.tr}
                      </h3>
                      <p className="text-muted-foreground line-clamp-3">
                        {project.description[language] || project.description.tr}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  {language === "tr" ? "Aramanızla eşleşen proje bulunamadı." : "No projects match your search."}
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
