"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link" // Import Link
import { blogPostsData } from "@/data/blog-posts" // Import blogPostsData

export default function BlogPage() {
  const [currentLanguage, setCurrentLanguage] = useState("TR")
  const [isLoaded, setIsLoaded] = useState(false)
  const fullText = "Blog"

  // SHINEST harfleri için animasyon
  const shinestLetters = "SHINEST".split("")

  // Blog posts from imported data
  const blogPosts = Object.entries(blogPostsData).map(([slug, data]) => ({
    id: slug, // Use slug as ID
    title: data.title,
    date: data.date,
    image: data.image,
    slug: slug, // Add slug for linking
  }))

  useEffect(() => {
    // Sayfa yüklendiğinde scroll'u en üste al
    window.scrollTo(0, 0)

    // State'leri reset et
    setIsLoaded(false)

    // Kısa bir delay sonra animasyonları başlat
    const initialTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(initialTimer)
  }, []) // Sadece component mount olduğunda çalış

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language)
  }

  return (
    <main className="min-h-screen bg-[#f5f3f0]">
      <Header currentLanguage={currentLanguage} onLanguageChange={handleLanguageChange} />

      <section className="pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
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

            {/* Blog Başlığı - Normal font, el yazısı değil */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={isLoaded ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 20 }}
              transition={{
                duration: 1.5,
                delay: 1.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <h1 className="font-display text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] xl:text-[3vw] text-[#c4975a]">
                {fullText}
              </h1>
            </motion.div>
          </motion.div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 1.8 + index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-64 overflow-hidden mb-4 rounded-lg">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={index === 0}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-[#2a2a2a]/70 mb-2 font-sans">{post.date}</p>
                    <h3 className="font-display text-lg text-shinest-blue hover:text-shinest-blue/80 transition-colors duration-300">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
