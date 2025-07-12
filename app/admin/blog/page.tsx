"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { dataManager } from "@/lib/data-manager"
import { useLanguage } from "@/contexts/language-context"

interface BlogPost {
  id: string
  title: { tr: string; en: string }
  excerpt: { tr: string; en: string }
  image: string
  status: "published" | "draft"
  publishedAt: string
  createdAt: string
  updatedAt: string
}

export default function BlogManagementPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { language } = useLanguage()

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    setLoading(true)
    try {
      const data = await dataManager.getBlogPosts()
      setBlogPosts(data.posts || []) // Assuming dataManager.getBlogPosts returns { posts: [...] }
    } catch (error) {
      console.error("Error fetching blog posts:", error)
      toast.error("Blog yazıları yüklenirken hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu blog yazısını silmek istediğinizden emin misiniz?")) {
      return
    }
    setDeletingId(id)
    try {
      await dataManager.deleteBlogPost(id)
      toast.success("Blog yazısı başarıyla silindi!")
      fetchBlogPosts() // Refresh the list
    } catch (error) {
      console.error("Error deleting blog post:", error)
      toast.error("Blog yazısı silinirken hata oluştu.")
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#c4975a]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Yönetimi</h1>
          <p className="text-gray-600 mt-2">Blog yazılarınızı düzenleyin ve yönetin</p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="bg-[#c4975a] hover:bg-[#a67d4e]">
            <Plus className="w-4 h-4 mr-2" />
            Yeni Yazı Ekle
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            <p>Henüz hiç blog yazısı yok. Yeni bir yazı ekleyerek başlayın!</p>
          </div>
        ) : (
          blogPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{post.title[language] || post.title.en}</CardTitle>
                  <Badge variant={post.status === "published" ? "default" : "secondary"}>
                    {post.status === "published" ? "Yayınlandı" : "Taslak"}
                  </Badge>
                </div>
                <CardDescription className="text-sm">{post.excerpt[language] || post.excerpt.en}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {post.image && (
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title[language] || post.title.en}
                    className="w-full h-40 object-cover rounded-md"
                  />
                )}
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Oluşturuldu: {new Date(post.createdAt).toLocaleDateString()}</span>
                  <span>Güncellendi: {new Date(post.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/blog/${post.id}/edit`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Edit className="w-4 h-4 mr-2" />
                      Düzenle
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(post.id)}
                    disabled={deletingId === post.id}
                    className="flex-1"
                  >
                    {deletingId === post.id ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4 mr-2" />
                    )}
                    Sil
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
