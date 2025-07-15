"use client"

import { useEffect, useState } from "react"
import { listGitHubFiles } from "@/app/admin/actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle, FileText, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

interface GitHubFileItem {
  name: string
  path: string
  sha: string
}

export default function AdminContentPage() {
  const [files, setFiles] = useState<GitHubFileItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true)
      setError(null)
      const result = await listGitHubFiles("content/blog") // GitHub deponuzdaki blog yazılarınızın yolu
      if ("error" in result) {
        setError(result.error)
      } else {
        setFiles(result.map((file) => ({ name: file.name, path: file.path, sha: file.sha })))
      }
      setLoading(false)
    }
    fetchFiles()
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="font-display text-3xl text-shinest-blue">Content Management</h2>
        <Button asChild className="bg-shinest-blue hover:bg-shinest-blue/90 text-white">
          <Link href="/admin/content/new">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Post
          </Link>
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
              Please ensure your GitHub environment variables (NEXT_PUBLIC_GITHUB_OWNER, NEXT_PUBLIC_GITHUB_REPO,
              NEXT_PUBLIC_GITHUB_BRANCH, GITHUB_TOKEN) are correctly set and the token has 'repo' scope permissions.
            </p>
          </CardContent>
        </Card>
      )}

      {!loading && !error && files.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center text-gray-600">
            <p className="font-sans text-lg">No content found in `content/blog` directory.</p>
            <p className="font-sans text-sm mt-2">Create a new post to get started.</p>
          </CardContent>
        </Card>
      )}

      {!loading && !error && files.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {files.map((file, index) => (
            <motion.div
              key={file.sha}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium text-shinest-blue">{file.name}</CardTitle>
                  <FileText className="h-5 w-5 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">Path: {file.path}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="border-shinest-gold text-shinest-gold hover:bg-shinest-gold hover:text-white bg-transparent"
                  >
                    <Link href={`/admin/content/${encodeURIComponent(file.path)}`}>Edit Content</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
