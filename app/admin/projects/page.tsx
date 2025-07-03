"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, MoreVertical, Edit, Trash2, Eye, Star, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useProjects } from "@/hooks/use-projects"

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  "on-hold": "bg-yellow-100 text-yellow-800",
}

const statusLabels = {
  draft: "Taslak",
  "in-progress": "Devam Ediyor",
  completed: "Tamamlandı",
  "on-hold": "Beklemede",
}

const categoryLabels = {
  residential: "Konut",
  commercial: "Ticari",
  office: "Ofis",
  hospitality: "Otel & Restoran",
  retail: "Perakende",
}

export default function ProjectsPage() {
  const { projects, loading, error, deleteProject } = useProjects()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || project.status === filterStatus
    const matchesCategory = filterCategory === "all" || project.category === filterCategory

    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleDeleteProject = async (id: string, title: string) => {
    if (window.confirm(`"${title}" projesini silmek istediğinizden emin misiniz?`)) {
      try {
        await deleteProject(id)
      } catch (error) {
        alert("Proje silinirken bir hata oluştu")
      }
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center text-red-600">
          <p>Hata: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projeler</h1>
        <Link href="/admin/projects/new">
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Yeni Proje</span>
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Proje ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tüm Durumlar</option>
          <option value="draft">Taslak</option>
          <option value="in-progress">Devam Ediyor</option>
          <option value="completed">Tamamlandı</option>
          <option value="on-hold">Beklemede</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tüm Kategoriler</option>
          <option value="residential">Konut</option>
          <option value="commercial">Ticari</option>
          <option value="office">Ofis</option>
          <option value="hospitality">Otel & Restoran</option>
          <option value="retail">Perakende</option>
        </select>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <p className="text-lg font-medium">Proje bulunamadı</p>
            <p className="text-sm">Yeni bir proje eklemek için yukarıdaki butonu kullanın</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                {project.images && project.images.length > 0 ? (
                  <img
                    src={project.images[0] || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Görsel Yok</span>
                  </div>
                )}

                {project.featured && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-yellow-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Öne Çıkan
                    </Badge>
                  </div>
                )}

                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/projects/${project.id}`} className="flex items-center">
                          <Eye className="w-4 h-4 mr-2" />
                          Görüntüle
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/projects/${project.id}/edit`} className="flex items-center">
                          <Edit className="w-4 h-4 mr-2" />
                          Düzenle
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteProject(project.id, project.title)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Sil
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{project.title}</h3>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>

                <div className="flex items-center justify-between mb-3">
                  <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                    {statusLabels[project.status as keyof typeof statusLabels]}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {categoryLabels[project.category as keyof typeof categoryLabels]}
                  </span>
                </div>

                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(project.createdAt).toLocaleDateString("tr-TR")}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
