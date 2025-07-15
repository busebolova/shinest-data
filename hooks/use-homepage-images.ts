"use client"

import { useState, useEffect } from "react"

interface HomepageImages {
  heroMain: string
  aboutInfoSection: string
  secondGalleryPatio: string
  secondGalleryKitchen: string
  scrollGalleryImages: string[]
}

const defaultImages: HomepageImages = {
  heroMain: "/images/hero-main.png",
  aboutInfoSection: "/placeholder.svg?height=800&width=1200",
  secondGalleryPatio: "/images/second-gallery-patio.png",
  secondGalleryKitchen: "/images/second-gallery-kitchen.png",
  scrollGalleryImages: [
    "/images/gallery-new-1.png",
    "/images/gallery-new-2.png",
    "/images/gallery-new-3.png",
    "/images/gallery-new-4.png",
    "/images/gallery-new-5.png",
  ],
}

export function useHomepageImages() {
  const [images, setImages] = useState<HomepageImages>(defaultImages)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/data/homepage-images.json")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: HomepageImages = await response.json()
        setImages(data)
      } catch (e: any) {
        console.error("Failed to fetch homepage images:", e)
        setError(e.message)
        // Fallback to default images if fetching fails
        setImages(defaultImages)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  return { images, loading, error }
}
