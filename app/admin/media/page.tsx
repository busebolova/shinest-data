"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Upload, Search, Grid3X3, List, Trash2, Copy, Download, ImageIcon, File, Video, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useDropzone } from "react-dropzone"

interface MediaFile {
  id: string
  name: string
  type: "image" | "video" | "document" | "other"
  size: number
  url: string
  uploadedAt: string
  dimensions?: {
    width: number
    height: number
  }
}

export default function MediaPage() {
  const { toast } = useToast()
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockFiles: MediaFile[] = [
        {
          id: "1",
          name: "hero-image.png",
          type: "image",
          size: 2048576,
          url: "/images/hero-image.png",
          uploadedAt: "2024-01-20T10:30:00Z",
          dimensions: { width: 1920, height: 1080 },
        },
        {
          id: "2",
          name: "gallery-1.png",
          type: "image",
          size: 1536000,
          url: "/images/gallery-1.png",
          uploadedAt: "2024-01-19T15:45:00Z",
          dimensions: { width: 1200, height: 800 },
        },
        {
          id: "3",
          name: "modern-villa.jpg",
          type: "image",
          size: 3072000,
          url: "/images/poland-apartment-1.png",
          uploadedAt: "2024-01-18T09:15:00Z",
          dimensions: { width: 1600, height: 1200 },
        },
        {
          id: "4",
          name: "project-presentation.pdf",
          type: "document",
          size: 5242880,
          url: "/documents/presentation.pdf",
          uploadedAt: "2024-01-17T14:20:00Z",
        },
        {
          id: "5",
          name: "office-design.jpg",
          type: "image",
          size: 2560000,
          url: "/images/modern-wooden-office.png",
          uploadedAt: "2024-01-16T11:30:00Z",
          dimensions: { width: 1400, height: 900 },
        },
      ]

      setFiles(mockFiles)
    } catch (error) {
      console.error("Error fetching files:", error)
      toast({
        title: "Hata",
        description: "Dosyalar yüklenemedi",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true)
      try {
        // Simulate file upload
        for (const file of acceptedFiles) {
          await new Promise((resolve) => setTimeout(resolve, 1000))

          const newFile: MediaFile = {
            id: Date.now().toString() + Math.random(),
            name: file.name,
            type: file.type.startsWith("image/")
              ? "image"
              : file.type.startsWith("video/")
                ? "video"
                : file.type.includes("pdf") || file.type.includes("document")
                  ? "document"
                  : "other",
            size: file.size,
            url: URL.createObjectURL(file),
            uploadedAt: new Date().toISOString(),
            dimensions: file.type.startsWith("image/") ? { width: 800, height: 600 } : undefined,
          }

          setFiles((prev) => [newFile, ...prev])
        }

        toast({
          title: "Başarılı",
          description: `${acceptedFiles.length} dosya yüklendi`,
        })
      } catch (error) {
        toast({
          title: "Hata",
          description: "Dosyalar yüklenemedi",
          variant: "destructive",
        })
      } finally {
        setUploading(false)
      }
    },
    [toast],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
      "video/*": [".mp4", ".avi", ".mov"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
  })

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || file.type === selectedType
    return matchesSearch && matchesType
  })

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
        return ImageIcon
      case "video":
        return Video
      case "document":
        return FileText
      default:
        return File
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "Kopyalandı",
      description: "URL panoya kopyalandı",
    })
  }

  const handleDelete = async (id: string) => {
    if (confirm("Bu dosyayı silmek istediğinizden emin misiniz?")) {
      try {
        setFiles(files.filter((f) => f.id !== id))
        toast({
          title: "Başarılı",
          description: "Dosya silindi",
        })
      } catch (error) {
        toast({
          title: "Hata",
          description: "Dosya silinemedi",
          variant: "destructive",
        })
      }
    }
  }

  const handleBulkDelete = async () => {
    if (selectedFiles.length === 0) return

    if (confirm(`${selectedFiles.length} dosyayı silmek istediğinizden emin misiniz?`)) {
      try {
        setFiles(files.filter((f) => !selectedFiles.includes(f.id)))
        setSelectedFiles([])
        toast({
          title: "Başarılı",
          description: `${selectedFiles.length} dosya silindi`,
        })
      } catch (error) {
        toast({
          title: "Hata",
          description: "Dosyalar silinemedi",
          variant: "destructive",
        })
      }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Medya dosyaları yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Medya Yöneticisi</h1>
          <p className="text-gray-600 mt-1">{filteredFiles.length} dosya bulundu</p>
        </div>
        {selectedFiles.length > 0 && (
          <Button variant="destructive" onClick={handleBulkDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            {selectedFiles.length} Dosyayı Sil
          </Button>
        )}
      </div>

      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            {uploading ? (
              <div>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-gray-600">Dosyalar yükleniyor...</p>
              </div>
            ) : isDragActive ? (
              <p className="text-blue-600">Dosyaları buraya bırakın...</p>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">Dosyaları sürükleyip bırakın veya tıklayın</p>
                <p className="text-sm text-gray-500">PNG, JPG, PDF, DOC dosyaları desteklenir</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Dosya ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Tüm Dosyalar</option>
              <option value="image">Görseller</option>
              <option value="video">Videolar</option>
              <option value="document">Belgeler</option>
              <option value="other">Diğer</option>
            </select>

            <div className="flex border rounded-md">
              <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Files Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFiles.map((file) => {
            const FileIcon = getFileIcon(file.type)
            return (
              <Card key={file.id} className="overflow-hidden">
                <div className="aspect-square bg-gray-100 relative">
                  {file.type === "image" ? (
                    <img src={file.url || "/placeholder.svg"} alt={file.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileIcon className="w-12 h-12 text-gray-400" />
                    </div>
                  )}

                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFiles([...selectedFiles, file.id])
                        } else {
                          setSelectedFiles(selectedFiles.filter((id) => id !== file.id))
                        }
                      }}
                      className="w-4 h-4"
                    />
                  </div>

                  <Badge className="absolute top-2 right-2 text-xs">{file.type}</Badge>
                </div>

                <CardContent className="p-3">
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm truncate" title={file.name}>
                      {file.name}
                    </h3>

                    <div className="text-xs text-gray-500 space-y-1">
                      <div>{formatFileSize(file.size)}</div>
                      {file.dimensions && (
                        <div>
                          {file.dimensions.width} × {file.dimensions.height}
                        </div>
                      )}
                      <div>{new Date(file.uploadedAt).toLocaleDateString("tr-TR")}</div>
                    </div>
                  </div>

                  <div className="flex gap-1 mt-3">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(file.url)} className="flex-1">
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => window.open(file.url, "_blank")}>
                      <Download className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(file.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredFiles.map((file) => {
                const FileIcon = getFileIcon(file.type)
                return (
                  <div key={file.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFiles([...selectedFiles, file.id])
                          } else {
                            setSelectedFiles(selectedFiles.filter((id) => id !== file.id))
                          }
                        }}
                        className="w-4 h-4"
                      />

                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {file.type === "image" ? (
                          <img
                            src={file.url || "/placeholder.svg"}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileIcon className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium truncate">{file.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {file.type}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{formatFileSize(file.size)}</span>
                          {file.dimensions && (
                            <span>
                              {file.dimensions.width} × {file.dimensions.height}
                            </span>
                          )}
                          <span>{new Date(file.uploadedAt).toLocaleDateString("tr-TR")}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(file.url)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => window.open(file.url, "_blank")}>
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(file.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredFiles.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Dosya bulunamadı</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedType !== "all"
                ? "Arama kriterlerinize uygun dosya bulunamadı"
                : "Henüz dosya yüklenmemiş"}
            </p>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                İlk Dosyayı Yükle
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
