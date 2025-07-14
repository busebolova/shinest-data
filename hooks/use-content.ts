"use client"

import { useState, useEffect } from "react"

interface ContentData {
  hero?: {
    title: string
    image: string
  }
  bigText?: {
    line1: string
    line2: string
    line3: string
  }
  text?: {
    title: string
    subtitle: string
    content: string
  }
}

export function useContent(page: string) {
  const [content, setContent] = useState<ContentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/content/${page}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status}`)
        }

        const data = await response.json()
        setContent(data)
      } catch (err) {
        console.error("Error fetching content:", err)
        setError(err instanceof Error ? err.message : "Unknown error")

        // Fallback content
        setContent({
          hero: {
            title: "SHINEST",
            image: "/images/hero-image.png",
          },
          bigText: {
            line1: "MEKANLARINIZ",
            line2: "YAŞAMINIZA",
            line3: "IŞIK TUTAR!",
          },
          text: {
            title: "Işık tutar!",
            subtitle: "İç Mimarlık Stüdyosu",
            content: "Hayalinizdeki mekanları gerçeğe dönüştürüyoruz.",
          },
        })
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [page])

  return { content, loading, error }
}
