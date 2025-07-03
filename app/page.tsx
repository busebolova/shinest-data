"use client"

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/loading-screen"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ScrollGallery from "@/components/scroll-gallery"
import ServiceCards from "@/components/service-cards"
import TextSection from "@/components/text-section"
import SecondGallery from "@/components/second-gallery"
import Footer from "@/components/footer"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setTimeout(() => {
      setShowContent(true)
    }, 300)
  }

  useEffect(() => {
    // Auto-complete loading after 3 seconds as fallback
    const timer = setTimeout(() => {
      if (isLoading) {
        handleLoadingComplete()
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [isLoading])

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  return (
    <div className={`transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}>
      <Header />
      <main>
        <HeroSection />
        <ScrollGallery />
        <ServiceCards />
        <TextSection />
        <SecondGallery />
      </main>
      <Footer />
    </div>
  )
}
