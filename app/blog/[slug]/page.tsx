"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { blogPostsData } from "@/data/blog-posts" // Import the blog post data

export default function BlogPostDetailPage() {
  const { t } = useLanguage()
  const params = useParams()
  const slug = params.slug as string
  const [isLoaded, setIsLoaded] = useState(false)
  const [displayText, setDisplayText] = useState("")

  // Get the current blog post data
  const postData = blogPostsData[slug as keyof typeof blogPostsData]
  const fullText = postData?.title || ""

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

  if (!postData) {
    return (
      <div className="min-h-screen bg-[#f5f3f0] flex items-center justify-center">
        <p className="text-2xl text-shinest-blue">Blog yazısı bulunamadı.</p>
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

            {/* Blog Post Title */}
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
            className="space-y-8 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            {/* Post Date */}
            <p className="font-sans text-sm text-[#2a2a2a]/70 text-center mb-6">{postData.date}</p>

            {/* Main Image */}
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg mb-8">
              <Image
                src={postData.image || "/placeholder.svg"}
                alt={postData.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={true}
              />
            </div>

            {/* Blog Content */}
            <div
              className="font-sans text-base text-[#2a2a2a] leading-relaxed space-y-4 prose prose-lg max-w-none mx-auto"
              dangerouslySetInnerHTML={{ __html: postData.fullContent }}
            />
          </motion.div>

          {/* Back to Blog Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 border border-shinest-blue text-shinest-blue px-8 py-4 rounded-full font-sans font-medium hover:bg-shinest-blue/10 transition-colors duration-300"
            >
              <span>Tüm Blog Yazıları</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
