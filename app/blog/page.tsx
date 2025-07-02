"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function BlogPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const shinestLetters = "SHINEST".split("")

  const blogPosts = [
    {
      id: 1,
      title: "İç Mimaride 2024 Trendleri",
      date: "15 Mayıs 2024",
      image: "/modern-interior-2024.png",
    },
    {
      id: 2,
      title: "Küçük Mekanları Büyük Gösterme Sanatı",
      date: "28 Nisan 2024",
      image: "/small-space-interior.png",
    },
    {
      id: 3,
      title: "Sürdürülebilir İç Mimari Çözümler",
      date: "10 Nisan 2024",
      image: "/sustainable-interior.png",
    },
  ]

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
  }, [])

  return (
    <main className="min-h-screen bg-[#f5f3f0]">
      <Header />

      <section className="pt-32 sm:pt-36 md:pt-40 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Header - Projeler sayfası ile aynı animasyon */}
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

            {/* Blog başlığı - Kelime olarak animasyon */}
            <motion.div
              className="text-[#c4975a] text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] xl:text-[3vw] flex justify-center"
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -30, scale: 0.8 }}
              transition={{
                duration: 1.2,
                delay: 1.3,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100,
                damping: 12,
              }}
            >
              Blog
            </motion.div>
          </motion.div>

          {/* Blog Grid - Mobile Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 1.8 + index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-4 rounded-lg">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm text-[#2a2a2a]/70 mb-2 font-sans">{post.date}</p>
                  <h3 className="font-display text-lg md:text-xl text-shinest-blue hover:text-shinest-blue/80 transition-colors duration-300">
                    {post.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
