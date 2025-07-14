"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Eye, Edit, Trash2, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useRealtimeContent } from "@/hooks/use-realtime-content"
import { toast } from "sonner"

interface Project {
  id: string
  title: string
  description: string
  category: string
  location: string
  year: string
  status: "completed" | "in-progress" | "planned"
  featured: boolean
  images: string[]
  createdAt: string
  updatedAt: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Modern Living Room",
      description: "Contemporary living space with minimalist design",
      category: "residential",
      location: "Istanbul",
      year: "2024",
      status: "completed",
      featured: true,
      images: ["/images/living-room-design-1.png"],
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      title: "Luxury Hotel Lobby",
      description: "Elegant hotel lobby with premium finishes",
      category: "hospitality",
      location: "Ankara",
      year: "2024",
      status: "in-progress",
      featured: false,
      images: ["/images/cafe-design-1.png"],
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-10T10:00:00Z",
    },
    {
      id: "3",
      title: "Modern Bathroom Design",
      description: "Luxury bathroom with modern fixtures",
      category: "residential",
      location: "Izmir",
      year: "2023",
      status: "completed",
      featured: true,
      images: ["/images/bathroom-design-1.png"],
      createdAt: "2024-01-05T10:00:00Z",
      updatedAt: "2024-01-05T10:00:00Z",
    },
    {
      id: "4",
      title: "Office Space Design",
      description: "Modern office interior with collaborative spaces",
      category: "commercial",
      location: "Bursa",
      year: "2023",
      status: "completed",
      featured: false,
      images: ["/images/bedroom-design-1.png"],
      createdAt: "2024-01-01T10:00:00Z",
      updatedAt: "2024-01-01T10:00:00Z",
    },
  ])

  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const { updateCount } = useRealtimeContent("/api/projects", projects, "projects")

  useEffect(() => {
    // Filter projects based on search and filters
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((project) => project.category === categoryFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter)
    }

    setFilteredProjects(filtered)
  }, [projects, searchTerm, categoryFilter, statusFilter])

  const handleDeleteProject = async (id: string) => {
    if (confirm("Bu projeyi silmek istediğinizden emin misiniz?")) {
      try {
        setProjects((prev) => prev.filter((project) => project.id !== id))
        toast.success("Proje başarıyla silindi!")
        setLastUpdate(new Date())
      } catch (error) {
        toast.error("Proje silinirken bir hata oluştu!")
      }
    }
  }

  const handleRefresh = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setLastUpdate(new Date())
      toast.success("Projeler yenilendi!")
    } catch (error) {
      toast.error("Yenileme sırasında bir hata oluştu!")
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700"
      case "in-progress":
        return "bg-yellow-100 text-yellow-700"
      case "planned":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Tamamlandı"
      case "in-progress":
        return "Devam Ediyor"
      case "planned":
        return "Planlandı"
      default:
        return status
    }
  }

  const getCategoryText = (category: string) => {
    switch (category) {
      case "residential":
        return "Konut"
      case "commercial":
        return "Ticari"
      case "hospitality":
        return "Otel/Restoran"
      default:
        return category
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projeler</h1>
          <p className="text-gray-600">Tüm projeleri görüntüleyin ve yönetin</p>
        </div>
        <div className="flex items-center gap-4">
          {updateCount > 0 && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {updateCount} canlı güncelleme
            </Badge>
          )}
          {lastUpdate && (
            <span className="text-sm text-gray-500">Son güncelleme: {lastUpdate.toLocaleTimeString("tr-TR")}</span>
          )}
          <Button variant="outline" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Yenile
          </Button>
          <Button asChild>
            <Link href="/admin/projects/new">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Proje
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtreler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Proje ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                <SelectItem value="residential">Konut</SelectItem>
                <SelectItem value="commercial">Ticari</SelectItem>
                <SelectItem value="hospitality">Otel/Restoran</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="completed">Tamamlandı</SelectItem>
                <SelectItem value="in-progress">Devam Ediyor</SelectItem>
                <SelectItem value="planned">Planlandı</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-gray-500 flex items-center">{filteredProjects.length} proje bulundu</div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
                <img
                  src={project.images[0] || "/placeholder.svg?height=200&width=300"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-1">{project.description}</CardDescription>
                </div>
                {project.featured && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 ml-2">
                    Öne Çıkan
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Kategori:</span>
                  <Badge variant="outline">{getCategoryText(project.category)}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Durum:</span>
                  <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Konum:</span>
                  <span className="font-medium">{project.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Yıl:</span>
                  <span className="font-medium">{project.year}</span>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t">
                  <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                    <Link href={`/projects/${project.id}`}>
                      <Eye className="w-4 h-4 mr-1" />
                      Görüntüle
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                    <Link href={`/admin/projects/${project.id}/edit`}>
                      <Edit className="w-4 h-4 mr-1" />
                      Düzenle
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-500">
              <h3 className="text-lg font-medium mb-2">Proje bulunamadı</h3>
              <p className="text-sm">Arama kriterlerinizi değiştirin veya yeni bir proje ekleyin.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
