"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const designImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=900&width=600",
    title: "Luxury Bedroom",
    subtitle: "Silk & Comfort",
    position: "right-[22%] top-[20%]",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=900&width=600",
    title: "Modern Kitchen",
    subtitle: "Premium Appliances",
    position: "left-[18%] top-[40%]",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=900&width=600",
    title: "Spa Bathroom",
    subtitle: "Natural Stone",
    position: "right-[35%] top-[50%]",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=900&width=600",
    title: "Executive Office",
    subtitle: "City Views",
    position: "left-[28%] top-[10%]",
  },
]

export default function DesignShowcase() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Minimal hierarchy with subtle transitions
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.4], [0, 1, 1, 0])
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.25, 0.4, 0.55], [0, 1, 1, 0])
  const opacity3 = useTransform(scrollYProgress, [0.3, 0.4, 0.55, 0.7], [0, 1, 1, 0])
  const opacity4 = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.85], [0, 1, 1, 0])

  // Subtle vertical movement
  const y1 = useTransform(scrollYProgress, [0, 0.1, 0.25], [100, 0, 0])
  const y2 = useTransform(scrollYProgress, [0.15, 0.25, 0.4], [100, 0, 0])
  const y3 = useTransform(scrollYProgress, [0.3, 0.4, 0.55], [100, 0, 0])
  const y4 = useTransform(scrollYProgress, [0.45, 0.55, 0.7], [100, 0, 0])

  // Minimal scale change
  const scale1 = useTransform(scrollYProgress, [0, 0.1], [0.9, 1])
  const scale2 = useTransform(scrollYProgress, [0.15, 0.25], [0.9, 1])
  const scale3 = useTransform(scrollYProgress, [0.3, 0.4], [0.9, 1])
  const scale4 = useTransform(scrollYProgress, [0.45, 0.55], [0.9, 1])

  return (
    <section ref={containerRef} className="min-h-[120vh] bg-white relative overflow-hidden">
      <div className="sticky top-0 h-screen">
        <div className="relative w-full h-full">
          {/* Image 1 - Vertical format to match hero */}
          <motion.div
            style={{
              opacity: opacity1,
              y: y1,
              scale: scale1,
            }}
            className={`absolute ${designImages[0].position} w-[30vw] md:w-[25vw] lg:w-[20vw] h-[80vh] md:h-[85vh] lg:h-[90vh] z-10`}
          >
            <div className="w-full h-full relative rounded-sm overflow-hidden">
              <Image
                src={designImages[0].src || "/placeholder.svg"}
                alt={designImages[0].title}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Image 2 - Vertical format to match hero */}
          <motion.div
            style={{
              opacity: opacity2,
              y: y2,
              scale: scale2,
            }}
            className={`absolute ${designImages[1].position} w-[30vw] md:w-[25vw] lg:w-[20vw] h-[80vh] md:h-[85vh] lg:h-[90vh] z-10`}
          >
            <div className="w-full h-full relative rounded-sm overflow-hidden">
              <Image
                src={designImages[1].src || "/placeholder.svg"}
                alt={designImages[1].title}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Image 3 - Vertical format to match hero */}
          <motion.div
            style={{
              opacity: opacity3,
              y: y3,
              scale: scale3,
            }}
            className={`absolute ${designImages[2].position} w-[30vw] md:w-[25vw] lg:w-[20vw] h-[80vh] md:h-[85vh] lg:h-[90vh] z-10`}
          >
            <div className="w-full h-full relative rounded-sm overflow-hidden">
              <Image
                src={designImages[2].src || "/placeholder.svg"}
                alt={designImages[2].title}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Image 4 - Vertical format to match hero */}
          <motion.div
            style={{
              opacity: opacity4,
              y: y4,
              scale: scale4,
            }}
            className={`absolute ${designImages[3].position} w-[30vw] md:w-[25vw] lg:w-[20vw] h-[80vh] md:h-[85vh] lg:h-[90vh] z-10`}
          >
            <div className="w-full h-full relative rounded-sm overflow-hidden">
              <Image
                src={designImages[3].src || "/placeholder.svg"}
                alt={designImages[3].title}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
