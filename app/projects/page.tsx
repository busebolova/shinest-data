import type { Metadata } from "next"
import ProjectsGrid from "@/components/projects-grid"
import { apiClient } from "@/lib/api-client"

export const metadata: Metadata = {
  title: "Projeler | SHINEST İç Mimarlık",
  description: "SHINEST İç Mimarlık proje portföyü. Modern ve fonksiyonel tasarım çözümlerimizi keşfedin.",
}

export default async function ProjectsPage() {
  // Use fallback data directly for SSG to avoid fetch issues
  const projects = await apiClient.getProjects()
  const publishedProjects = projects.filter((project) => project.status === "published")

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Projelerimiz</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Her proje, müşterilerimizin hayallerini gerçeğe dönüştüren benzersiz bir hikaye anlatır. Modern tasarım
            anlayışımızla yaratılan mekanları keşfedin.
          </p>
        </div>

        <ProjectsGrid projects={publishedProjects} />
      </div>
    </div>
  )
}
