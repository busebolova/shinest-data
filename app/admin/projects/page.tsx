"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Eye, Calendar, MapPin, User, Tag, ImageIcon } from "lucide-react"
import Link from "next/link"
import { useProjects } from "@/hooks/use-projects"

export default function AdminProjects() {
  const { projects, loading, error, deleteProject } = useProjects()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "draft" | "published" | "archived">("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")

  // Ensure projects is always an array
  const safeProjects = Array.isArray(projects) ? projects : []

  // Filter projects based on search and filters
  const filteredProjects = safeProjects.filter((project) => {
    const matchesSearch =
      project?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project?.client?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || project?.status === filterStatus
    const matchesCategory = filterCategory === "all" || project?.category === filterCategory

    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleDelete = async (id: string) => {
    if (window.confirm("Bu projeyi silmek istediğinizden emin misiniz?")) {
      try {
        await deleteProject(id)
      } catch (err) {
        console.error("Error deleting project:", err)
        alert("Proje silinirken bir hata oluştu")
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "published":
        return "Yayında"
      case "draft":
        return "Taslak"
      case "archived":
        return "Arşivlendi"
      default:
        return status
    }
  }

  // Get unique categories for filter
  const categories = Array.from(new Set(safeProjects.map((p) => p?.category).filter(Boolean)))

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-shinest-blue"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center text-red-600">
          <p>Projeler yüklenirken bir hata oluştu: {error}</p>
          <p className="text-sm text-gray-500 mt-2">Mock veriler kullanılıyor.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projeler</h1>
          <p className="text-gray-600">Tüm projelerinizi yönetin</p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="bg-shinest-blue hover:bg-shinest-blue/90">
            <Plus className="w-4 h-4 mr-2" />
            Yeni Proje
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
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
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-shinest-blue"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="published">Yayında</option>
                <option value="draft">Taslak</option>
                <option value="archived">Arşivlendi</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-shinest-blue"
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <ImageIcon className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Proje bulunamadı</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== "all" || filterCategory !== "all"
                ? "Arama kriterlerinize uygun proje bulunamadı."
                : "Henüz hiç proje eklenmemiş."}
            </p>
            <Link href="/admin/projects/new">
              <Button className="bg-shinest-blue hover:bg-shinest-blue/90">
                <Plus className="w-4 h-4 mr-2" />
                İlk Projeyi Ekle
              </Button>
            </Link>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <motion.div
              key={project?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  {project?.images && project.images.length > 0 ? (
                    <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                      <img
                        src={project.images[0] || "/placeholder.svg"}
                        alt={project?.title || "Project"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=200&width=300"
                        }}
                      />
                      {project?.featured && (
                        <Badge className="absolute top-2 left-2 bg-shinest-gold text-white">Öne Çıkan</Badge>
                      )}
                      <Badge className={`absolute top-2 right-2 ${getStatusColor(project?.status || "draft")}`}>
                        {getStatusText(project?.status || "draft")}
                      </Badge>
                    </div>
                  ) : (
                    <div className="h-48 bg-gray-100 rounded-t-lg flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">{project?.title || "Başlıksız Proje"}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {project?.description || "Açıklama bulunmuyor"}
                    </p>

                    <div className="space-y-2 text-xs text-gray-500">
                      {project?.category && (
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          <span>{project.category}</span>
                        </div>
                      )}
                      {project?.client && (
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{project.client}</span>
                        </div>
                      )}
                      {project?.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{project.location}</span>
                        </div>
                      )}
                      {project?.created_at && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(project.created_at).toLocaleDateString("tr-TR")}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/projects/${project?.slug || project?.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/projects/${project?.id}/edit`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => project?.id && handleDelete(project.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Stats */}
      {safeProjects.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-shinest-blue">{safeProjects.length}</div>
                <div className="text-sm text-gray-600">Toplam Proje</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {safeProjects.filter((p) => p?.status === "published").length}
                </div>
                <div className="text-sm text-gray-600">Yayında</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {safeProjects.filter((p) => p?.status === "draft").length}
                </div>
                <div className="text-sm text-gray-600">Taslak</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-shinest-gold">
                  {safeProjects.filter((p) => p?.featured).length}
                </div>
                <div className="text-sm text-gray-600">Öne Çıkan</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
