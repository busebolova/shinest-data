"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export function SecondGallery() {
  const galleryRef = useRef(null)

  // Gallery scroll animations
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  })

  // Transform values for gallery images
  const image1Scale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1])
  const image1Opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const image1Y = useTransform(scrollYProgress, [0, 0.4], [100, 0])

  const image2Scale = useTransform(scrollYProgress, [0.2, 0.6], [0.8, 1])
  const image2Opacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1])
  const image2Y = useTransform(scrollYProgress, [0.2, 0.6], [80, 0])

  // Görsel bilgileri
  const galleryImages = [
    {
      id: "gallery-image-1",
      src: "/images/second-gallery-1.png",
      alt: "Design Consultation",
      position: "left-[5%] sm:left-[10%] md:left-[15%] top-[10%]",
      width: "w-[40%] sm:w-[35%] md:w-[35%]",
      height: "h-[40vh] sm:h-[50vh] md:h-[60vh]",
      zIndex: "z-20",
      scale: image1Scale,
      opacity: image1Opacity,
      y: image1Y,
      sizes: "(max-width: 640px) 40vw, (max-width: 768px) 35vw, 35vw",
    },
    {
      id: "gallery-image-2",
      src: "/images/second-gallery-2.png",
      alt: "Project Implementation",
      position: "right-[5%] sm:right-[8%] md:right-[10%] top-[25%]",
      width: "w-[50%] sm:w-[45%] md:w-[45%]",
      height: "h-[30vh] sm:h-[35vh] md:h-[45vh]",
      zIndex: "z-30",
      scale: image2Scale,
      opacity: image2Opacity,
      y: image2Y,
      sizes: "(max-width: 640px) 50vw, (max-width: 768px) 45vw, 45vw",
    },
  ]

  return (
    <section
      ref={galleryRef}
      className="min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] bg-white relative overflow-hidden"
    >
      <div className="w-full h-full relative">
        {galleryImages.map((image) => (
          <motion.div
            key={image.id}
            className={`absolute ${image.position} ${image.width} ${image.height} ${image.zIndex}`}
            style={{
              scale: image.scale,
              opacity: image.opacity,
              y: image.y,
            }}
          >
            <div className="relative h-full w-full border border-white/30 shadow-lg bg-white p-0.5 md:p-1">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes={image.sizes}
                  priority={true}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default SecondGallery
