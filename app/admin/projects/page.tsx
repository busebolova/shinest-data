"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useProjects } from "@/hooks/use-projects"

export default function ProjectsPage() {
  const { projects, loading, error, deleteProject } = useProjects()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft" | "archived">("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.tr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const categories = Array.from(new Set(projects.map((p) => p.category)))

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`"${title}" projesini silmek istediğinizden emin misiniz?`)) {
      try {
        await deleteProject(id)
        alert("Proje başarıyla silindi!")
      } catch (error) {
        console.error("Error deleting project:", error)
        alert("Proje silinirken bir hata oluştu!")
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#c4975a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Projeler yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Tekrar Dene</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projeler</h1>
          <p className="text-gray-600 mt-2">Tüm projeleri görüntüleyin ve yönetin</p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="bg-[#c4975a] hover:bg-[#b8894d] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Yeni Proje
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
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
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c4975a]"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="published">Yayında</option>
                <option value="draft">Taslak</option>
                <option value="archived">Arşivlendi</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c4975a]"
              >
                <option value="all">Tüm Kategoriler</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Toplam Proje</p>
                <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Yayında</p>
                <p className="text-2xl font-bold text-green-600">
                  {projects.filter((p) => p.status === "published").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Taslak</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {projects.filter((p) => p.status === "draft").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Öne Çıkan</p>
                <p className="text-2xl font-bold text-blue-600">{projects.filter((p) => p.featured).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Proje bulunamadı</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                ? "Arama kriterlerinize uygun proje bulunamadı."
                : "Henüz hiç proje eklenmemiş."}
            </p>
            {!searchTerm && statusFilter === "all" && categoryFilter === "all" && (
              <Link href="/admin/projects/new">
                <Button className="bg-[#c4975a] hover:bg-[#b8894d] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  İlk Projenizi Ekleyin
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-100">
                {project.featured_image ? (
                  <Image
                    src={project.featured_image || "/placeholder.svg"}
                    alt={project.title.tr}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <Image src="/placeholder.svg" alt="Placeholder" width={200} height={150} className="opacity-50" />
                  </div>
                )}
                {project.featured && <Badge className="absolute top-2 left-2 bg-[#c4975a] text-white">Öne Çıkan</Badge>}
                <Badge
                  variant={
                    project.status === "published"
                      ? "default"
                      : project.status === "draft"
                        ? "secondary"
                        : "destructive"
                  }
                  className="absolute top-2 right-2"
                >
                  {project.status === "published" ? "Yayında" : project.status === "draft" ? "Taslak" : "Arşivlendi"}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{project.title.tr}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{project.description.tr}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Link href={`/admin/projects/${project.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Düzenle
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(project.id, project.title.tr)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(project.updated_at).toLocaleDateString("tr-TR")}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
