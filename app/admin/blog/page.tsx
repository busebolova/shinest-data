"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Eye, FileText, Calendar, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"

interface BlogPost {
  id: string
  title: { tr: string; en: string }
  slug: string
  excerpt: { tr: string; en: string }
  content: { tr: string; en: string }
  featuredImage: string
  author: string
  status: "published" | "draft" | "scheduled"
  publishDate: string
  tags: string[]
  category: string
  readTime: number
  createdAt: string
  updatedAt: string
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: "1",
      title: {
        tr: "Modern İç Mimarlık Trendleri 2024",
        en: "Modern Interior Design Trends 2024",
      },
      slug: "modern-ic-mimarlik-trendleri-2024",
      excerpt: {
        tr: "2024 yılının en popüler iç mimarlık trendlerini keşfedin",
        en: "Discover the most popular interior design trends of 2024",
      },
      content: {
        tr: "Modern iç mimarlık dünyasında 2024 yılı birçok yenilik getiriyor...",
        en: "The world of modern interior design brings many innovations in 2024...",
      },
      featuredImage: "/modern-interior-2024.png",
      author: "Admin",
      status: "published",
      publishDate: "2024-01-15",
      tags: ["trend", "modern", "tasarım"],
      category: "Trendler",
      readTime: 5,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
    },
    {
      id: "2",
      title: {
        tr: "Küçük Mekanlar İçin Büyük Fikirler",
        en: "Big Ideas for Small Spaces",
      },
      slug: "kucuk-mekanlar-icin-buyuk-fikirler",
      excerpt: {
        tr: "Sınırlı alanlarda maksimum verimlilik nasıl sağlanır?",
        en: "How to achieve maximum efficiency in limited areas?",
      },
      content: {
        tr: "Küçük mekanları büyük göstermenin sırları...",
        en: "Secrets to making small spaces look big...",
      },
      featuredImage: "/small-space-interior.png",
      author: "Admin",
      status: "draft",
      publishDate: "2024-01-25",
      tags: ["küçük mekan", "dekorasyon", "ipuçları"],
      category: "İpuçları",
      readTime: 7,
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
    },
    {
      id: "3",
      title: {
        tr: "Sürdürülebilir İç Mimarlık",
        en: "Sustainable Interior Architecture",
      },
      slug: "surdurulebilir-ic-mimarlik",
      excerpt: {
        tr: "Çevre dostu tasarım yaklaşımları ve malzemeler",
        en: "Environmentally friendly design approaches and materials",
      },
      content: {
        tr: "Sürdürülebilir tasarım prensipleri...",
        en: "Sustainable design principles...",
      },
      featuredImage: "/sustainable-interior.png",
      author: "Admin",
      status: "scheduled",
      publishDate: "2024-02-01",
      tags: ["sürdürülebilir", "çevre", "yeşil tasarım"],
      category: "Sürdürülebilirlik",
      readTime: 6,
      createdAt: "2024-01-05",
      updatedAt: "2024-01-15",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [currentLanguage, setCurrentLanguage] = useState<"tr" | "en">("tr")

  const categories = ["Trendler", "İpuçları", "Proje Hikayeleri", "Sürdürülebilirlik", "Malzeme Rehberi", "Renk Paleti"]

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title[currentLanguage].toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt[currentLanguage].toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || post.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleDeletePost = (postId: string) => {
    if (confirm("Bu blog yazısını silmek istediğinizden emin misiniz?")) {
      setPosts((prev) => prev.filter((p) => p.id !== postId))
      toast.success("Blog yazısı silindi!")
    }
  }

  const handleStatusChange = (postId: string, newStatus: BlogPost["status"]) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, status: newStatus, updatedAt: new Date().toISOString().split("T")[0] } : p,
      ),
    )
    toast.success("Blog yazısı durumu güncellendi!")
  }

  const getStatusColor = (status: BlogPost["status"]) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: BlogPost["status"]) => {
    switch (status) {
      case "published":
        return "Yayında"
      case "draft":
        return "Taslak"
      case "scheduled":
        return "Zamanlanmış"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Yönetimi</h1>
          <p className="text-gray-600 mt-2">Blog yazılarını ekleyin, düzenleyin ve yönetin</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={currentLanguage === "tr" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentLanguage("tr")}
            >
              TR
            </Button>
            <Button
              variant={currentLanguage === "en" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentLanguage("en")}
            >
              EN
            </Button>
          </div>

          <Link href="/admin/blog/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Yeni Yazı Ekle
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Yazı</p>
                <p className="text-2xl font-bold">{posts.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Yayında</p>
                <p className="text-2xl font-bold">{posts.filter((p) => p.status === "published").length}</p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taslak</p>
                <p className="text-2xl font-bold">{posts.filter((p) => p.status === "draft").length}</p>
              </div>
              <Edit className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Zamanlanmış</p>
                <p className="text-2xl font-bold">{posts.filter((p) => p.status === "scheduled").length}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Blog yazısı ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tüm Kategoriler</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="published">Yayında</option>
                <option value="draft">Taslak</option>
                <option value="scheduled">Zamanlanmış</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blog Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex gap-6">
                {/* Featured Image */}
                <div className="relative w-32 h-24 flex-shrink-0">
                  <Image
                    src={post.featuredImage || "/placeholder.svg"}
                    alt={post.title[currentLanguage]}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(post.status)}>{getStatusText(post.status)}</Badge>
                        <Badge variant="outline">{post.category}</Badge>
                        <span className="text-xs text-gray-500">{post.readTime} dk okuma</span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                        {post.title[currentLanguage]}
                      </h3>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt[currentLanguage]}</p>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.publishDate}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-4">
                      <Link href={`/admin/blog/${post.id}/edit`}>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          Düzenle
                        </Button>
                      </Link>

                      <Button size="sm" variant="outline" onClick={() => window.open(`/blog/${post.slug}`, "_blank")}>
                        <Eye className="h-3 w-3 mr-1" />
                        Görüntüle
                      </Button>

                      <select
                        value={post.status}
                        onChange={(e) => handleStatusChange(post.id, e.target.value as BlogPost["status"])}
                        className="text-xs px-2 py-1 border border-gray-300 rounded"
                      >
                        <option value="published">Yayında</option>
                        <option value="draft">Taslak</option>
                        <option value="scheduled">Zamanlanmış</option>
                      </select>

                      <Button size="sm" variant="destructive" onClick={() => handleDeletePost(post.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Blog yazısı bulunamadı</h3>
            <p className="mt-2 text-gray-600">
              {searchTerm || selectedCategory !== "all" || selectedStatus !== "all"
                ? "Arama kriterlerinize uygun blog yazısı bulunamadı."
                : "Henüz hiç blog yazısı eklenmemiş."}
            </p>
            <div className="mt-6">
              <Link href="/admin/blog/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  İlk Blog Yazısını Ekle
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
