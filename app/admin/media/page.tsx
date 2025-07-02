"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Upload, Search, Trash2, Copy, ImageIcon, FileText, Video, Grid, List, Eye, Edit } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

interface MediaFile {
  id: string
  name: string
  originalName: string
  type: "image" | "video" | "document"
  mimeType: string
  size: number
  url: string
  thumbnailUrl?: string
  uploadDate: string
  usedIn: string[]
  alt?: string
  description?: string
  tags: string[]
}

export default function MediaManager() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: "1",
      name: "hero-image.jpg",
      originalName: "modern-living-room.jpg",
      type: "image",
      mimeType: "image/jpeg",
      size: 2048576,
      url: "/images/hero-image.png",
      uploadDate: "2024-01-15",
      usedIn: ["Ana Sayfa Hero", "Hakkımızda Sayfası"],
      alt: "Modern salon tasarımı",
      description: "Ana sayfa hero bölümü için modern salon görseli",
      tags: ["hero", "salon", "modern"],
    },
    {
      id: "2",
      name: "bathroom-design-1.jpg",
      originalName: "luxury-bathroom.jpg",
      type: "image",
      mimeType: "image/jpeg",
      size: 1536000,
      url: "/images/bathroom-design-1.png",
      uploadDate: "2024-01-12",
      usedIn: ["Banyo Tasarımı Projesi"],
      alt: "Lüks banyo tasarımı",
      description: "Modern ve lüks banyo iç mekan tasarımı",
      tags: ["banyo", "lüks", "modern"],
    },
    {
      id: "3",
      name: "cafe-design-1.jpg",
      originalName: "cozy-cafe-interior.jpg",
      type: "image",
      mimeType: "image/jpeg",
      size: 1843200,
      url: "/images/cafe-design-1.png",
      uploadDate: "2024-01-10",
      usedIn: ["Kafe Tasarımı Projesi", "Blog Yazısı"],
      alt: "Sıcak kafe iç mekanı",
      description: "Sıcak ve davetkar kafe iç mekan tasarımı",
      tags: ["kafe", "sıcak", "davetkar"],
    },
    {
      id: "4",
      name: "project-video.mp4",
      originalName: "design-process.mp4",
      type: "video",
      mimeType: "video/mp4",
      size: 15728640,
      url: "/videos/project-video.mp4",
      thumbnailUrl: "/images/video-thumbnail.png",
      uploadDate: "2024-01-08",
      usedIn: ["Hizmetler Sayfası"],
      description: "Tasarım süreci tanıtım videosu",
      tags: ["video", "süreç", "tanıtım"],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  const filteredFiles = mediaFiles.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === "all" || file.type === selectedType

    return matchesSearch && matchesType
  })

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const newFile: MediaFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        originalName: file.name,
        type: file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "document",
        mimeType: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
        uploadDate: new Date().toISOString().split("T")[0],
        usedIn: [],
        tags: [],
      }

      setMediaFiles((prev) => [newFile, ...prev])
    })

    toast.success(`${files.length} dosya yüklendi!`)
  }

  const handleDeleteFile = (fileId: string) => {
    const file = mediaFiles.find((f) => f.id === fileId)
    if (file && file.usedIn.length > 0) {
      if (!confirm(`Bu dosya ${file.usedIn.length} yerde kullanılıyor. Silmek istediğinizden emin misiniz?`)) {
        return
      }
    }

    setMediaFiles((prev) => prev.filter((f) => f.id !== fileId))
    setSelectedFiles((prev) => prev.filter((id) => id !== fileId))
    toast.success("Dosya silindi!")
  }

  const handleDeleteSelected = () => {
    if (selectedFiles.length === 0) return

    if (confirm(`${selectedFiles.length} dosyayı silmek istediğinizden emin misiniz?`)) {
      setMediaFiles((prev) => prev.filter((f) => !selectedFiles.includes(f.id)))
      setSelectedFiles([])
      toast.success(`${selectedFiles.length} dosya silindi!`)
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success("URL kopyalandı!")
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "document":
        return <FileText className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "image":
        return "bg-green-100 text-green-800"
      case "video":
        return "bg-blue-100 text-blue-800"
      case "document":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medya Yöneticisi</h1>
          <p className="text-gray-600 mt-2">Medya dosyalarını yükleyin, düzenleyin ve yönetin</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>

          <label htmlFor="file-upload" className="cursor-pointer">
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Dosya Yükle
            </Button>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx"
              className="sr-only"
              onChange={(e) => {
                if (e.target.files) {
                  handleFileUpload(e.target.files)
                }
              }}
            />
          </label>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Dosya</p>
                <p className="text-2xl font-bold">{mediaFiles.length}</p>
              </div>
              <ImageIcon className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Görseller</p>
                <p className="text-2xl font-bold">{mediaFiles.filter((f) => f.type === "image").length}</p>
              </div>
              <ImageIcon className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Videolar</p>
                <p className="text-2xl font-bold">{mediaFiles.filter((f) => f.type === "video").length}</p>
              </div>
              <Video className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Boyut</p>
                <p className="text-2xl font-bold">
                  {formatFileSize(mediaFiles.reduce((total, file) => total + file.size, 0))}
                </p>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
            onDrop={(e) => {
              e.preventDefault()
              if (e.dataTransfer.files) {
                handleFileUpload(e.dataTransfer.files)
              }
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Dosyaları buraya sürükleyin</h3>
            <p className="mt-2 text-gray-600">veya dosya seçmek için tıklayın</p>
            <p className="mt-1 text-sm text-gray-500">PNG, JPG, GIF, MP4, PDF dosyaları desteklenir</p>
            <label htmlFor="drag-file-upload" className="mt-4 inline-block cursor-pointer">
              <Button variant="outline">Dosya Seç</Button>
              <input
                id="drag-file-upload"
                type="file"
                multiple
                accept="image/*,video/*,.pdf,.doc,.docx"
                className="sr-only"
                onChange={(e) => {
                  if (e.target.files) {
                    handleFileUpload(e.target.files)
                  }
                }}
              />
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Dosya ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tüm Dosyalar</option>
                <option value="image">Görseller</option>
                <option value="video">Videolar</option>
                <option value="document">Belgeler</option>
              </select>
            </div>

            {selectedFiles.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{selectedFiles.length} dosya seçili</span>
                <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Seçilenleri Sil
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Media Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredFiles.map((file) => (
            <Card key={file.id} className="overflow-hidden group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedFiles.includes(file.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedFiles((prev) => [...prev, file.id])
                    } else {
                      setSelectedFiles((prev) => prev.filter((id) => id !== file.id))
                    }
                  }}
                  className="absolute top-2 left-2 z-10"
                />

                <div className="relative h-32 bg-gray-100">
                  {file.type === "image" ? (
                    <Image
                      src={file.url || "/placeholder.svg"}
                      alt={file.alt || file.name}
                      fill
                      className="object-cover"
                    />
                  ) : file.type === "video" ? (
                    <div className="flex items-center justify-center h-full">
                      <Video className="h-8 w-8 text-gray-400" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => copyToClipboard(file.url)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => window.open(file.url, "_blank")}>
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => console.log("Edit")}>
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFiles.map((file) => (
            <Card key={file.id} className="overflow-hidden group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedFiles.includes(file.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedFiles((prev) => [...prev, file.id])
                    } else {
                      setSelectedFiles((prev) => prev.filter((id) => id !== file.id))
                    }
                  }}
                  className="absolute top-2 left-2 z-10"
                />

                <div className="flex items-center gap-4">
                  <div className="relative h-32 w-32 bg-gray-100">
                    {file.type === "image" ? (
                      <Image
                        src={file.url || "/placeholder.svg"}
                        alt={file.alt || file.name}
                        fill
                        className="object-cover"
                      />
                    ) : file.type === "video" ? (
                      <div className="flex items-center justify-center h-full">
                        <Video className="h-8 w-8 text-gray-400" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${getTypeColor(file.type)}`}>{file.type}</span>
                        <span className="text-sm text-gray-600">{formatFileSize(file.size)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="secondary" onClick={() => copyToClipboard(file.url)}>
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => window.open(file.url, "_blank")}>
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => console.log("Edit")}>
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{file.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {file.tags.map((tag) => (
                        <Badge key={tag} className="bg-blue-100 text-blue-800">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
