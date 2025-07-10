"use client"

import { useState, useEffect } from "react"

interface ContentData {
  [key: string]: any
}

export function useContent(page: string) {
  const [content, setContent] = useState<ContentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/content/${page}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setContent(data)
      } else {
        throw new Error(`Failed to fetch content for ${page}`)
      }
    } catch (err) {
      console.error(`Error fetching content for ${page}:`, err)
      setError(err instanceof Error ? err.message : "Unknown error")

      // Set fallback content for home page
      if (page === "home") {
        setContent({
          hero: {
            title: "SHINEST",
            subtitle: "İÇ MİMARLIK",
            description: "Yaşam alanlarınızı sanat eserine dönüştürüyoruz",
            image: "/images/hero-image.png",
          },
          bigText: {
            line1: "MEKANLARINIZ",
            line2: "YAŞAMINIZA",
            line3: "IŞIK TUTAR!",
          },
          gallery: {
            images: [
              "/images/gallery-1.png",
              "/images/gallery-2.png",
              "/images/gallery-3.png",
              "/images/gallery-4.png",
              "/images/gallery-5.png",
            ],
          },
          services: {
            title: "Hizmetlerimiz",
            items: [
              {
                title: "Danışmanlık",
                description: "Profesyonel iç mimarlık danışmanlığı",
                image: "/images/consulting-service.png",
              },
              {
                title: "Tasarım",
                description: "Yaratıcı ve fonksiyonel tasarım çözümleri",
                image: "/images/design-service.png",
              },
              {
                title: "Uygulama",
                description: "Tasarımdan uygulamaya kadar tüm süreçler",
                image: "/images/implementation-service.png",
              },
            ],
          },
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const updateContent = async (newContent: ContentData) => {
    try {
      const response = await fetch(`/api/content/${page}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContent),
      })

      if (response.ok) {
        const result = await response.json()
        setContent(newContent)

        // Trigger cache revalidation
        await fetch("/api/revalidate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: `/${page === "home" ? "" : page}`,
            all: true,
          }),
        })

        return { success: true, message: result.message }
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || "Update failed")
      }
    } catch (err) {
      console.error(`Error updating content for ${page}:`, err)
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      }
    }
  }

  useEffect(() => {
    fetchContent()
  }, [page])

  return {
    content,
    loading,
    error,
    refetch: fetchContent,
    updateContent,
  }
}
