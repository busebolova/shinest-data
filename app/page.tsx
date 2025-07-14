"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { ScrollGallery } from "@/components/scroll-gallery"
import { ServiceCards } from "@/components/service-cards"
import { SecondGallery } from "@/components/second-gallery"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { QuoteFormModal } from "@/components/quote-form-modal"
import { LoadingScreen } from "@/components/loading-screen"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ScrollGallery />
        <ServiceCards />
        <SecondGallery />
      </main>
      <Footer />
      <QuoteFormModal />
    </div>
  )
}
