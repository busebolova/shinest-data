"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useQuoteForm } from "@/contexts/quote-form-context"
import { projectsData } from "@/data/projects-data" // Import the project data

export default function ProjectDetailPage() {
  const { t } = useLanguage()
  const { openQuoteForm } = useQuoteForm()
  const params = useParams()
  const slug = params.slug as string
  const [isLoaded, setIsLoaded] = useState(false)
  const [displayText, setDisplayText] = useState("")

  // Get the current project data
  const projectData = projectsData[slug as keyof typeof projectsData]
  const fullText = projectData?.title || ""

  // SHINEST letters for animation
  const shinestLetters = "SHINEST".split("")

  useEffect(() => {
    window.scrollTo(0, 0)
    setDisplayText("")
    setIsLoaded(false)

    const initialTimer = setTimeout(() => {
      setIsLoaded(true)
      const typingTimer = setInterval(() => {
        setDisplayText((prev) => {
          if (prev.length < fullText.length) {
            return fullText.slice(0, prev.length + 1)
          } else {
            clearInterval(typingTimer)
            return prev
          }
        })
      }, 120)
      return () => clearInterval(typingTimer)
    }, 100)

    return () => clearTimeout(initialTimer)
  }, [fullText])

  if (!projectData) {
    return (
      <div className="min-h-screen bg-[#f5f3f0] flex items-center justify-center">
        <p className="text-2xl text-shinest-blue">Proje bulunamadı.</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#f5f3f0]">
      <Header />

      <section className="pt-32 sm:pt-36 md:pt-40 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Header - Mobile Responsive */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* SHINEST - Yukarıdan gelen harf animasyonu */}
            <div className="font-display text-[16vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] xl:text-[8vw] text-shinest-blue leading-[0.85] font-normal mb-6 md:mb-8 flex justify-center">
              {shinestLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, y: -50, scale: 0.8 }}
                  animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -50, scale: 0.8 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.3 + index * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Project Title */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 1.5,
                delay: 1.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <h1 className="text-[#c4975a] text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] xl:text-[3vw]">
                {displayText}
                {displayText.length < fullText.length && (
                  <motion.span
                    className="inline-block w-0.5 h-[6vw] sm:h-[4vw] md:h-[3vw] lg:h-[2.5vw] xl:h-[2vw] bg-[#c4975a] ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1.0, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </h1>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            {/* Main Image */}
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={projectData.image || "/placeholder.svg"}
                alt={projectData.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={true}
              />
            </div>

            {/* Description and Features */}
            <div className="space-y-6">
              <p className="font-sans text-lg text-[#2a2a2a] leading-relaxed">{projectData.location}</p>
              <div
                className="font-sans text-base text-[#2a2a2a] leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: projectData.fullDescription }}
              />

              <h3 className="font-display text-2xl text-shinest-blue mt-8">Proje Özellikleri</h3>
              <ul className="list-disc pl-6 space-y-2">
                {projectData.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    className="font-sans text-[#2a2a2a]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 2.0 + index * 0.1 }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Project Gallery */}
          {projectData.galleryImages && projectData.galleryImages.length > 0 && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 2.2 }}
            >
              <h3 className="font-display text-3xl text-shinest-blue mb-8 text-center">Galeri</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectData.galleryImages.map((imgSrc, index) => (
                  <motion.div
                    key={index}
                    className="relative h-64 rounded-lg overflow-hidden shadow-md"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, delay: 2.4 + index * 0.15 }}
                  >
                    <Image
                      src={imgSrc || "/placeholder.svg"}
                      alt={`${projectData.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index === 0}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 3.0 }}
          >
            <p className="font-sans text-lg text-[#2a2a2a] mb-6 max-w-3xl mx-auto">
              Bu proje hakkında daha fazla bilgi almak veya kendi projeniz için teklif almak ister misiniz?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openQuoteForm}
                className="inline-flex items-center justify-center gap-2 bg-shinest-blue text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-shinest-blue/80 transition-colors duration-300"
              >
                <span>{t("services.getQuote")}</span>
                <span>→</span>
              </button>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 border border-shinest-blue text-shinest-blue px-8 py-4 rounded-full font-sans font-medium hover:bg-shinest-blue/10 transition-colors duration-300"
              >
                <span>Tüm Projeler</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
