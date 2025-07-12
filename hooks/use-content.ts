"use client"

import { useState, useEffect, useCallback } from "react"
import { dataManager } from "@/lib/data-manager"
import { toast } from "sonner"

interface ContentSection {
  id: string
  type: "hero" | "text" | "gallery" | "quote" | "services"
  title: string
  content: any
  order: number
}

interface PageContent {
  sections: ContentSection[]
}

export function useContent(pageName: string) {
  const [content, setContent] = useState<PageContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const fetchedContent = await dataManager.getPageContent(pageName)
      setContent(fetchedContent)
    } catch (err) {
      console.error(`Error fetching content for ${pageName}:`, err)
      setError("İçerik yüklenirken bir hata oluştu.")
      toast.error("İçerik yüklenirken bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }, [pageName])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  const saveContent = useCallback(
    async (newSections: ContentSection[]) => {
      setLoading(true)
      setError(null)
      try {
        const contentToSave: PageContent = { sections: newSections }
        await dataManager.savePageContent(pageName, contentToSave)
        setContent(contentToSave) // Update state with saved content
        toast.success("İçerik başarıyla kaydedildi!")
      } catch (err) {
        console.error(`Error saving content for ${pageName}:`, err)
        setError("İçerik kaydedilirken bir hata oluştu.")
        toast.error("İçerik kaydedilirken bir hata oluştu.")
        throw err // Re-throw to allow UI to handle saving state
      } finally {
        setLoading(false)
      }
    },
    [pageName],
  )

  return { content, loading, error, saveContent, refreshContent: fetchContent }
}
