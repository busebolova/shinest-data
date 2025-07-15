"use client"

import { useEffect, useState } from "react"
import { getGitHubFileContent, updateGitHubFileContent } from "@/app/admin/actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Loader2, Save } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function AdminContentEditPage() {
  const params = useParams()
  const router = useRouter()
  const filePath = decodeURIComponent(params.slug as string)

  const [content, setContent] = useState<string>("")
  const [sha, setSha] = useState<string>("") // GitHub API için SHA değeri
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [commitMessage, setCommitMessage] = useState<string>("")

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true)
      setError(null)
      setSuccess(null)
      const result = await getGitHubFileContent(filePath)
      if ("error" in result) {
        setError(result.error)
      } else {
        setContent(result)
        // SHA değerini almak için listGitHubFiles'ı kullanabiliriz,
        // ancak getGitHubFileContent doğrudan SHA döndürmediği için
        // burada basitçe bir placeholder kullanıyoruz.
        // Gerçek bir uygulamada, SHA'yı getGitHubFileContent'ten döndürmek daha iyi olur.
        // Şimdilik, updateGitHubFileContent'in SHA'yı nasıl alacağını varsayalım.
        // Veya listGitHubFiles'tan gelen SHA'yı prop olarak geçirebiliriz.
        // Basitlik adına, burada SHA'yı manuel olarak alacağız.
        const fileListResult = await getGitHubFileContentWithSha(filePath)
        if ("error" in fileListResult) {
          setError(fileListResult.error)
        } else {
          setSha(fileListResult.sha)
        }
      }
      setLoading(false)
    }
    fetchContent()
  }, [filePath])

  // Helper function to get SHA along with content (simulating a more complete API response)
  const getGitHubFileContentWithSha = async (
    path: string,
  ): Promise<{ content: string; sha: string } | { error: string }> => {
    if (!process.env.GITHUB_TOKEN || !process.env.NEXT_PUBLIC_GITHUB_OWNER || !process.env.NEXT_PUBLIC_GITHUB_REPO) {
      return { error: "GitHub API kimlik bilgileri eksik." }
    }
    try {
      const response = await fetch(
        `https://api.github.com/repos/${process.env.NEXT_PUBLIC_GITHUB_OWNER}/${process.env.NEXT_PUBLIC_GITHUB_REPO}/contents/${path}?ref=${process.env.NEXT_PUBLIC_GITHUB_BRANCH || "main"}`,
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
          cache: "no-store", // Ensure fresh data
        },
      )
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `GitHub API hatası: ${response.status}`)
      }
      const data = await response.json()
      if (data.type === "file" && data.content) {
        return {
          content: Buffer.from(data.content, data.encoding).toString("utf-8"),
          sha: data.sha,
        }
      } else {
        return { error: "Dosya içeriği bulunamadı veya dosya tipi uygun değil." }
      }
    } catch (error: any) {
      console.error(`GitHub dosya içeriği alınırken hata (${path}):`, error)
      return { error: `Dosya içeriği alınırken hata oluştu: ${error.message || error}` }
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    setSuccess(null)

    if (!commitMessage.trim()) {
      setError("Commit mesajı boş bırakılamaz.")
      setSaving(false)
      return
    }

    const result = await updateGitHubFileContent(filePath, content, commitMessage, sha)

    if (result.success) {
      setSuccess(result.message || "İçerik başarıyla güncellendi!")
      setSha(result.newSha || sha) // Yeni SHA değerini güncelle
      setCommitMessage("") // Commit mesajını temizle
    } else {
      setError(result.error || "İçerik güncellenirken bir hata oluştu.")
    }
    setSaving(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="font-display text-3xl text-shinest-blue">Edit Content</h2>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="border-shinest-blue text-shinest-blue hover:bg-shinest-blue/10"
        >
          Back to List
        </Button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-shinest-blue" />
          <span className="ml-3 text-shinest-blue">Loading content...</span>
        </div>
      )}

      {error && (
        <Card className="border-red-500 bg-red-50">
          <CardContent className="p-4 text-red-700">
            <p className="font-sans text-sm">{error}</p>
            <p className="font-sans text-xs mt-2">
              Please ensure your GitHub environment variables are correctly set and the token has 'repo' scope
              permissions.
            </p>
          </CardContent>
        </Card>
      )}

      {success && (
        <Card className="border-green-500 bg-green-50">
          <CardContent className="p-4 text-green-700">
            <p className="font-sans text-sm">{success}</p>
          </CardContent>
        </Card>
      )}

      {!loading && !error && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-shinest-blue">Editing: {filePath.split("/").pop()}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  File Content (Markdown)
                </label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={20}
                  className="font-mono text-sm border-gray-300 focus:ring-shinest-blue focus:border-shinest-blue"
                />
              </div>
              <div>
                <label htmlFor="commitMessage" className="block text-sm font-medium text-gray-700 mb-2">
                  Commit Message <span className="text-red-500">*</span>
                </label>
                <Input
                  id="commitMessage"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  placeholder="e.g., 'Update blog post: new features added'"
                  className="border-gray-300 focus:ring-shinest-blue focus:border-shinest-blue"
                />
              </div>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-shinest-gold hover:bg-shinest-gold/90 text-white"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
