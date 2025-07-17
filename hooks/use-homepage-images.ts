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
  const [loading, setLoading] = useState(false) // Changed to false since we're using static data
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Since we're using static data, just set the images and mark as loaded
    setImages(defaultImages)
    setLoading(false)
    setError(null)
  }, [])

  return { images, loading, error }
}
