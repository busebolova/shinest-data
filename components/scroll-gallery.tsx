"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { useHomepageImages } from "@/hooks/use-homepage-images"

export default function ScrollGallery() {
  const containerRef = useRef(null)
  const { images } = useHomepageImages()

  const projects = images.scrollGalleryImages.map((src, index) => ({
    id: index + 1,
    title: `Gallery Image ${index + 1}`, // You might want to get titles from JSON too if needed
    location: "Various",
    image: src,
  }))

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Transform values for each image - Mobile Optimized
  const image1Scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1])
  const image1Opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const image1Y = useTransform(scrollYProgress, [0, 0.3], [100, 0])

  const image2Scale = useTransform(scrollYProgress, [0.1, 0.4], [0.8, 1])
  const image2Opacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const image2Y = useTransform(scrollYProgress, [0.1, 0.4], [80, 0])

  const image3Scale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1])
  const image3Opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const image3Y = useTransform(scrollYProgress, [0.2, 0.5], [60, 0])

  const image4Scale = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1])
  const image4Opacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])
  const image4Y = useTransform(scrollYProgress, [0.3, 0.6], [40, 0])

  const image5Scale = useTransform(scrollYProgress, [0.4, 0.7], [0.8, 1])
  const image5Opacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1])
  const image5Y = useTransform(scrollYProgress, [0.4, 0.7], [20, 0])

  return (
    <section ref={containerRef} className="min-h-[120vh] bg-[#f5f3f0] relative overflow-hidden">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="w-full h-full relative">
          <div className="absolute inset-0 px-2 md:px-0">
            {/* Sol büyük dikey görsel - Mobile Responsive */}
            <motion.div
              className="absolute left-0 md:left-0 top-[10%] w-[45%] sm:w-[40%] md:w-[35%] h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] z-10"
              style={{
                scale: image1Scale,
                opacity: image1Opacity,
                y: image1Y,
              }}
            >
              <div className="relative h-full w-full border border-white/30 shadow-sm bg-white p-0.5 md:p-1">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={projects[0].image || "/placeholder.svg"}
                    alt={projects[0].title}
                    fill
                    className="object-cover"
                    priority={true}
                    sizes="(max-width: 640px) 45vw, (max-width: 768px) 40vw, 35vw"
                  />
                </div>
              </div>
            </motion.div>

            {/* Orta büyük yatay görsel - Mobile Responsive */}
            <motion.div
              className="absolute left-[20%] sm:left-[25%] md:left-[25%] top-[5%] w-[60%] sm:w-[55%] md:w-[50%] h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[45vh] z-20"
              style={{
                scale: image2Scale,
                opacity: image2Opacity,
                y: image2Y,
              }}
            >
              <div className="relative h-full w-full border border-white/30 shadow-sm bg-white p-0.5 md:p-1">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={projects[1].image || "/placeholder.svg"}
                    alt={projects[1].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 60vw, (max-width: 768px) 55vw, 50vw"
                  />
                </div>
              </div>
            </motion.div>

            {/* Sağ üst dikey görsel - Mobile Responsive */}
            <motion.div
              className="absolute right-[5%] sm:right-[10%] md:right-[15%] top-[15%] w-[30%] sm:w-[28%] md:w-[25%] h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] z-30"
              style={{
                scale: image3Scale,
                opacity: image3Opacity,
                y: image3Y,
              }}
            >
              <div className="relative h-full w-full border border-white/30 shadow-sm bg-white p-0.5 md:p-1">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={projects[2].image || "/placeholder.svg"}
                    alt={projects[2].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 30vw, (max-width: 768px) 28vw, 25vw"
                  />
                </div>
              </div>
            </motion.div>

            {/* Orta alt kare görsel - Mobile Responsive */}
            <motion.div
              className="absolute left-[30%] sm:left-[35%] md:left-[40%] bottom-[20%] md:bottom-[15%] w-[40%] sm:w-[35%] md:w-[30%] h-[25vh] sm:h-[30vh] md:h-[35vh] lg:h-[40vh] z-40"
              style={{
                scale: image4Scale,
                opacity: image4Opacity,
                y: image4Y,
              }}
            >
              <div className="relative h-full w-full border border-white/30 shadow-sm bg-white p-0.5 md:p-1">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={projects[3].image || "/placeholder.svg"}
                    alt={projects[3].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 40vw, (max-width: 768px) 35vw, 30vw"
                  />
                </div>
              </div>
            </motion.div>

            {/* Sağ alt yatay görsel - Mobile Responsive */}
            <motion.div
              className="absolute right-[2%] sm:right-[5%] md:right-[5%] bottom-[8%] w-[45%] sm:w-[40%] md:w-[35%] h-[18vh] sm:h-[20vh] md:h-[22vh] lg:h-[25vh] z-50"
              style={{
                scale: image5Scale,
                opacity: image5Opacity,
                y: image5Y,
              }}
            >
              <div className="relative h-full w-full border border-white/30 shadow-sm bg-white p-0.5 md:p-1">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={projects[4].image || "/placeholder.svg"}
                    alt={projects[4].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 45vw, (max-width: 768px) 40vw, 35vw"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
