"use client"

import { QuoteFormProvider } from "@/contexts/quote-form-context"
import { LanguageProvider } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { TextSection } from "@/components/text-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { InstagramSection } from "@/components/instagram-section"
import { ScrollGallery } from "@/components/scroll-gallery"
import { SecondGallery } from "@/components/second-gallery"
import { ServiceCards } from "@/components/service-cards"
import { QuoteSection } from "@/components/quote-section"
import { QuoteFormModal } from "@/components/quote-form-modal"
import { LoadingScreen } from "@/components/loading-screen"
import { useState, useEffect } from "react"

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
    <LanguageProvider>
      <QuoteFormProvider>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <HeroSection />
            <TextSection />
            <AboutSection />
            <ScrollGallery />
            <ProjectsSection />
            <SecondGallery />
            <ServiceCards />
            <InstagramSection />
            <QuoteSection />
          </main>
          <Footer />
          <QuoteFormModal />
        </div>
      </QuoteFormProvider>
    </LanguageProvider>
  )
}
