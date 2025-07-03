"use client"

import { useState, useEffect } from "react"
import { githubRealtime } from "@/lib/github-realtime"

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
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setContent(data)
    } catch (err) {
      console.error(`Failed to fetch ${page} content:`, err)
      setError(err instanceof Error ? err.message : "Failed to fetch content")

      // Set default content on error
      setContent(getDefaultContent(page))
    } finally {
      setLoading(false)
    }
  }

  const saveContent = async (newContent: ContentData) => {
    try {
      const response = await fetch(`/api/content/${page}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContent),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const savedData = await response.json()
      setContent(savedData)
      return savedData
    } catch (err) {
      console.error(`Failed to save ${page} content:`, err)
      throw err
    }
  }

  useEffect(() => {
    fetchContent()

    // Subscribe to real-time updates
    const unsubscribe = githubRealtime.subscribe(page, (update) => {
      console.log(`Content update received for ${page}:`, update)
      fetchContent() // Refetch content when updates are received
    })

    // Also subscribe to general content updates
    const unsubscribeGeneral = githubRealtime.subscribe("content", (update) => {
      console.log(`General content update received:`, update)
      fetchContent()
    })

    return () => {
      unsubscribe()
      unsubscribeGeneral()
    }
  }, [page])

  return {
    content,
    loading,
    error,
    refetch: fetchContent,
    saveContent,
  }
}

function getDefaultContent(page: string): ContentData {
  const defaults: Record<string, ContentData> = {
    home: {
      hero: {
        title: "SHINEST",
        subtitle: "Interior Design Studio",
        description: "Creating beautiful spaces that inspire and delight",
        image: "/images/hero-image.png",
      },
      about: {
        title: "About Us",
        content: "We are passionate about creating beautiful interior spaces.",
        image: "/images/about-section-reference.png",
      },
      services: {
        title: "Our Services",
        items: [
          {
            title: "Interior Design",
            description: "Complete interior design solutions",
            image: "/images/design-service.png",
          },
          {
            title: "Consulting",
            description: "Professional design consulting",
            image: "/images/consulting-service.png",
          },
          {
            title: "Implementation",
            description: "Full project implementation",
            image: "/images/implementation-service.png",
          },
        ],
      },
      gallery: {
        title: "Our Work",
        images: [
          "/images/gallery-1.png",
          "/images/gallery-2.png",
          "/images/gallery-3.png",
          "/images/gallery-4.png",
          "/images/gallery-5.png",
        ],
      },
    },
    global: {
      header: {
        logo: "/images/shinest-logo.png",
        navigation: [
          { label: "Ana Sayfa", href: "/" },
          { label: "Hakkımızda", href: "/about" },
          { label: "Hizmetler", href: "/services" },
          { label: "Projeler", href: "/projects" },
          { label: "Blog", href: "/blog" },
          { label: "İletişim", href: "/contact" },
        ],
        social: {
          instagram: "https://instagram.com/shinest",
          youtube: "https://youtube.com/shinest",
          linkedin: "https://linkedin.com/company/shinest",
        },
      },
      footer: {
        logo: "/images/shinest-logo.png",
        description: "Professional interior design services",
        contact: {
          phone: "+90 555 123 4567",
          email: "info@shinest.com",
          address: "Istanbul, Turkey",
        },
        social: {
          instagram: "https://instagram.com/shinest",
          youtube: "https://youtube.com/shinest",
          linkedin: "https://linkedin.com/company/shinest",
        },
      },
    },
  }

  return defaults[page] || {}
}
