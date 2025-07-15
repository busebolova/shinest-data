"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import LoadingScreen from "@/components/loading-screen"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ScrollGallery from "@/components/scroll-gallery"
import ServiceCards from "@/components/service-cards"
import TextSection from "@/components/text-section"
import SecondGallery from "@/components/second-gallery"
import AboutMenuSection from "@/components/about-menu-section"
import Footer from "@/components/footer"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Sayfa yüklendiğinde scroll'u en üste al
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0)
    }
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    // Loading tamamlandıktan sonra content'i göster
    setTimeout(() => {
      setShowContent(true)
    }, 200)
  }

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  return (
    <motion.main
      className="min-h-screen bg-[#f5f3f0] overflow-hidden"
      initial={{ y: "100%" }}
      animate={{ y: showContent ? 0 : "100%" }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Header />
      <HeroSection />
      <ScrollGallery />
      <ServiceCards />
      <TextSection />
      <SecondGallery />
      <AboutMenuSection />
      <Footer />
    </motion.main>
  )
}
