"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

export default function AboutMenuSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [showMainText, setShowMainText] = useState(false)

  // Main text animation - starts first
  useEffect(() => {
    if (isInView) {
      setShowMainText(true)
    }
  }, [isInView])

  return (
    <section ref={ref} className="py-20 bg-[#f5f3f0]">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          className="text-center relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tek satırda SHINEST İÇ MİMARLIK yazısı - Tüm yazı aynı renk ve büyük harf */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={showMainText ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
          >
            <h2 className="font-display text-[8vw] sm:text-[7vw] md:text-[6vw] lg:text-[5vw] xl:text-[4vw] text-shinest-blue leading-[0.85] tracking-[0.02em] font-normal whitespace-nowrap uppercase">
              SHINEST İÇ MİMARLIK
            </h2>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
